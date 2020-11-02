import redis from "redis";
const { promisify } = require("util");

type RedisConfig = {
  host: string,
  port?: number,
  password?: string
};

const redisConfig:RedisConfig = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
};

export const client = redis.createClient(redisConfig);

export const get = promisify(client.get).bind(client);
export const set = promisify(client.set).bind(client);
export const keys = promisify(client.keys).bind(client);
export const hgetall = promisify(client.hgetall).bind(client);
export const scan = promisify(client.scan).bind(client);
