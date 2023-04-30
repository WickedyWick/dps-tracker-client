import redis from 'redis'

const client = await redis.createClient({
    socket: {
        host: 'localhost',
        port: '6379'
    }
})

await client.connect();
console.log('Connected to Redis')
console.log(await client.ping('pong'))
export const redisDb = client;
