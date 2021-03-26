import { Box, Button, Text } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import InputField from '../../../components/InputField'
import { Layout } from '../../../components/Layout'
import { usePostQuery, useUpdatePostMutation } from '../../../generated/graphql'
import { useGetPostId } from '../../../utils/useGetPostId'
import { withApollo } from '../../../utils/withApollo'

const EditPost: React.FC = () => {
    const router = useRouter()
    const postId = useGetPostId()
    const { data, loading } = usePostQuery({
        skip: postId === -1,
        variables: { id: postId },
    })
    const [updatePost] = useUpdatePostMutation()
    if (loading) {
        return (
            <Layout>
                <Text>Loading...</Text>
            </Layout>
        )
    }

    if (!data?.post) {
        return (
            <Layout>
                <Text>Post does not exist</Text>
            </Layout>
        )
    }

    return (
        <Layout variant="small">
            <Formik
                initialValues={{ title: data.post.title, text: data.post.text }}
                onSubmit={async (values) => {
                    console.log('hi')
                    await updatePost({
                        variables: { id: postId, ...values },
                        update: (cache) => {
                            cache.evict({ fieldName: 'posts:{}' })
                        },
                    })
                    router.back()
                }}>
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="title"
                            placeholder="title"
                            label="Title"
                        />
                        <Box mt={4}>
                            <InputField
                                textarea
                                name="text"
                                placeholder="text"
                                label="Body"
                            />
                        </Box>
                        <Button
                            mt={4}
                            isLoading={isSubmitting}
                            type="submit"
                            colorScheme="teal">
                            Update Post
                        </Button>
                    </Form>
                )}
            </Formik>
        </Layout>
    )
}

export default withApollo({ ssr: false })(EditPost)
