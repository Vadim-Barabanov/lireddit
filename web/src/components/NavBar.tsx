import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
    const [{ data, fetching }] = useMeQuery({ pause: isServer() })
    let body = null

    if (fetching) {
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
                    onClick={() => logout()}>
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
