import { cleanEnv, str, port } from 'envalid';
import dotenv from 'dotenv';

dotenv.config();

const env = cleanEnv(process.env, {
  MONGO_URI: str(),
  JWT_SECRET: str(),
  PORT: port({ default: 3000 }),
  NODE_ENV: str({ choices: ['development', 'production'] }),
  CLIENT_URL: str()
});

export default env;