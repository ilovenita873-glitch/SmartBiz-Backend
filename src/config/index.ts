import dotenv from 'dotenv';

dotenv.config();

interface Config {
  env: string;
  port: number;
  mongodbUri: string;
}

const config: Config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/smartbiz',
};

export default config;