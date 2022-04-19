import { Button, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { AuthToken } from '../models'

const Home: NextPage = () => {

    useEffect(() => {
        const userToken = window.location.hash.substring(
            window.location.hash.indexOf('token=') + 6,
            window.location.hash.indexOf('&token_type')
        )
        const duration = window.location.hash.substring(
            window.location.hash.indexOf('expires_in=') + 11
        )

        const authToken: AuthToken = {
            service: 'Spotify',
            authToken: userToken,
            createdAt: new Date(),
            duration: parseInt(duration)
        }

        localStorage.setItem('authToken', JSON.stringify(authToken))

        window.open('http://localhost:3000/', '_self')
    }, [])


    return (
        <VStack>
            <Head>
                <title>Songle</title>
                <meta name="description" content="callback" />
                <link rel="icon" href="/favicon.ico" />
            </Head>


        </VStack>
    )
}


export default Home