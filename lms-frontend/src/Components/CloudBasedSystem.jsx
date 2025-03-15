import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const CloudBasedSystem = () => {
  return (
    <Container fluid>
        <Row>
            <Col lg={12}>
                <div className='cloud-div'>
                    <h1>Cloud-Based System</h1>
                    <p>A Cloud-Based System is a computing solution that runs on remote servers and is accessible via the internet. Here are three key points about it:</p>
                </div>
            </Col>
        </Row>
        <Row>
          <Col md={12} lg={6}>
            <div className='cloud-img-div'>
                <img src="/Images/cloud.jpeg" alt="" />
            </div>
          </Col>
          <Col md={12} lg={6}>
            <div className='cloud-details-main-div'>
            <div className='cloud-details-div '>
                <div className='cloud-sub-div cloud-sub-div-one'>
                  <h6> Scalability & Flexibility</h6>
                  <p>Cloud systems allow businesses to scale resources up or down based on demand, making them cost-effective and adaptable to changing needs.</p>
                </div>
                <div className='cloud-sub-div cloud-sub-div-two'>
                  <h6> Remote Accessibility & Collaboration</h6>
                  <p>Users can access data and applications from anywhere with an internet connection, enabling seamless remote work and collaboration.</p>
                </div>
            </div>
            <div>
            <div className='cloud-sub-div cloud-sub-div-three'>
                  <h6> Cost Efficiency & Maintenance</h6>
                  <p>Cloud providers handle server management, security, and updates, reducing IT infrastructure costs and maintenance efforts.</p>
                </div>
            </div>
            </div>
          
          </Col>
        </Row>
    </Container>
  )
}

export default CloudBasedSystem