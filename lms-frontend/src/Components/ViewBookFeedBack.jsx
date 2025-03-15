import React, { useEffect } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { deleteBookFeebacks, displayBookFeedBack } from '../Redux/slice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const ViewBookFeedBack = () => {

    const dispatch = useDispatch();
    const bookFeedbacks = useSelector((state)=>state.books.bookFeedBack);
    
   useEffect(()=>{
    const displayFeedback = async ()=> {
        try {
          const res = await axios.get('http://localhost:2000/viewBookfeedback',{
            withCredentials:true
          });
      
          if(res.data.success){
            // toast.success(res.data.message);
            dispatch(displayBookFeedBack(res.data.allFeedback))
          }else{
            toast.error(res.data.message)
          }
        } catch (error) {
          toast.error(error.message)
        }
      }
      displayFeedback();
   },[dispatch])

   const deleteBookFeedBack = async ( feedbackId) => {

    try {
      const res = await axios.delete(`http://localhost:2000/deletebookfeedback/${feedbackId}`,{
        withCredentials:true
      })
    if(res.data.success){
      toast.success(res.data.message);
      dispatch(deleteBookFeebacks(feedbackId))
    }else{
      toast.error(res.data.message);
    }
    } catch (error) {
      toast.error(error.message)
    }
   }
  return (
    <Container fluid className='padding-top'>
        <Row>
                <Col lg={12}  className='p-0'>
                   {
                    bookFeedbacks.length === 0 ? (<div className='no-msg-div'><h1>No Book Feedbacks ....</h1></div>):(<div className='bookfeedback-table-div'>
                      <Table  className='bookfeedback-table'>
                       <thead>
                           <tr>
                           <th>No</th>
                           <th>Fullname</th>
                           <th>Email</th>
                           <th>Address</th>
                           <th>Date</th>
                           <th>Feedback</th>
                           <th></th>
                           </tr>
                       </thead>
                       <tbody>
                   {bookFeedbacks.map((bookfeedback,index)=>(
                               <tr key={bookfeedback._id}>
                                   <td>{index+1}</td>
                                   <td>{bookfeedback.fullname}</td>
                                   <td>{bookfeedback.email}</td>
                                   <td>{bookfeedback.address}</td>
                                   <td>{bookfeedback.date}</td>
                                   <td>{bookfeedback.feedback}</td>
                                   <td><span onClick={()=>deleteBookFeedBack(bookfeedback._id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                                     <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                     <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                   </svg></span></td>
                               </tr>
                        ))}
                   </tbody>
                        </Table>
                      </div>)
                   }
                </Col>
           
        </Row>
    </Container>
  )
}

export default ViewBookFeedBack