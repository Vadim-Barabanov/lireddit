import { Heading, Text } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React from 'react'
import { Layout } from '../../components/Layout'
import { usePostQuery } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'

const Post: React.FC = () => {
    const router = useRouter()
    const postId =
        typeof router.query.id === 'string'
            ? parseInt(router.query.id as string)
            : -1
    const [{ data, fetching }] = usePostQuery({
        pause: postId === -1,
        variables: { id: postId },
    })
    if (fetching) {
        return <Layout>Loading...</Layout>
    }

    if (!data.post) {
        return (
            <Layout>
                <Text>Post does not exist</Text>
            </Layout>
        )
    }
    return (
        <Layout>
            <Heading mb={4}>{data.post.title} </Heading>
            <Text>{data.post.text}</Text>
        </Layout>
    )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Post)
