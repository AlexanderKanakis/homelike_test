import { Request, Response } from "express";
import { StatusCodes } from "../constants/StatusCodes";
import { UserMessages } from "../constants/UserMessages";
import { Apartment } from "../models/apartment.model";
import { createApartment, deleteApartment, getApartments, updateApartment } from "../service/apartment.service";
import { findUserById } from "../service/user.service";
import { transformApartment } from "../transformers/apartment.transformer";
import { getSortedApartmentsInDistance } from "../utils/distance-utils";

export async function addApartmentHandler(req: any, res: Response): Promise<any> {
    const { city, country, rooms, address, description, name, geolocation } = req.body;
    const { _id: userId } = req.user

    const newApartment: Partial<Apartment> = {
        address,
        city,
        country,
        rooms,
        description,
        name,
        userId,
        geolocation
    };

    try {
        const apartment = await createApartment(newApartment);
        const apartmentView = await transformApartment(apartment)
        res.status(StatusCodes.CREATED).send(apartmentView)
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
}

export async function deleteApartmentHandler(req: any, res: Response): Promise<any> {
    const { _id } = req.body;
    try {
        const apartment = await deleteApartment({_id});
        res.status(StatusCodes.OK).send(apartment);
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
}

export async function getApartmentsHandler(req: Request, res: Response): Promise<any> {
    try {
        const apartments = await getApartments(req.body);
        const apartmentsView = await Promise.all(apartments.map(async (apartment) => await transformApartment(apartment)));
        res.status(StatusCodes.OK).send(apartmentsView);
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
}

export async function getApartmentsInDistance(req: any, res: any): Promise<any> {
    const { distance } = req.body;
    const { _id: userId } = req.user

    try {
        const user = await findUserById(userId);
        if (!user) return res.send(UserMessages.NO_USERS);

        const apartments = await getApartments();
        const filteredApartmentsByDistance = getSortedApartmentsInDistance(apartments, user.geolocation, distance)
        const apartmentsView = await Promise.all(filteredApartmentsByDistance.map(async (apartment) => await transformApartment(apartment)));

        res.status(StatusCodes.OK).send(apartmentsView);
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
}

export async function updateApartmentHandler(req: any, res: Response): Promise<any> {
    const { _id, data } = req.body;
    const allowedData = { _id, userId: req.user._id, ...data }
    try {
        const apartment = await updateApartment(_id, { ...allowedData});
        const updatedData = { ...apartment, ...allowedData }
        res.status(StatusCodes.OK).send(updatedData);
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
}