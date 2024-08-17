import { getModelForClass, modelOptions, prop, Severity, pre, DocumentType, index } from "@typegoose/typegoose";
import bcrypt from "bcrypt";
import { Schema } from "mongoose";
import { Geolocation } from "../types/geolocation";
import ApartmentView from "./apartmentView.model";

@pre<User>("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;

    return;
})

@index({ email: 1 })
@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})
export class User {
    _id: Schema.Types.ObjectId
    @prop({ lowercase: true, required: true, unique: true })
    email: string;

    @prop({ required: true })
    username: string;

    @prop({ required: true })
    password: string;

    @prop({required: false})
    role: string;

    @prop({required: false, allowMixed: Severity.ALLOW })
    favorites: ApartmentView[];

    @prop({ required: true, allowMixed: Severity.ALLOW })
    geolocation: Geolocation;
}

export const privateFields = [
    "password",
];

export const UserModel = getModelForClass(User);
