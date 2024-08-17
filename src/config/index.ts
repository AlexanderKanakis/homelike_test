import * as dotenv from 'dotenv'
import { developmentConfig } from './development';
import  { productionConfig } from './production';
dotenv.config();

export function getConfig() {
    switch (process.env.NODE_ENV) {
        case "production":
            return productionConfig;
        default:
            return developmentConfig;
    }
}
