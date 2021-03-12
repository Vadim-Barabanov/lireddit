import { Post } from '../entities/Post'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { MyContext } from '../types'

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    async posts(@Ctx() { em }: MyContext): Promise<Post[]> {
        const posts = await em.find(Post, {})
        return posts
    }

    @Query(() => Post, { nullable: true })
    async post(
        @Arg('id') id: number,
        @Ctx() { em }: MyContext
    ): Promise<Post | null> {
        const post = await em.findOne(Post, { id })
        return post
    }

    @Mutation(() => Post)
    async createPost(
        @Arg('title') title: string,
        @Ctx() { em }: MyContext
    ): Promise<Post> {
        const post = em.create(Post, { title })
        await em.persistAndFlush(post)
        return post
    }

    @Mutation(() => Post, { nullable: true })
    async updatePost(
        @Arg('id') id: number,
        @Arg('title') title: string,
        @Ctx() { em }: MyContext
    ): Promise<Post | null> {
        const post = await em.findOne(Post, { id })

        if (!post) {
            return null
        }

        if (typeof title !== 'undefined') {
            post.title = title
            await em.persistAndFlush(post)
        }

        return post
    }

    @Mutation(() => Boolean)
    async deletePost(
        @Arg('id') id: number,
        @Ctx() { em }: MyContext
    ): Promise<boolean> {
        try {
            await em.nativeDelete(Post, { id })
        } catch {
            return false
        }
        return true
    }
}
