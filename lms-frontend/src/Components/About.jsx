import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const About = () => {
  return (
    <Container fluid className='padding-top'>
        <Row>
            <Col lg={12} className='p-0'>

                <div className='abou-main-div'>
                    <h1>Book-Sphere</h1>
                    <p><strong>Book-Sphere</strong> is a software application designed to efficiently manage library operations such as book cataloging, user management, book issuance, and returns. It helps libraries automate tasks, reducing manual effort while ensuring accurate record-keeping. The system allows users to search for books, check availability, and borrow or return them with ease. Librarians can manage book details, track overdue returns, and calculate fines automatically</p>
                </div>
            </Col>
        </Row>
    </Container>
  )
}

export default About