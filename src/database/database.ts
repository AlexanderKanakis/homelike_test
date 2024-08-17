import mongoose, { ConnectOptions } from "mongoose";
import { getConfig } from "../config";
import { ErrorLogs } from "../logs/ErrorLogs";
import { InfoLogs } from "../logs/InfoLogs";
import { seedAdmin } from "../utils/admin-seed";
import { seedItems } from "../utils/item-seed";

const connectToDatabase = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(getConfig().dbUri!, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions);
        console.log(InfoLogs.DB_CONNECTION_SUCCESFUL);
        if (process.env.CREATE_DATA) {
            await seedAdmin()
            await seedItems()
        }
    }
    catch (error) {
        console.log(ErrorLogs.CONNECTION_TO_DB_FAILED, error);
        process.exit(1);
    }
}

export default connectToDatabase;