import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const DetailsOfSingleBook = () => {

    const bookDetails  = useSelector ( (state) => state.books.bookDetails );
    const loginDetails  = useSelector ( (state) => state.books.loginDetails );



    const ConfirmMessage = () => {
        toast('only membershiper  person can send feedback')
    }

    const sendMessage = () => {
        toast('book can  borrow only membership users')
    }
     
    const reserveMessage = () => {
        toast('only membershiperd users can reserve book')
    }
  return (
    <Container fluid className='padding-top'>
            <Row>
                <Col lg={6} >
                        
                        <div className='bookdetails-img-div my-5'>     
                                <div className='details-single-image-div'>
                                <img src={`http://localhost:2000/${bookDetails.bookimage}`} alt="" />
                                </div>
                            <div className='book-details-head'>
                                <h5>{bookDetails.title}</h5>
                            </div> 
                            {
                                loginDetails.role === 'user' ? (<div className='feedback-div'>
                                    <Link to='/sendbookfeedback' onClick={()=>ConfirmMessage()}><span>FeedBack <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
                                    </svg></span></Link>
        
                                    </div>):(null)
                            }
                        </div>
                </Col>
                <Col lg={6} >
                    <div className='bookdetails-main-div my-5'>
                        <h4>Details</h4>

                        <div className='details-div'>
                            <h6><p>Title</p><span>{bookDetails.title}</span></h6>
                            <h6><p>Author</p><span>{bookDetails.author}</span></h6>
                            <h6><p>Genre</p><span>{bookDetails.genre}</span></h6>
                            <h6><p>Publisher</p><span>{bookDetails.publisher}</span></h6>
                            <h6><p>BookStatus</p><span style={{color: bookDetails.bookstatus === ("not-available" || "notavailable") ? "red" : "green"}}>{bookDetails.bookstatus}</span></h6>
                            <h6><p>Price</p><span>$:-{bookDetails.price}</span></h6>
                        </div>
                        <div className='summary-div'>
                            <h6>summary</h6>
                            <p>{bookDetails.summary}</p>
                        </div>
                        <div className='borrowbook-btn'>
                            {
                                ['librarian','user'].includes(loginDetails.role)  ? (<Link to='/'><Button>Cancel</Button></Link>
                                ):(null) 
                             }
                             {
                                ['not-available','not available','notavailable'].includes(bookDetails.bookstatus) ? (['librarian','user'].includes(loginDetails.role) ? (<Link to={'/rervebook'}><Button onClick={()=>reserveMessage()}>Reserve</Button></Link>):(null)):(['librarian','user'].includes(loginDetails.role) ? (<Link  to={'/borrowbooks'}><Button onClick={()=>sendMessage()}>Borrow</Button></Link>):(null))
                             }
                             
                              
                            
                        </div>
                    </div>
                    
                </Col>
               
            </Row>
           
    </Container>
        
  )
}

export default DetailsOfSingleBook