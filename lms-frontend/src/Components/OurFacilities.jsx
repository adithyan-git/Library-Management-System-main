import React from 'react'
import { Container, Row ,Col} from 'react-bootstrap'

const OurFacilities = () => {
  return (
    <Container fluid>
        <Row>
            <Col lg={12}>
                <div className='facilities-div'>
                    <h4>Our Facilites</h4>
                </div>
            </Col>
        </Row>
        <Row>
            <Col lg={6}>
                <div className='our-facility-main-first-div'>
                    <div className='facility-sub-div'>
                        <img src="/Images/seating.jpeg" alt="" />
                            <div className='facility-details'>
                                <h6>Comfortable Seating</h6>
                                <p>Proper chairs, tables, and reading spaces.</p>
                            </div>
                    </div>
                    <div className='facility-sub-div'>
                        <img src="/Images/quietarea.jpeg" alt="" />
                            <div className='facility-details'>
                                <h6>Quiet Study Areas</h6>
                                <p>Noise-free zones for focused reading.</p>
                            </div>
                    </div>
                </div>
            </Col>
            <Col lg={6}>
            <div className='facilit-second-main-div'>
                    <div className='facility-sub-div'>
                        <img src="/Images/borrowreturn.jpeg" alt="" />
                            <div className='facility-details'>
                                <h6>Borrowing & Return Services</h6>
                                <p>Efficient lending system with clear policies</p>
                            </div>
                    </div>
                    <div className='facility-sub-div'>
                        <img src="/Images/discussion.jpg" alt="" />
                            <div className='facility-details'>
                                <h6>Discussion Rooms</h6>
                                <p>Separate spaces for group study and discussions.</p>
                            </div>
                    </div>
                </div>
            </Col>
           
        </Row>

   
       
    </Container>
  )
}

export default OurFacilities