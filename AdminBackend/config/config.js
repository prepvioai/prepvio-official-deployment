import dotenv from 'dotenv';
dotenv.config();

export const config = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(',')
        : [
            "http://localhost:5173",
            "http://localhost:5174",
            "https://prepvio.in",
            "https://admin.prepvio.in",
            "https://prepvio-admin-frontend.vercel.app",
            "https://prepvio-main-frontend.vercel.app"
        ]
};
