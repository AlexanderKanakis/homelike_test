import { ErrorLogs } from "../logs/ErrorLogs";
import { Apartment } from "../models/apartment.model";
import { ApartmentView } from "../models/apartmentView.model";
import { findUserById } from "../service/user.service";

export async function transformApartment(apartment: Apartment): Promise<ApartmentView> {
    console.log(apartment)
    const user = await findUserById(apartment.userId);
    if (!user) throw Error(ErrorLogs.USER_NOT_FOUND)
    return {
        _id: apartment._id,
        name : apartment.name,
        rooms: apartment.rooms,
        country: apartment.country,
        city:  apartment.city,
        address: apartment.address,
        description: apartment.description,
        user: user.username
    }
  }