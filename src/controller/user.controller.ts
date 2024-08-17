import { Request, Response } from "express";
import { StatusCodes } from "../constants/StatusCodes";
import { UserMessages } from "../constants/UserMessages";
import { ROLES } from "../middleware/userRoles";
import ApartmentModel from "../models/apartment.model";
import { User, UserModel } from "../models/user.model";
import { createUser, deleteUserById, findUserByEmail, findUserById, generateTokenReponse, getAllUsers, hasFavorite, updateUserById, validatePassword } from "../service/user.service";
import { transformApartment } from "../transformers/apartment.transformer";


export async function loginUserHandler(req: Request, res: Response): Promise<any> {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.send(UserMessages.INVALID_LOGIN);
  }

  const isValid = await validatePassword(user.password, password);
  
  if (!isValid) {
    return res.send(UserMessages.INVALID_LOGIN);
  }

  return res.send(generateTokenReponse(user));
}

export async function registerUserHandler(req: Request, res: Response): Promise<any> {

  const { username, email, password, geolocation } = req.body;
  const user = await findUserByEmail(email);
  if (user) {
      res.status(StatusCodes.BAD_REQUEST).send(UserMessages.CREATED_USER_EXISTS);
      return;
  }

  const newUser: Partial<User> = {
      username,
      email: email.toLowerCase(),
      password,
      favorites: [],
      role: ROLES.CLIENT, 
      geolocation
  };

  try {
    const dbUser = await createUser(newUser);
    res.send(generateTokenReponse(dbUser));
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
}

export async function getAllUsersHandler(req: Request, res: Response): Promise<any> {
  const users = await getAllUsers();

  if (!users) {
    return res.send(UserMessages.NO_USERS);
  }
  return res.send(users);
}

export async function getUserByIdHandler(req: any, res: Response): Promise<any> {
  const { _id } = req.body;

  try {
    const user = await findUserById(_id);
    if (!user) {
      return res.send(UserMessages.NO_USERS);
    }
    return res.send(user);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export async function updateUserByIdHandler(req: any, res: Response): Promise<any> {
  const { _id, data } = req.body;

  delete data.role;
  delete data._id;

  try {
    const targetUser = await updateUserById(_id, { ...data });
    if (!targetUser) {
      return res.send(UserMessages.NO_USERS);
    }
    const updatedUser = { ...targetUser, ...data }

    return res.status(StatusCodes.OK).send(generateTokenReponse(updatedUser));
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export async function deleteUserByIdHandler(req: any, res: Response): Promise<any> {
  const { _id } = req.body;

  try {
    const user = await deleteUserById(_id);
    if (user)return res.status(StatusCodes.OK).send(user);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(UserMessages.USER_DELETE_FAILED);
  }
}

export async function getFavoriteApartmentsHandler(req: any, res: Response): Promise<any> {
  const { _id } = req.body;

  const user = await findUserById(_id);
  if (!user) return res.send(UserMessages.NO_USERS);

  return res.send(user.favorites);
}

export async function addFavoriteApartmentHandler(req: any, res: Response): Promise<any> {
  const { _id, apartmentId } = req.body;

  console.log(req.body)

  const apartment = await ApartmentModel.findById(apartmentId);
  const user = await findUserById(_id)
  if (!user) return res.send(UserMessages.NO_USERS);
  if (!apartment) return res.send(UserMessages.APARTMENT_NOT_FOUND);

  if (hasFavorite(user.favorites, apartment._id)) return res.send(UserMessages.APARTMENT_IS_FAVORITE)

  user.favorites.push(await transformApartment(apartment))
  await user.save()

  return res.send(user);
}

export async function deleteFavoriteApartmentHandler(req: any, res: Response): Promise<any> {
  const { _id, apartmentId } = req.body;
  
  const user = await findUserById(_id)
  if (!user) return res.send(UserMessages.NO_USERS);

  user.favorites = user.favorites.filter((favorite) => favorite._id.toString() !== apartmentId.toString());

  await user.save()

  return res.send(user);
}