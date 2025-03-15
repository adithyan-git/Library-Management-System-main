import React, { useState } from 'react'
import { Button, Container, Row,Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const HumanLive = () => {

  let [count,setCount]=useState(0);

  const increaseCount = ()=>{
    count = count + 1;
    setCount(count);
  }

  const decreaseCount = ()=>{
    count = count - 1; 
    setCount(count);

  }
  
  return (
    <Container fluid>
        <Row>
            <Col sm={12} md={12} lg={6} className='human-col p-0'>
              <div className='human-div'>
                <img src="/Humans/humans.jpg" alt="" />
              </div>
            </Col>
            <Col  sm={12} md={12} lg={6} className='human-col p-0'>
            <div className='human-div-two'>
              <h3>Benifits of Reading</h3>
            <p>Reading books offers numerous benefits, from expanding knowledge to improving vocabulary and creativity. It stimulates the brain, enhances focus, and strengthens analytical thinking. Books also reduce stress, boost emotional intelligence, and provide an escape into different worlds. Regular reading improves communication skills and fosters lifelong learning. Whether for entertainment or self-improvement, books play a vital role in personal growth and mental well-being.</p>
             <Link to={'/userallbooks'}><Button>Click</Button></Link> 
            </div>
            </Col>
        </Row>
        <Row>
          <Col  sm={12} lg={6} className='p-0'>
            <div className='about-us'>
                <h2>About <br /> Us</h2>
            </div>
          </Col>
          <Col  sm={12} lg={6} className='p-0'>
            <div className='about-img'>
                <img src="/Banner-Image/bannerimage2.png" alt="" />
                <p>A library is a treasure house of knowledge, offering books, journals, and digital resources for learning and research. It provides a quiet and peaceful environment for students, researchers, and readers to focus on their studies. Modern libraries include digital facilities, internet access, and e-books, making information more accessible. A well-organized library promotes reading habits, creativity, and intellectual growth in society.</p>
            </div>
          </Col>
        </Row>
        <Row>
        <Col  sm={12} md={12} lg={6} >
           {
            count === 0 ? ( <div className='main-div-sliding'>
              <div className='sliding-div'>
                <div className='advantage-img'>
                    <img src="/Humans/stress.jpg" alt="" />
                </div>
                <div className='advantage-details'>
                    <h6>Reduce Stress</h6>
                    <p>Books provide an escape from daily stress, promoting relaxation and mental well-being.</p>
                </div>
              </div>
              <span className='right-btn' onClick={ count >=2 ? (null):(()=>increaseCount())}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
              <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
              </svg></span>
              <span className='left-btn' onClick={count <=0 ? (null):(()=>decreaseCount())}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
              <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
              </svg></span>
          </div>):(count === 1 ? (<div className='main-div-sliding'>
                <div className='sliding-div'>
                  <div className='advantage-img'>
                      <img src="/Humans/knowledge.avif" alt="" />
                  </div>
                  <div className='advantage-details'>
                      <h6>Enhance Knowledge</h6>
                      <p>Books provide information on various topics, expanding your understanding of the world.</p>
                  </div>
                </div>
                <span className='right-btn' onClick={ count >=2 ? (null):(()=>increaseCount())}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                </svg></span>
                <span className='left-btn' onClick={count <=0 ? (null):(()=>decreaseCount())}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                  <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                </svg></span>
            </div>):(count === 2 ? ( <div className='main-div-sliding'>
                <div className='sliding-div' >
                  <div className='advantage-img'>
                      <img src="/Humans/vocabulary.jpg" alt="" />
                  </div>
                  <div className='advantage-details'>
                      <h6>Improve Vocabulary</h6>
                      <p>Exposure to new words and sentence structures helps improve communication skills.</p>
                  </div>
                </div>
                <span className='right-btn'onClick={ count >=2 ? (null):(()=>increaseCount())}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                </svg></span>
                <span className='left-btn' onClick={count <=0 ? (null):(()=>decreaseCount())}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                  <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                </svg></span>
            </div>):(null)))}
          </Col>
          <Col  sm={12} md={12} lg={6} className='p-0'>
              <div className='advantages-div'>
                  <h2>Advantages <br /> Of <br /> Reading</h2>
              </div>
          </Col>
         
        </Row>
    </Container>
  )
}

export default HumanLive