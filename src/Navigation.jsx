import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { Container, Navbar, Nav } from 'react-bootstrap'


function Navigation({ onChangeView }) {

    return(
        <Navbar fluid id='navContainer' className='border-bottom py-2 sticky-top px-2 px-sm-4' expand="sm">
            <Container className='d-flex justify-content-between'>
                <Navbar.Brand className='fw-semibold text-decoration-none text-light fs-5' href='#'>World Chat</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="text-white border-0"><span class="material-symbols-outlined">
menu
</span> </Navbar.Toggle>
            </Container>
            <Navbar.Collapse id="basic-navbar-nav" className='text-end px-4'> 
                <Nav className='ml-auto'> 
                    <Nav.Link onClick={() => onChangeView('home')} className='text-light'>Home</Nav.Link>
                    <Nav.Link onClick={() => onChangeView('chat')} className='text-light'>Chat</Nav.Link>
                    <Nav.Link onClick={() => onChangeView('about')} className='text-light'>About</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
    
}

Navigation.propTypes = {
    onChangeView: PropTypes.func.isRequired,
}

export default Navigation