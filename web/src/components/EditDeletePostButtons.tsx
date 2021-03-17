import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { Box, IconButton } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import { useDeletePostMutation, useMeQuery } from '../generated/graphql'

interface EditDeletePostButtonsProps {
    id: number
    creatorId: number
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
    id,
    creatorId,
}) => {
    const [{ data: meData }] = useMeQuery()
    const [, deletePost] = useDeletePostMutation()

    if (meData?.me?.id !== creatorId) return null

    return (
        <Box>
            <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
                <IconButton
                    aria-label="Edit Post"
                    size="sm"
                    icon={<EditIcon />}
                />
            </NextLink>
            <IconButton
                onClick={() => {
                    deletePost({ id })
                }}
                ml={2}
                aria-label="Delete Post"
                size="sm"
                icon={<DeleteIcon />}
            />
        </Box>
    )
}