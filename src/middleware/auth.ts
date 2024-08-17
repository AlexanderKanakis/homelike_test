import { verify } from "jsonwebtoken";
import { UserMessages } from "../constants/UserMessages";
import { getConfig } from "../config";
import { findApartmentsById } from "../service/apartment.service";


export function isLoggedIn(req: any, res: any, next: any) {
    const token = req.headers.access_token as string;

    if (!token) return res.status(401).send(UserMessages.NO_ACCESS_TOKEN_FOUND);
    
    try {
        const decodedUser = verify(token, getConfig().authSecret!);
        req.user = decodedUser;
    } catch (error) {
        res.status(401).send(UserMessages.INVALID_TOKEN);
    }

    return next();
}

export function isRequestingUserOrAdmin(req: any, res: any, next: any) {
    const id = req.body._id ? req.body._id : req.query._id;
    if( req.user.role === 'admin' || id === req.user._id) {
        return next();
    }
    return res.status(401).send(UserMessages.UNAUTHORIZED);
}

export async function isRequestedByUserOrAdmin(req: any, res: any, next: any) {
    const id = req.body._id ? req.body._id : req.query._id;
    const apartment = await findApartmentsById(id)

    if( req.user.role === 'admin' || apartment?.userId === req.user._id) {
        return next();
    }
    return res.status(401).send(UserMessages.UNAUTHORIZED);
}