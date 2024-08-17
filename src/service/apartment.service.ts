import { ObjectId } from "mongoose";
import ApartmentModel, { Apartment } from "../models/apartment.model";

export async function createApartment(input: Partial<Apartment>) {
    return ApartmentModel.create(input);
}

export async function deleteApartment(data: Partial<Apartment>) {
    return ApartmentModel.deleteOne({ ...data });
}

export async function getApartments(filters?: Partial<Apartment>) {
    return ApartmentModel.find({... filters}).lean(true);
}

export async function findApartmentsById(_id: ObjectId) {
    return ApartmentModel.findById(_id);
}

export async function updateApartment(_id: ObjectId, data: Partial<Apartment>) {
    return ApartmentModel.findByIdAndUpdate({ _id }, { ...data }).lean(true);
}