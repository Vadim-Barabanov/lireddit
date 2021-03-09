import { MikroORM } from '@mikro-orm/core'
import { __prod__ } from './constants'
import { Post } from './entities/Post'

export default {
    entities: [Post],
    dbName: 'lireddit',
    user: 'postgres',
    password: '1404',
    debug: !__prod__,
    type: 'postgresql',
} as Parameters<typeof MikroORM.init>[0]
