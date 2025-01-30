import { Form, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
// import React from 'react';

function UsernameForm({ onClose, onSubmit }) {

    const [inputValue, setInputValue] = useState('')
    const [isNameValid, setValidity] = useState(true)
    
    function submitName() {
        let name = document.querySelector('#usernameTextbox').value;
    
        if (!name.trim()) {
            setValidity(false);
            return;
        } else if (name.length > 20) { 
            setValidity(false);
            return;
        }
    
        setValidity(true);
        setInputValue(name);
        onSubmit(name);
    }

    return(
        <>
        <Container id='usernameFormContainer' className='border-white border rounded p-2 d-flex flex-column align-items-center'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=close" />
            <Container className='d-flex justify-content-end'>
            <Button onClick={ onClose } type="button" className='bg-transparent outline-none border-0'>
                <span className="material-symbols-outlined text-white">
                    close
                </span>
                </Button>
            </Container>
                <h4 className='text-light mb-2 flex-grow-1 text-center'>Enter Name</h4>
            <Form.Control id='usernameTextbox' className = 'm-2' type="text" placeholder="ex. John Smith" />
            <Button onClick={submitName} className = 'btn1 btn-outline-light m-2 mb-4 bg-transparent p-2 border-2 mx-auto fw-semibold m-2'>submit</Button>
            {!isNameValid && <p id='invalidName' className='ms-auto p-2 text-light bg-gradient border-light border rounded-4 position-absolute'>Name should not exceed 25 characters and should not be empty</p>}
        </Container>
        </>
    )
}

UsernameForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default UsernameForm