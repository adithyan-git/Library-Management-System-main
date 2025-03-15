import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const OurAdvancedTechnology = () => {
  return (
    <Container>
        <Row>
            <Col sm={12} md={12} lg={12}>
                <div className='advance-div'>
                    <h3>Our Upcoming Technologies</h3>
                </div>
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={6} lg={3}>
            <div className='advanced-technology-div'>
            <Card style={{ width: '18rem' }}>
                <Link to='/airecommentation'>    
                <Card.Img variant="top" src="/Images/ai.webp" />
                </Link>
            <Card.Body>
                <Card.Title>AI-Powered Recommendations</Card.Title>
                <Card.Text>
                Personalized book suggestions.
                </Card.Text>
            </Card.Body>
            </Card>
            </div>
            </Col>
            <Col sm={12} md={6} lg={3}>
            <div className='advanced-technology-div'>
            <Card style={{ width: '18rem' }}>
            <Link to='/barcode'>
              <Card.Img variant="top" src="/Images/barcode.jpg" />
            </Link>
            <Card.Body>
                <Card.Title>OCR & Barcode Scanning</Card.Title>
                <Card.Text>
                Fast book identification & cataloging.
                </Card.Text>
            </Card.Body>
            </Card>
            </div>
            </Col>
            <Col sm={12} md={6} lg={3}>
            <div className='advanced-technology-div'>
            <Card style={{ width: '18rem' }}>
                <Link to={'/cloud'}>
                    <Card.Img variant="top" src="/Images/cloud.jpeg" />
                </Link>
            <Card.Body>
                <Card.Title>Cloud-Based System </Card.Title>
                <Card.Text>
                Access library data from anywhere
                </Card.Text>
            </Card.Body>
            </Card>
            </div >
            </Col>
            <Col sm={12} md={6} lg={3}>
            <div className='advanced-technology-div'>
            <Card style={{ width: '18rem' }}>
                <Link to='/mobilefriendlyinterface'>
                    <Card.Img variant="top" src="/Images/mobile.jpeg" />
                </Link>
            <Card.Body>
                <Card.Title>Mobile-Friendly Interface</Card.Title>
                <Card.Text>
                Seamless experience on all devices.
                </Card.Text>
            </Card.Body>
            </Card>
            </div >
            </Col>
        </Row>
    </Container>
  )
}

export default OurAdvancedTechnology