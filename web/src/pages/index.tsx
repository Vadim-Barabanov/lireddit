import { withUrqlClient } from 'next-urql'
import React from 'react'
import { NavBar } from '../components/NavBar'
import { usePostsQuery } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'

const Index: React.FC<{}> = ({}) => {
    const [{ data }] = usePostsQuery()
    return (
        <>
            <NavBar />
            <h1>Hello world!</h1>
            <br />
            {!data ? (
                <div>Loading...</div>
            ) : (
                data.posts.map((p) => <div key={p.id}>{p.title}</div>)
            )}
        </>
    )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
