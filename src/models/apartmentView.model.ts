import { Schema } from "mongoose";

export class ApartmentView {
    _id: Schema.Types.ObjectId
    name: string;
    description: string;
    city: string;
    country: string;
    rooms: number;
    address: string;
    user: string;
}

export default ApartmentView;