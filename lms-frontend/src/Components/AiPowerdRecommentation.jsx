import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const AiPowerdRecommentation = () => {
  return (
    <Container fluid> 
        <Row>
            <Col lg={12} >
                <div className='ai-div padding-top'>
                    <h1>Al Powerd Recommentations</h1>
                    <p>AI-powered recommendations use machine learning algorithms and data analysis to suggest relevant content, products, or actions to users.</p>
                </div>
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={4} lg={2}>
              <div className='ai-details-div ai-details-div-one'>
              <img src="/Images/driven.png" alt="" />
              <h6>
              Data-Driven Decision Making
              </h6>
              <p>
              AI processes vast amounts of data to identify patterns and trends, improving decision-making in businesses and services.
              </p>
              </div>
            </Col>
            <Col sm={12}  md={4} lg={2}>
            <div className='ai-details-div ai-details-div-two'>
            <img src="/Images/adaption.png" alt="" />

            <h6>
               Real-Time Adaptation
            </h6>
            <p>
            AI systems continuously learn and update recommendations based on real-time user interactions
            </p>
            </div>
            </Col>
            <Col sm={12}  md={4} lg={2}>
            <div className='ai-details-div ai-details-div-three'>
            <img src="/Images/experience.jpeg" alt="" />

            <h6>
            Enhanced User Experience
            </h6>
            <p>
            By reducing search time and delivering relevant content, AI makes user interactions smoother and more efficient
            </p> 
            </div>
            </Col>
            <Col sm={12}  md={4} lg={2}>
            <div className='ai-details-div ai-details-div-four'>
            <img src="/Images/upsell.jpg" alt="" />

            <h6>
            Cross-Selling & Upselling
          </h6>
          <p>
          AI suggests complementary products
          </p>
              </div>
            </Col>
            <Col sm={12}  md={4}  lg={2}>
            <div className='ai-details-div ai-details-div-five'>
            <img src="/Images/multiindustry.jpeg" alt="" />

            <h6>
            Multi-Industry Applications
              </h6>
              <p>
              From retail and streaming services to healthcare and finance, AI recommendations optimize experiences across various fields.
              </p>
                </div>
            </Col>
            <Col sm={12}  md={4} lg={2}>
            <div className='ai-details-div ai-details-div-six'>
            <img src="/Images/retension.jpg" alt="" />

            <h6>
            Improved Customer Retention
            </h6>
            <p>
            By keeping users engaged with relevant suggestions, AI helps businesses retain customers
            </p>
            </div>
            </Col>
           
        </Row>
        <Row style={{justifyContent:'center'}}>
            <Col sm={12}  md={4} lg={2}>
            <div className='ai-details-div ai-details-div-seven'>
                <img src="/Images/suggetion.jpeg" alt="" />
                <h6>Personalized Suggestions</h6>
                <p>AI analyzes user behavior, preferences, and past interactions to offer customized recommendations</p>
            </div>
            </Col>
            <Col sm={12}  md={4} lg={2}>
            <div className='ai-details-div ai-details-div-eight'>
            <img src="/Images/automated.jpeg" alt="" />

                <h6>
                Automated Learning & Optimization
                </h6>
                <p>
                Machine learning models improve over time by analyzing new data, making recommendations more accurate and effective.
                </p>
              </div>
            </Col>
            <Col sm={12}  md={4} lg={2}>
            <div className='ai-details-div ai-details-div-nine'>
            <img src="/Images/fraud.jpeg" alt="" />

                <h6>
                Fraud Detection & Risk Assessment
                </h6>
                <p>
                AI-powered recommendation systems can also detect anomalies and suggest actions to prevent fraud
                </p>
                </div>
            </Col>
            <Col sm={12}  md={4} lg={2}>
            <div className='ai-details-div ai-details-div-ten'>
            <img src="/Images/ethical.png" alt="" />

            <h6>
            Privacy & Ethical Challenges
            </h6>
            <p>
            While AI recommendations improve experiences, they raise concerns about data privacy, bias, and transparency in decision-making.
            </p>
              </div>
            </Col>
        </Row>
    </Container>
  )
}

export default AiPowerdRecommentation