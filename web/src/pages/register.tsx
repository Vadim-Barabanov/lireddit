import { Box, Button } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React from 'react'
import InputField from '../components/InputField'
import Wrapper from '../components/Wrapper'
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from 'next/router'
import { withApollo } from '../utils/withApollo'

interface RegisterProps {}

type Values = {
    username: string
    email: string
    password: string
}

const Register: React.FC<RegisterProps> = ({}) => {
    const router = useRouter()
    const [register] = useRegisterMutation()

    const submit = async (values: Values, { setErrors }) => {
        const response = await register({
            variables: { options: values },
            update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                        __typename: 'Query',
                        me: data?.register.user,
                    },
                })
            },
        })
        if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors))
        } else if (response.data?.register.user) {
            // worked
            router.push('/')
        }
    }

    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ email: '', username: '', password: '' }}
                onSubmit={submit}>
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="username"
                            placeholder="username"
                            label="Username"
                        />
                        <Box mt={4}>
                            <InputField
                                name="email"
                                placeholder="email"
                                label="Email"
                            />
                        </Box>
                        <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password"
                            />
                        </Box>
                        <Button
                            mt={4}
                            isLoading={isSubmitting}
                            type="submit"
                            colorScheme="teal">
                            Register
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    )
}

export default withApollo({ ssr: false })(Register)
