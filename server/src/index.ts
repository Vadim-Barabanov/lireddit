import { MikroORM } from '@mikro-orm/core'
import { __prod__ } from './constants'

const main = async () => {
    const orm = await MikroORM.init({
        dbName: 'lireddit',
        user: 'postgres',
        password: '1404',
        debug: !__prod__,
        type: 'postgresql',
    })
}

main()
