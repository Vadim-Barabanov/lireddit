import { Box, Button } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React from 'react'
import InputField from '../components/InputField'
import Wrapper from '../components/Wrapper'

interface RegisterProps {}

type Values = {
    username: string
    password: string
}

const Register: React.FC<RegisterProps> = ({}) => {
    const submit = (values: Values) => {
        console.log(values)
    }

    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ username: '', password: '' }}
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

export default Register
