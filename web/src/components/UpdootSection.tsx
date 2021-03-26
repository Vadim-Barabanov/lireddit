import { ApolloCache } from '@apollo/client'
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Text } from '@chakra-ui/react'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import {
    PostSnippetFragment,
    useVoteMutation,
    VoteMutation,
} from '../generated/graphql'

interface UpdootSectionProps {
    post: PostSnippetFragment
}

const updateAfterVote = (
    value: number,
    postId: number,
    cache: ApolloCache<VoteMutation>
) => {
    const data = cache.readFragment<PostSnippetFragment>({
        id: 'Post:' + postId,
        fragment: gql`
            fragment _ on Post {
                id
                points
                voteStatus
            }
        `,
    })

    if (data) {
        if (data.voteStatus === value) return
        const newPoints = data.points + (!data.voteStatus ? 1 : 2) * value
        cache.writeFragment({
            id: 'Post:' + postId,
            fragment: gql`
                fragment __ on Post {
                    points
                    voteStatus
                }
            `,
            data: {
                points: newPoints,
                voteStatus: value,
            },
        })
    }
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
    const [loadingState, setLoadingState] = useState<
        'not-loading' | 'updoot-loading' | 'downdoot-loading'
    >('not-loading')
    const [vote] = useVoteMutation()
    return (
        <Flex mr={4} direction="column" align="center" justify="center">
            <IconButton
                onClick={async () => {
                    if (post.voteStatus === 1) return
                    setLoadingState('updoot-loading')
                    await vote({
                        variables: { value: 1, postId: post.id },
                        update: (cache) => updateAfterVote(1, post.id, cache),
                    })
                    setLoadingState('not-loading')
                }}
                isLoading={loadingState === 'updoot-loading'}
                colorScheme={post.voteStatus === 1 ? 'green' : undefined}
                aria-label="chevron-up"
                size="xs"
                icon={<ChevronUpIcon />}
            />
            <Text my={2}>{post.points}</Text>
            <IconButton
                onClick={async () => {
                    if (post.voteStatus === -1) return
                    setLoadingState('downdoot-loading')
                    await vote({
                        variables: { value: -1, postId: post.id },
                        update: (cache) => updateAfterVote(-1, post.id, cache),
                    })
                    setLoadingState('not-loading')
                }}
                isLoading={loadingState === 'downdoot-loading'}
                colorScheme={post.voteStatus === -1 ? 'red' : undefined}
                aria-label="chevron-down"
                size="xs"
                icon={<ChevronDownIcon />}
            />
        </Flex>
    )
}
