import { User } from '../entities/User'
import { MyContext } from 'src/types'
import {
    Arg,
    Ctx,
    Field,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from 'type-graphql'
import argon2 from 'argon2'
import { COOKIE_NAME } from '../constants'
import { UsernamePasswordInput } from './UsernamePasswordInput'
import { validateRegister } from '../utils/validateRegister'

@ObjectType()
class UserResponse {
    @Field(() => User, { nullable: true })
    user?: User

    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]
}

@ObjectType()
class FieldError {
    @Field()
    field!: string

    @Field()
    message!: string
}

@Resolver()
export class UserResolver {
    @Mutation(() => Boolean)
    async forgotPassword() {
        // @Ctx() { em }: MyContext // @Arg('email') email: string,
        // const user = await em.findOne(User, {email})
        return true
    }

    @Query(() => User, { nullable: true })
    async me(@Ctx() { req, em }: MyContext) {
        if (!req.session.userId) {
            return null
        }
        const user = await em.findOne(User, { id: req.session.userId })
        return user
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('opitons') options: UsernamePasswordInput,
        @Ctx() { em, req }: MyContext
    ): Promise<UserResponse> {
        const errors = validateRegister(options)
        if (errors) {
            return { errors }
        }
        const hashedPassword = await argon2.hash(options.password)
        const user = em.create(User, {
            username: options.username,
            email: options.email,
            password: hashedPassword,
        })
        try {
            await em.persistAndFlush(user)
        } catch (err) {
            // duplicate username error
            if (err.code === '23505') {
                return {
                    errors: [
                        {
                            field: 'username',
                            message: 'username already taken',
                        },
                    ],
                }
            }
        }

        req.session.userId = user.id

        return { user }
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg('usernameOrEmail') usernameOrEmail: string,
        @Arg('password') password: string,
        @Ctx() { em, req }: MyContext
    ): Promise<UserResponse> {
        const user = await em.findOne(
            User,
            usernameOrEmail.includes('@')
                ? { email: usernameOrEmail }
                : { username: usernameOrEmail }
        )
        if (!user) {
            return {
                errors: [
                    {
                        field: 'usernameOrEmail',
                        message: 'that username does not exist',
                    },
                ],
            }
        }
        const valid = await argon2.verify(user.password, password)
        if (!valid) {
            return {
                errors: [
                    {
                        field: 'password',
                        message: 'incorrect password',
                    },
                ],
            }
        }

        req.session.userId = user.id

        return { user }
    }

    @Mutation(() => Boolean)
    logout(@Ctx() { req, res }: MyContext) {
        return new Promise((resolve) =>
            req.session.destroy((err) => {
                res.clearCookie(COOKIE_NAME)
                if (err) {
                    console.log('Logout Resolver: ', err)
                    resolve(false)
                    return
                }
                resolve(true)
            })
        )
    }
}
