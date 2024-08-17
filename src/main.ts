import express from "express";
import { getConfig } from "./config";
import connectToDatabase from "./database/database";
import { InfoLogs } from "./logs/InfoLogs";
import cors from "cors";
import userRouter from "./routes/user.routes";
import apartmentRouter from "./routes/apartment.routes";
import notFoundRouter from "./routes/notFound.routes";

const main = async () => {

    const app = express();

    app.use(express.json());
    app.use(cors({credentials: true, origin:[getConfig().selfUrl!, getConfig().clientUrl!]}))

    //Routers
    app.use(userRouter);
    app.use(apartmentRouter);
    app.use(notFoundRouter);


    const PORT = getConfig().port || 3000;

    app.listen(PORT, ()=> {
        console.log(InfoLogs.SERVER_CONNECTION_SUCCESSFUL, PORT);
        connectToDatabase();
    })
};

main();

