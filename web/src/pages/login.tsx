import { Box, Button, Flex, Link } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React from 'react'
import InputField from '../components/InputField'
import Wrapper from '../components/Wrapper'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from 'next/router'
import { useLoginMutation } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { withUrqlClient } from 'next-urql'
import NextLink from 'next/link'

type Values = {
    usernameOrEmail: string
    password: string
}

const Login: React.FC<{}> = ({}) => {
    const router = useRouter()
    const [, login] = useLoginMutation()

    const submit = async (values: Values, { setErrors }) => {
        const response = await login(values)
        if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors))
        } else if (response.data?.login.user) {
            // worked
            if (typeof router.query.next === 'string') {
                router.push(router.query.next)
            } else {
                router.push('/')
            }
        }
    }

    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ usernameOrEmail: '', password: '' }}
                onSubmit={submit}>
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="usernameOrEmail"
                            placeholder="username or email"
                            label="Username or Email"
                        />
                        <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password"
                            />
                        </Box>
                        <Flex mt={2}>
                            <NextLink href="/forgot-password">
                                <Link ml="auto">Forgot password?</Link>
                            </NextLink>
                        </Flex>
                        <Button
                            mt={4}
                            isLoading={isSubmitting}
                            type="submit"
                            colorScheme="teal">
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    )
}

export default withUrqlClient(createUrqlClient)(Login)
