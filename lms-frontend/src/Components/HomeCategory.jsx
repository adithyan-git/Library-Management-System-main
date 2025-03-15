import React from 'react'
import { Container, Row,Col } from 'react-bootstrap'
import { sendCategory } from '../Redux/slice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const HomeCategory = () => {

    const dispatch = useDispatch()

  return (
    <Container fluid>

        <Row>
            <Col sm={12}  md={12}  lg={12}>
                <div className='category-div'>
                    <h3>Explore Our Categoryies</h3>
                </div>
            </Col>
        </Row>
        <Row>
            <Col sm={6} md={4} lg={2}>
            <div className='category-list-div'>
                <Link  to ='/category'>
                <span className='span1'  onClick={()=>dispatch(sendCategory("fiction"))}>
                    <img src="/CategoryImage/fiction.png" alt=""   />
                </span>
                </Link>
                <p>Fiction</p>
            </div>
            </Col>
            <Col sm={6}  md={4} lg={2}>
            <div className='category-list-div'>
                <Link  to ='/category'>
                <span className='span2' onClick={()=>dispatch(sendCategory("academic and educational"))}>
                <img src="/CategoryImage/educational.png" alt="" />
                </span>
                </Link>
                <p>Educational</p>
            </div>
            </Col>
            <Col sm={12}  md={4} lg={2}>
            <div className='category-list-div'>
                <Link  to ='/category'>
                <span className='span3' onClick={()=>dispatch(sendCategory("children's books"))}>
                <img src="/CategoryImage/childrens.png" alt="" />

                </span>
                </Link>
                <p>Children's</p>
            </div>
            </Col>
            <Col sm={6}  md={4} lg={2}>
            <div className='category-list-div'>
                <Link  to ='/category'>
                <span className='span4' onClick={()=>dispatch(sendCategory("history and culture"))}>
                <img src="/CategoryImage/culture.png" alt="" />

                </span>
                </Link>
                <p>Culture</p>
            </div>
            </Col>
            <Col sm={6}  md={4} lg={2}>
            <div className='category-list-div'>
               <Link  to ='/category'>
               <span className='span5' onClick={()=>dispatch(sendCategory("science and technology"))}>
                <img src="/CategoryImage/science2.png" alt="" />

                </span>
               </Link>
                <p>Science</p>
            </div>
            </Col>
            <Col sm={6}  md={4} lg={2}>
            <div className='category-list-div'>
                <Link  to ='/category'>
                <span className='span6' onClick={()=>dispatch(sendCategory("travel and adventure"))}>
                <img src="/CategoryImage/travel.png" alt="" />
                </span>
                </Link>
                <p>Travel</p>
            </div>
            </Col>
        </Row>
    </Container>
  )
}

export default HomeCategory