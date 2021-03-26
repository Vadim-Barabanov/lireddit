import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'
import { useApolloClient } from '@apollo/client'

export const NavBar: React.FC = () => {
    const [logout, { loading: logoutFetching }] = useLogoutMutation()
    const apolloClient = useApolloClient()
    const { data, loading } = useMeQuery({ skip: isServer() })

    let body = null

    if (loading) {
        // data is loading
    } else if (!data?.me) {
        // user is not logged in
        body = (
            <>
                <NextLink href="/login">
                    <Link mr={2}>Login</Link>
                </NextLink>
                <NextLink href="/register">
                    <Link>Register</Link>
                </NextLink>
            </>
        )
    } else {
        // user is logged in
        console.log('DATA.ME: ', data)
        body = (
            <Flex align="center">
                <NextLink href="/create-post">
                    <Button mr={4} size="sm">
                        Create Post
                    </Button>
                </NextLink>
                <Box mr={4}>{data.me.username}</Box>
                <Button
                    variant="link"
                    isLoading={logoutFetching}
                    onClick={async () => {
                        await logout()
                        await apolloClient.resetStore()
                    }}>
                    Logout
                </Button>
            </Flex>
        )
    }

    return (
        <Flex zIndex={999} position="sticky" top={0} bgColor="tan" p={4}>
            <Flex maxW="800px" align="center" flex={1} m="auto">
                <NextLink href="/">
                    <Link>
                        <Heading>LiReddit</Heading>
                    </Link>
                </NextLink>
                <Box ml="auto">{body}</Box>
            </Flex>
        </Flex>
    )
}
