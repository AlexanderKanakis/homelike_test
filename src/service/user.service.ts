import { User, UserModel } from "../models/user.model";
import { ErrorLogs } from "../logs/ErrorLogs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getConfig } from "../config";
import ApartmentView from "../models/apartmentView.model";
import { ObjectId } from "mongoose";

export async function createUser(data: Partial<User>) {
  return await UserModel.create(data);
}

export async function findUserById(_id: string) {
  return await UserModel.findById(_id)
}

export async function findUserByEmail(email: string) {
  return await UserModel.findOne({ email })
}

export async function getAllUsers() {
  return await UserModel.find();
}

export async function updateUserById(_id: ObjectId, data:Partial<User>) {
  return await UserModel.findByIdAndUpdate({ _id }, { ...data }).lean(true);
}

export async function deleteUserById(_id: ObjectId) {
  return await UserModel.deleteOne({ _id });
}

export function hasFavorite(favorites: ApartmentView[], apartmentId: ObjectId) {
  return favorites.find((favorite) => favorite._id.toString() === apartmentId.toString())
}

export function generateTokenReponse(user : User) {
  const token = jwt.sign({
      email: user.email, 
      role: user.role,
      _id: user._id
    },
    getConfig().authSecret!
    ,{
      expiresIn:"1d"
  });

  return {
      email: user.email,
      username: user.username,
      favorites: user.favorites,
      role: user.role,
      token: token
  };
}

export async function validatePassword(password: string, newPassword: string) {
  try {
    return await bcrypt.compare(newPassword, password);
  } catch (error) {
    console.log(ErrorLogs.PASSWORD_VALIDATION_ERROR);
    return false;
  }
}