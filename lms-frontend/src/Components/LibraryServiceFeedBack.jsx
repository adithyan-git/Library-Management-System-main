import React, { useEffect } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { deleteBookFeedbacks, displayLibraryServiceFeedback } from '../Redux/slice';
import axios from 'axios';
import { toast } from 'react-toastify';

const LibraryServiceFeedBack = () => {
    const dispatch = useDispatch();
    const libraryServiceFeedbacks = useSelector((state)=>state.books.libraryServiceFeedback);
    
   useEffect(()=>{
    const displayLibraryServiceFeedbacks = async ()=> {
        try {
          const res = await axios.get('http://localhost:2000/viewlibraryservicefeedback',{
            withCredentials:true
          });
      
          if(res.data.success){
            // toast.success(res.data.message);
            dispatch(displayLibraryServiceFeedback(res.data.allFeedback))
          }else{
            toast.error(res.data.message)
          }
        } catch (error) {
          toast.error(error.message)
        }
      }
      displayLibraryServiceFeedbacks();
   },[dispatch])

   const deleteFeedBack = async ( feedbackId) => {

    try {
      const res = await axios.delete(`http://localhost:2000/deletelibraryservicefeedback/${feedbackId}`,{
        withCredentials:true
      })
    if(res.data.success){
      toast.success(res.data.message);
      dispatch(deleteBookFeedbacks(feedbackId))
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
            <Col  lg={12} className='p-0'>
              {
                libraryServiceFeedbacks.length === 0 ? (<div className='no-msg-div'><h1>No Service Feedbacks.....</h1></div>):(<div className='service-div'>
                  <Table  className='servive-feedback-table'>
          <thead>
            <tr>
              <th>No</th>
              <th>Fullname</th>
              <th>Email</th>
              <th>Register Number</th>
              <th>Feedback</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {libraryServiceFeedbacks.map((libraryServiceFeedback,index)=>(
                <tr key={libraryServiceFeedback._id}>
                <td>{index+1}</td>
                <td>{libraryServiceFeedback.fullname}</td>
                <td>{libraryServiceFeedback.email}</td>
                <td>{libraryServiceFeedback.registernumber}</td>
                <td>{libraryServiceFeedback.message}</td>
                <td><span onClick={()=>deleteFeedBack(libraryServiceFeedback._id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
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

export default LibraryServiceFeedBack