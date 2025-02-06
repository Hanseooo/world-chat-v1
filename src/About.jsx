import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import worldImg from './assets/world.png'
import reactPng from './assets/React.png'
import jsPng from './assets/JavaScript.png'
import htmlPng from './assets/HTML5.png'
import cssPng from './assets/CSS3.png'
import firebasePng from './assets/Firebase.png'
import reactBootstrap from './assets/React-Bootstrap.png'


function About() {
    document.querySelector('body').style.background = 'linear-gradient(60deg, rgb(33, 33, 49), rgb(17, 17, 69), rgb(40, 40, 57))'

    return (
        <>
        <Container className='aboutContainer d-flex flex-column align-items-center justify-content-center'>
            <Row className='my-sm-1 my-2'>
                <Col className = ' p-2 d-flex align-items-center justify-content-center flex-column'>
                <span>
                <h4 className='fw-bold'>About World Chat</h4>
                <p>World Chat is a simple web application that lets users send messages to everyone in the world</p>
                </span>
                </Col>
                <Col className='d-none d-sm-flex justify-content-center align-items-center'>
                <img src={worldImg} className='defaultAboutImg' id='' width = {800 + 'px'} />
                </Col>
            </Row>
            <Row className='my-sm-1 my-2'>
                <Col className='d-none d-sm-flex justify-content-center align-items-center'>
                <img src={reactPng} className='defaultAboutImg' id='' width = {800 + 'px'} />
                
                </Col>
                <Col className='d-flex justify-content-center align-items-center'>
                <span>
                <h4 className='fw-bold'>Why was World Chat Created</h4>
                <p>This served as my first React project helping me learn <span>
                    <a href='https://react.dev/' target='blank' className='text-light fst-italic'>
                     React</a></span> and enhancing my web dev skills</p>
                </span>
                </Col>
            </Row>
            <hr className='text-light' />
        <h2 className='text-light text-center fst-italic fw-semibold mt-5 mt-sm-1'>Technologies used</h2>
        <div className="wrapper">
                <div className="item item1"><img className='marqueeImg' src={reactPng} alt="" /></div>
                <div className="item item2"><img className='marqueeImg' src={firebasePng} alt="" /></div>
                <div className="item item3"><img className='marqueeImg' src={htmlPng} alt="" /></div>
                <div className="item item4"><img className='marqueeImg' src={cssPng} alt="" /></div>
                <div className="item item5"><img className='marqueeImg' src={jsPng} alt="" /></div>
                <div className="item item6"><img className='marqueeImg' src={reactBootstrap} alt="" /></div>
        </div>
        </Container>

        <Container className='aboutContainer'>

        </Container>
        </>
    )
}

export default About