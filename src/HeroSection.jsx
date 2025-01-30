// import {Button} from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './header.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'react-bootstrap';
// import UserNameForm from './usernameForm.jsx';
// import React from 'react';

function heroSection( { onGetStarted}) {
    document.querySelector('body').style.background = 'linear-gradient(75deg, rgb(0, 0, 104), rgb(0, 6, 178), rgb(0, 0, 104))'

    return(
        <>
        <Container id='heroContainer' className = 'd-flex flex-column justify-content-center'>
            <Header/>
            <Button onClick={onGetStarted} className = 'btn1 btn-outline-light bg-transparent p-2 border-2 mx-auto fw-semibold m-2'>Get Started</Button>
        </Container>
        </>
    )
}

export default heroSection