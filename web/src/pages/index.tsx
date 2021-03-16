import { withUrqlClient } from 'next-urql'
import React, { useState } from 'react'
import { Layout } from '../components/Layout'
import { usePostsQuery } from '../generated/graphql'
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
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'

const Index: React.FC<{}> = ({}) => {
    const [variables, setVariables] = useState({
        limit: 10,
        cursor: null as null | string,
    })
    const [{ data, fetching }] = usePostsQuery({ variables })
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
                    {data.posts.posts.map((p) => (
                        <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                            <Flex
                                mr={4}
                                direction="column"
                                align="center"
                                justify="center">
                                <IconButton
                                    aria-label="chevron-up"
                                    size="xs"
                                    icon={<ChevronUpIcon />}
                                />
                                <Text>5</Text>
                                <IconButton
                                    aria-label="chevron-down"
                                    size="xs"
                                    icon={<ChevronDownIcon />}
                                />
                            </Flex>
                            <Box>
                                <Heading fontSize="xl">{p.title}</Heading>
                                <Text mt={4}>{p.textSnippet + ' ...'}</Text>
                            </Box>
                        </Flex>
                    ))}
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
