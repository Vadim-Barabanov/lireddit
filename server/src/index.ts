import 'reflect-metadata'
import { MikroORM } from '@mikro-orm/core'
import { __prod__ } from './constants'
import mikroConfig from './mikro-orm.config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { HelloResolver } from './resolvers/hello'
import { PostResolver } from './resolvers/post'
import { UserResolver } from './resolvers/user'
import redis from 'redis'
import session from 'express-session'
import connectRedis from 'connect-redis'

const main = async () => {
    const orm = await MikroORM.init(mikroConfig)
    await orm.getMigrator().up()

    const app = express()

    const RedisStore = connectRedis(session)
    const redisClient = redis.createClient()

    app.use(
        session({
            name: 'qid',
            store: new RedisStore({
                client: redisClient,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365, // one year
                httpOnly: true, // cannot access cookie from js (front end)
                secure: __prod__, // cookie only works in https
                sameSite: 'lax', // csrf
            },
            secret: 'qwertyqwerty',
            resave: false,
            saveUninitialized: false,
        })
    )

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ em: orm.em, req, res }),
    })

    apolloServer.applyMiddleware({ app })

    app.listen(4000, () => {
        console.log('Server started on localhost:4000')
    })
}

main().catch((err) => console.log(err))
