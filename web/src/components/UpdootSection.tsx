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
                    setLoadingState('updoot-loading')
                    await vote({ value: 1, postId: post.id })
                    setLoadingState('not-loading')
                }}
                isLoading={loadingState === 'updoot-loading'}
                aria-label="chevron-up"
                size="xs"
                icon={<ChevronUpIcon />}
            />
            <Text>{post.points}</Text>
            <IconButton
                onClick={async () => {
                    setLoadingState('downdoot-loading')
                    await vote({ value: -1, postId: post.id })
                    setLoadingState('not-loading')
                }}
                isLoading={loadingState === 'downdoot-loading'}
                aria-label="chevron-down"
                size="xs"
                icon={<ChevronDownIcon />}
            />
        </Flex>
    )
}
