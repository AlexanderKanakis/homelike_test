import { getConfig } from "../config";
import { InfoLogs } from "../logs/InfoLogs";
import { ROLES } from "../middleware/userRoles";
import ApartmentModel, { Apartment } from "../models/apartment.model";
import { User, UserModel } from "../models/user.model";

export async function seedItems() {

    const itemsCount = await ApartmentModel.countDocuments();

    const user = await UserModel.findOne({email: getConfig().adminEmail})
    if (itemsCount === 0 && user) {
        const items: Partial<Apartment>[] = [
            {
                name: 'Apartment A',
                description: 'Description for Apartment A',
                country: 'UK',
                city: 'London',
                address: "Eamonn Casey House, Mostyn Rd, Myatts Field South, London SW9 6PH",
                rooms: 3,
                userId: user._id.toString(),
                geolocation: {
                    lat: 51.472663,
                    lon: -0.109981
                }
            },
            {
                name: 'Apartment B',
                description: 'Description for Apartment B',
                country: 'Germany',
                city: 'Aspach',
                address: "Plattenstraße 14",
                rooms: 4,
                userId: user._id.toString(),
                geolocation: {
                    lat: 48.9951536,
                    lon: 9.3958268
                }
            },
            {
                name: 'Apartment C',
                description: 'Description for Apartment C',
                country: 'Italy',
                city: 'Milan',
                address: "Via Polibio 2",
                rooms: 3,
                userId: user._id.toString(),
                geolocation: {
                    lat: 45.4640647,
                    lon: 9.1607256
                }
            },
            {
                name: 'Apartment D',
                description: 'Description for Apartment D',
                country: 'Bosnia and Herzegovina',
                city: 'Banja Luka',
                address: "Kralja Nikole 12",
                rooms: 5,
                userId: user._id.toString(),
                geolocation: {
                    lat: 44.7665282,
                    lon: 17.1832138
                }
            },
            {
                name: 'Apartment E',
                description: 'Description for Apartment E',
                country: 'Sweden',
                city: 'Stockholm',
                address: "Krukmakargatan 6",
                rooms: 6,
                userId: user._id.toString(),
                geolocation: {
                    lat: 59.3177821,
                    lon: 18.0590928
                }
            },
            {
                name: 'Apartment F',
                description: 'Description for Apartment F',
                country: 'Greece',
                city: 'Athens',
                address: "Liosion 58",
                rooms: 4,
                userId: user._id.toString(),
                geolocation: {
                    lat: 37.9911097,
                    lon: 23.7239229
                }
            },
        ];
        try {
            for (const item of items) {
                await ApartmentModel.create(item);
            }
            console.log(InfoLogs.CREATED_ITEMS_FROM_SEED);
            } catch (error) {
                console.log(error);
            }
    }
    
};