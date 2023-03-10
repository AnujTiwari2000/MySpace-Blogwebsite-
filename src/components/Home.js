import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Header from './Header'
import Article from './Article'

import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

import { database } from '../firebase';


function Home() {
    
    const { currentUser } = useAuth()
    const [userDisabled, setUserDisabled] = useState("")


    const isDisabledUser = database.ref("disabled")
        .child(currentUser.uid)

    useEffect(() => {
        
        isDisabledUser.once("value")
        .then((snapshot) => {
            const value = snapshot.val()
            setUserDisabled(value)
            console.log(JSON.stringify(value))
         })
        .catch(error => ({
           errorCode: error.code,
           errorMessage: error.message
         }));

    }, [])
    
    return (
        <Container>
            {
                userDisabled ? 
                    
                    <Error>
                    <Card>
                        <ErrorHeading>
                            <p>Error !</p>
                        </ErrorHeading>
                        <ErrorContent>
                            Your Account <b>{currentUser.email}</b> is disabled, Contact Admin <i>info@admin.com</i>
                        </ErrorContent>
                        <SignIn>
                            <p> <Link to="/login">Sign In with another account</Link></p>
                        </SignIn>
                    </Card>
                </Error>
                :
                
                <Content>
                <Header/>

                <Article/>
            </Content>

             }
            
        </Container>
    )
}

export default Home

const Container = styled.div`
    height: 100vh;
`
const Content = styled.div`

`
const Error = styled.div`
    display: flex ;
    align-items: center;
    justify-content: center;
    height: 100vh;
`
const Card = styled.div`
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;    
`
const ErrorHeading = styled.div`
    text-align: center;
    font-size: 37px;
    color: red;
    font-style: bold;
    margin: 40px;
`
const ErrorContent = styled.div`
    padding: 20px;

    b{
        color: grey;
    }

    i{
        color: blue;
    }
`
const SignIn = styled.div`
    text-align: center;
    font-size: 14px;
    text-decoration: underline;
    margin-bottom: 10px;
`