import 'dotenv/config';

const SEVEN_DAYS_IN_SECONDS = 604800;

export const HTTP_PORT = process.env.PORT || 4000;
export const MONGODB_URI = process.env.MONGODB_URI as string;

export const JWT_SECRET = process.env.JWT_SECRET as string;
export const JWT_TOKEN_DURATION = (
  process.env.JWT_TOKEN_DURATION ?
    parseInt(process.env.JWT_TOKEN_DURATION, 10) :
    SEVEN_DAYS_IN_SECONDS
);

export const REGISTRATION_OPEN = process.env.REGISTRATION_OPEN === 'true';
