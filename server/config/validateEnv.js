import { cleanEnv, str, port } from 'envalid';

const validateEnv = () => {
  return cleanEnv(process.env, {
    MONGO_URI: str(),
    JWT_SECRET: str(),
    PORT: port(),
    NODE_ENV: str({ choices: ['development', 'production', 'test'] })
  });
};

export default validateEnv;