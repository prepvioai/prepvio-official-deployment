import dotenv from 'dotenv';
dotenv.config();

const config = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(',')
        : [
            "http://localhost:5173",
            "http://localhost:5174",
            "https://prepvio.in",
            "https://admin.prepvio.in",
            "https://www.prepvio.in",
            "https://prepvio-admin-frontend.vercel.app",
            "https://prepvio-main-frontend.vercel.app"
        ],
    JWT_SECRET: process.env.JWT_SECRET,
    CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
    R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
    R2_BUCKET_NAME: process.env.R2_BUCKET_NAME,
    R2_PUBLIC_DOMAIN: process.env.R2_PUBLIC_DOMAIN
};

export default config;
