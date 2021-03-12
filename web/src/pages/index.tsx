import { withUrqlClient } from 'next-urql'
import React from 'react'
import { NavBar } from '../components/NavBar'
import { createUrqlClient } from '../utils/createUrqlClient'

const Index: React.FC<{}> = ({}) => {
    return (
        <>
            <NavBar />
            <h1>Hello world!</h1>
        </>
    )
}

export default withUrqlClient(createUrqlClient)(Index)
