import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const MobileFriendlyInterface = () => {
  return (
    <Container fluid>
        <Row>
            <Col md={12} lg={6}>
                <div className='mobilefriendly-div'>
                    <img src="/Images/mobile.jpeg" alt="" />
                </div>
            </Col>
            <Col md={12} lg={6}>
                <div className='mobile-friendly-img-details-div'>
                    <div className='mobile-friendly-details'>
                        <h3>Mobile-Friendly Interface</h3>
                        <p>A Mobile-Friendly Interface ensures that websites, applications, and digital platforms are optimized for seamless use on mobile devices. Here are three key points about it:</p>
                    </div>

                    <div  className='mobile-div-one'>
                        <div className='details-sub-one'>
                        <h6>
                        Responsive Design
                        </h6>
                        <p>
                        A mobile-friendly interface adapts to different screen sizes, ensuring that content looks good and functions well on smartphones, tablets, and desktops.
                        </p>
                        </div>
                    </div>
                    <div  className='mobile-div-two'>
                        <div className='details-sub-two'>
                        <h6>
                    Touch-Friendly Navigation
                    </h6>
                    <p>
                    It includes large buttons, easy-to-read text, and smooth scrolling to enhance usability on touchscreens, making interactions intuitive and effortless.
                    </p>
                        </div>
                    </div>
                    <div  className='mobile-div-three'>
                        <div className='details-sub-three'>
                        <h6>
                    Fast Loading & Performance Optimization
                    </h6>
                    <p>
                    A well-designed mobile interface reduces load times, optimizes images, and minimizes unnecessary scripts, improving speed and overall user experience. 
                    </p>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    </Container>
  )
}

export default MobileFriendlyInterface