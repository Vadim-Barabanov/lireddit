import { withUrqlClient } from 'next-urql'
import React from 'react'
import { Layout } from '../components/Layout'
import { usePostsQuery } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/layout'
import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'

const Index: React.FC<{}> = ({}) => {
    const [{ data, fetching }] = usePostsQuery({ variables: { limit: 20 } })
    if (!fetching && !data) {
        return <div>You got no posts for some reason</div>
    }
    return (
        <Layout>
            <Flex alignItems="center" mb={4}>
                <Heading>LiReddit</Heading>
                <NextLink href="/create-post">
                    <Link ml="auto">Create Post</Link>
                </NextLink>
            </Flex>
            {!data && fetching ? (
                <div>Loading...</div>
            ) : (
                <Stack spacing={8}>
                    {data.posts.map((p) => (
                        <Box key={p.id} p={5} shadow="md" borderWidth="1px">
                            <Heading fontSize="xl">{p.title}</Heading>
                            <Text mt={4}>{p.textSnippet + ' ...'}</Text>
                        </Box>
                    ))}
                </Stack>
            )}
            {data ? (
                <Flex>
                    <Button isLoading={fetching} m="auto" my={8}>
                        Load more
                    </Button>
                </Flex>
            ) : null}
        </Layout>
    )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
