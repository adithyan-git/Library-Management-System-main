import React from 'react'
import { Container, Row,Col } from 'react-bootstrap'

const KnowledgeSection = () => {
  return (
    <Container fluid>
        <Row>
            <Col lg={12} >
                <div className='knowledge-div'>
                    <h3>Listen Other's <br /> Words</h3>
                </div>
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={6} lg={6}>
                <div className='person-div person-div-one person-one'>
                    <span>
                        <img src="/PersonImages/person1.jpg" alt="" />
                    </span>
                    <p>
                        "Reading will give knowledge"
                        <h6>~Alex</h6>

                    </p>

                </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
            <div className='person-div  person-two'>
                    <span>
                    <img src="/PersonImages/person2.webp" alt="" />

                    </span>
                    <p>
                       "Reading calms people's minds"
                       <h6>~Mathew</h6>

                    </p>

            </div>
            </Col>
         </Row>   
         <Row>
            <Col sm={12} md={6} lg={6}>
            <div className='person-div person-div-one person-three'>
                    <span>
                    <img src="/PersonImages/person3.png" alt="" />
                    </span>
                    <p>
                       "Knowledge will lead you to progress"
                       <h6>~Jorge</h6> 
                    </p>
            </div>
            </Col>
            <Col sm={12} md={6} lg={6}>
            <div className='person-div person-four'>
                     <span>
                     <img src="/PersonImages/person4.jpg" alt="" />
                    </span>
                    <p>
                        "Reading will motivate you"
                        <h6>~Jhon</h6>
                    </p>

            </div>
            </Col>
        </Row>
    </Container>
  )
}

export default KnowledgeSection