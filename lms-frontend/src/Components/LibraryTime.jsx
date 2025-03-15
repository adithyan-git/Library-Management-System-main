import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { deleteLibraryTime, sendLibraryTime, viewLibraryTime } from '../Redux/slice'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const LibraryTime = () => {
    const dispatch = useDispatch();
    const libraryTime = useSelector((state)=>state.books.libraryTime);
    const loginDetails = useSelector((state)=>state.books.loginDetails);
    const profileDetails = useSelector((state)=>state.books.profileDetails);




    useEffect(()=>{
        const viewTime = async () =>{
            try {
              const res = await axios.get('http://localhost:2000/viewtime')
            if(res.data.success){
              // toast.success(res.data.message);
              dispatch(viewLibraryTime(res.data.time))
            }else{
              toast.error(res.data.message);
            }
            } catch (error) {
              toast.error(error.message);
            }
        }
        viewTime();
     },[dispatch])

     const deleteTime = async (timeId) => {

        try {
          const res = await axios.delete(`http://localhost:2000/deletelibrarytime/${timeId}`)

        if(res.data.success){
          toast.success(res.data.message);
          dispatch(deleteLibraryTime(timeId))
        }else{
          toast.error(res.data.message);
        }
        } catch (error) {
          toast.error(error.message);
        }
     }
  return (
    <Container fluid className='padding-top'>
        <Row>
            <Col lg={12} className='p-0'>
               <div className='time-div'>
                       {

                        libraryTime.map((time)=>(
                          <div className='time-showing-div'>
                            <div className='open-close-time-div'>

                            <h5><span>Opening <br /> Time</span><h6>{time.openingtime}</h6></h5>
                            <h5><span>Closing <br /> Time</span><h6>{time.closingtime}</h6></h5>
                            </div>
                              <div className='day-head'>
                              <h4>Working Days</h4>
                              </div>
                            <div className='day-time-div'>

                          {
                            time.workingdays.map((day)=>(
                              <p>{day}</p>
                            ))
                          }
                          
                          </div>
                          {
                            loginDetails.role === ' admin' ? (<Link to={'/updatelibrarytime'} onClick={()=>dispatch(sendLibraryTime(time))}>
                            <span className='edit-time-span' ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg></span>
                            </Link>):(null)||profileDetails.role === 'admin' ? (<Link to={'/updatelibrarytime'} onClick={()=>dispatch(sendLibraryTime(time))}>
                            <span className='edit-time-span' ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg></span>
                            </Link>):(null)
                          }
                          {
                            loginDetails.role === ' admin' ? ( <span className='time-delete-span' onClick={()=>deleteTime(time._id)}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                              </svg>
                              </span>):(null)||profileDetails.role === 'admin' ? ( <span className='time-delete-span' onClick={()=>deleteTime(time._id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                          </svg>
                          </span>):(null)
                          }
                         
                            
                          </div>
                        ))
                       }
               </div>
            </Col>
        </Row>
    </Container>
  )
}

export default LibraryTime