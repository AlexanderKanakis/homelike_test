import { getModelForClass, modelOptions, prop, Severity } from "@typegoose/typegoose";
import { Schema } from "mongoose";
import { Geolocation } from "../types/geolocation";

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Apartment {
    _id: Schema.Types.ObjectId
    @prop({required: true})
    name: string;
    @prop({required: true})
    description: string;
    @prop({required: true})
    city: string;
    @prop({required: true})
    country: string;
    @prop({required: true})
    rooms: number;
    @prop({required: true})
    address: string;
    @prop({required: true, unique: false})
    userId: string;
    @prop({required: true, allowMixed: Severity.ALLOW})
    geolocation: Geolocation;
}

const ApartmentModel = getModelForClass(Apartment);

export default ApartmentModel;