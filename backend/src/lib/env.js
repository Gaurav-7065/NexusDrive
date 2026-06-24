import dotenv from 'dotenv'

dotenv.config();

export const ENV={
    PORT:process.env.PORT,
    MONGO_URL:process.env.MONGO_URL,
    JWT_SECRET:process.env.JWT_SECRET,
    COORDINATOR_PASS:process.env.COORDINATOR_PASS,
    RESEND_API_KEY:process.env.RESEND_API_KEY,
    FRONTEND_URL:process.env.FRONTEND_URL
}