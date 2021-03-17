import { Heading, Text } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import React from 'react'
import { EditDeletePostButtons } from '../../components/EditDeletePostButtons'
import { Layout } from '../../components/Layout'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { useGetPostFromUrl } from '../../utils/useGetPostFromUrl'

const Post: React.FC = () => {
    const [{ data, fetching }] = useGetPostFromUrl()
    if (fetching) {
        return <Layout>Loading...</Layout>
    }

    if (!data?.post) {
        return (
            <Layout>
                <Text>Post does not exist</Text>
            </Layout>
        )
    }
    return (
        <Layout>
            <Heading mb={4}>{data.post.title} </Heading>
            <Text mb={4}>{data.post.text}</Text>
            <EditDeletePostButtons
                creatorId={data.post.creator.id}
                id={data.post.id}
            />
        </Layout>
    )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Post)
