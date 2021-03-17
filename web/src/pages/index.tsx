import { withUrqlClient } from 'next-urql'
import React, { useState } from 'react'
import { Layout } from '../components/Layout'
import { useDeletePostMutation, usePostsQuery } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/layout'
import {
    Box,
    Button,
    Flex,
    Heading,
    IconButton,
    Stack,
    Text,
} from '@chakra-ui/react'
import { UpdootSection } from '../components/UpdootSection'
import { DeleteIcon } from '@chakra-ui/icons'

const Index: React.FC<{}> = ({}) => {
    const [variables, setVariables] = useState({
        limit: 10,
        cursor: null as null | string,
    })
    const [, deletePost] = useDeletePostMutation()
    const [{ data, fetching }] = usePostsQuery({ variables })
    if (!fetching && !data) {
        return <div>You got no posts for some reason</div>
    }
    return (
        <Layout>
            {!data && fetching ? (
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
                                        <IconButton
                                            onClick={() => {
                                                deletePost({ id: p.id })
                                            }}
                                            colorScheme="red"
                                            ml="auto"
                                            aria-label="Delete Post"
                                            size="sm"
                                            icon={<DeleteIcon />}
                                        />
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
                        onClick={() => {
                            setVariables({
                                limit: variables.limit,
                                cursor:
                                    data.posts.posts[
                                        data.posts.posts.length - 1
                                    ].createdAt,
                            })
                        }}
                        isLoading={fetching}
                        m="auto"
                        my={8}>
                        Load more
                    </Button>
                </Flex>
            ) : null}
        </Layout>
    )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
