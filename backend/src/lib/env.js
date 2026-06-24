import dotenv from 'dotenv'

dotenv.config();
const requireEnv = (name) => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

export const ENV = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    COORDINATOR_PASS: process.env.COORDINATOR_PASS,
    RESEND_API_KEY: requireEnv('RESEND_API_KEY'),
    FRONTEND_URL: requireEnv('FRONTEND_URL')
}