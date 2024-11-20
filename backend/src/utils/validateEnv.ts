import { cleanEnv, str, port } from 'envalid';

export const validateEnv = () => {
  return cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
    PORT: port({ default: 3000 }),
    MONGODB_URI: str(),
    REDIS_HOST: str(),
    REDIS_PORT: port({ default: 6379 })
  });
};
