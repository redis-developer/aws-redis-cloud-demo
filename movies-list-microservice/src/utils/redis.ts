const redis = require("redis");
const { promisify } = require("util");

type RedisConfig = {
  host: string;
  port?: number;
  password?: string;
};

const redisConfig: RedisConfig = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
};

redis.addCommand("ft.create");
redis.addCommand("ft.add");
redis.addCommand("ft.addhash");
redis.addCommand("ft.aggregate");
redis.addCommand("ft.info");
redis.addCommand("ft.search");
redis.addCommand("ft.explain");
redis.addCommand("ft.del");
redis.addCommand("ft.drop");
redis.addCommand("ft.optimize");
redis.addCommand("ft.sugadd");
redis.addCommand("ft.sugget");
redis.addCommand("ft.sugdel");
redis.addCommand("ft.suglen");
redis.addCommand("ft.get");
redis.addCommand("ft.mget");
redis.addCommand("ft.aggregate");

export default redis;
export const client = redis.createClient(redisConfig);
export const get = promisify(client.get).bind(client);
export const set = promisify(client.set).bind(client);
export const keys = promisify(client.keys).bind(client);
export const hgetall = promisify(client.hgetall).bind(client);
export const scan = promisify(client.scan).bind(client);
