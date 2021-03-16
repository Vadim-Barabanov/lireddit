import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Text } from '@chakra-ui/react'
import React from 'react'

interface UpdootSectionProps {
    post: any
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
    return (
        <Flex mr={4} direction="column" align="center" justify="center">
            <IconButton
                aria-label="chevron-up"
                size="xs"
                icon={<ChevronUpIcon />}
            />
            <Text>{post.points}</Text>
            <IconButton
                aria-label="chevron-down"
                size="xs"
                icon={<ChevronDownIcon />}
            />
        </Flex>
    )
}
