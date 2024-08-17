import * as dotenv from 'dotenv';
dotenv.config();
export const productionConfig = {
    dbUri: process.env.DB_URI,
    authSecret: process.env.SECRET,
    selfUrl: process.env.SELF_URL,
    clientUrl: process.env.CLIENT_URL,
    port: process.env.PORT,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASS
}
