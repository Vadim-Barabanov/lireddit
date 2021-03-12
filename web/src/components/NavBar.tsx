import { Box, Button, Flex, Link } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
    const [{ data, fetching }] = useMeQuery()
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
            <Flex>
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
        <Flex bgColor="tan" p={4} justifyContent="flex-end">
            {body}
        </Flex>
    )
}
