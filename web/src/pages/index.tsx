import React from 'react'
import { Layout } from '../components/Layout'
import { usePostsQuery } from '../generated/graphql'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/layout'
import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { UpdootSection } from '../components/UpdootSection'
import { EditDeletePostButtons } from '../components/EditDeletePostButtons'
import { withApollo } from '../utils/withApollo'

const Index: React.FC<{}> = ({}) => {
    const { data, error, loading, fetchMore, variables } = usePostsQuery({
        variables: {
            limit: 10,
            cursor: null,
        },
        notifyOnNetworkStatusChange: true,
    })

    if (!loading && !data) {
        return (
            <div>
                <div>You got no posts for some reason</div>
                <div>{error?.message}</div>
            </div>
        )
    }

    const fetchingMoreHandler = () => {
        fetchMore({
            variables: {
                limit: variables?.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
            },
        })
    }

    return (
        <Layout>
            {!data && loading ? (
                <div>Loading...</div>
            ) : (
                <Stack spacing={8}>
                    {data.posts.posts.map((p) =>
                        !p ? null : (
                            <Flex
                                key={p.id}
                                p={5}
                                shadow="md"
                                borderWidth="1px">
                                <UpdootSection post={p} />
                                <Box flex={1}>
                                    <NextLink
                                        href="/post/[id]"
                                        as={`/post/${p.id}`}>
                                        <Link>
                                            <Heading fontSize="xl">
                                                {p.title}
                                            </Heading>
                                        </Link>
                                    </NextLink>
                                    <Text fontStyle="italic">
                                        posted by {p.creator.username}
                                    </Text>
                                    <Flex align="center">
                                        <Text mt={4}>
                                            {p.textSnippet + ' ...'}
                                        </Text>
                                        <Box ml="auto">
                                            <EditDeletePostButtons
                                                creatorId={p.creator.id}
                                                id={p.id}
                                            />
                                        </Box>
                                    </Flex>
                                </Box>
                            </Flex>
                        )
                    )}
                </Stack>
            )}
            {data && data.posts.hasMore ? (
                <Flex>
                    <Button
                        onClick={fetchingMoreHandler}
                        isLoading={loading}
                        m="auto"
                        my={8}>
                        Load more
                    </Button>
                </Flex>
            ) : null}
        </Layout>
    )
}

export default withApollo({ ssr: true })(Index)
