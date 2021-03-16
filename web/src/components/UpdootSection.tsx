import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql'

interface UpdootSectionProps {
    post: PostSnippetFragment
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
    const [loadingState, setLoadingState] = useState<
        'not-loading' | 'updoot-loading' | 'downdoot-loading'
    >('not-loading')
    const [, vote] = useVoteMutation()
    return (
        <Flex mr={4} direction="column" align="center" justify="center">
            <IconButton
                onClick={async () => {
                    if (post.voteStatus === 1) return
                    setLoadingState('updoot-loading')
                    await vote({ value: 1, postId: post.id })
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
                    await vote({ value: -1, postId: post.id })
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
