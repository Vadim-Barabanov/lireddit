import { withUrqlClient } from 'next-urql'
import React from 'react'
import { Layout } from '../components/Layout'
import { usePostsQuery } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/layout'

const Index: React.FC<{}> = ({}) => {
    const [{ data }] = usePostsQuery()
    return (
        <Layout>
            <NextLink href="/create-post">
                <Link>Create Post</Link>
            </NextLink>
            {!data ? (
                <div>Loading...</div>
            ) : (
                data.posts.map((p) => <div key={p.id}>{p.title}</div>)
            )}
        </Layout>
    )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
