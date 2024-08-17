import { getConfig } from "../config";
import { InfoLogs } from "../logs/InfoLogs";
import { ROLES } from "../middleware/userRoles";
import { User, UserModel } from "../models/user.model";

export async function seedAdmin() {

    const usersCount = await UserModel.countDocuments();
    if (usersCount > 0) {
        return;
    }

    const admin: Partial<User> = {
        username: "admin",
        email: getConfig().adminEmail!,
        password: getConfig().adminPassword!,
        favorites: [],
        role: ROLES.ADMIN,
        geolocation: {
            lat: 38.045986,
            lon: 23.763900,
        }
    }

    try {
        await UserModel.create(admin);
        console.log(InfoLogs.CREATED_ADMIN, admin.username);
    } catch (error) {
        console.log(error);
    }
};