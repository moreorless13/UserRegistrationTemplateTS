import React, { useState } from 'react';
import Auth from '../utils/auth'
import { useQuery } from '@apollo/client';
import { QUERY_USERS, QUERY_FILTER_USERS } from '../utils/queries';
import LoginForm from '../components/forms/LoginForm';
import SignupForm from '../components/forms/SignUpForm';
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm';
import DeleteAccount from '../components/forms/DeleteAccountForm';
import Jumbotron from '../components/Jumbotron';
import { Button, Modal, Card, Row, Col } from 'react-bootstrap'
import FollowUserButton from '../components/buttons/FollowUnFollow';



const HomePage = () => {
    const [myUsername, setMyUsername] = useState(localStorage.getItem('username'))

    const { data } = useQuery(QUERY_FILTER_USERS);
    console.log(data)
    
    const usersMap = data?.filterUsers.map((user: any) => {

        const handleClick = (event: any) => {
            event.preventDefault()
            window.location.assign(`/profile/${user._id}`)
        }
        console.log(user)
        return (
            <Col>
                <Card>
                    <Card.Body id={user?._id} key={user?._id}>
                        <Card.Title key={user?.username}>{user.username}</Card.Title>
                        <Card.Subtitle>{user.email}</Card.Subtitle>
                        <Card.Text>{user.accountStatus}</Card.Text>
                        <Button onClick={handleClick}>{user?.username}'s Profile</Button>
                    </Card.Body>
                    <Card.Footer><FollowUserButton _id={user._id} /></Card.Footer>
                </Card>
            </Col>
        )
    })

   
    if (Auth.loggedIn()) {
        return (
            <Jumbotron>
                <h1>Welcome back, {myUsername}!</h1>
                <Row xs={1} md={2}>
                    {usersMap}
                </Row>
                <br />
                <div className='row'>

                </div>
            </Jumbotron>
        )
    } else {
        return (
            <Jumbotron>
                <SignupForm />
            </Jumbotron>
        )
    }
}

export default HomePage;