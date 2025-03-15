import axios from 'axios'
import React, { useEffect } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteReservedUserDetails, reservedBookDetail, sendReservedDetails } from '../Redux/slice'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const ViewReservedBooks = () => {

    const dispatch = useDispatch();
    const reservedbooksDetails = useSelector((state)=>state.books.reservedbooksDetails);
    
    useEffect(()=>{
        const reservedBooks = async ()=>{
            try {
                const res = await axios.get('http://localhost:2000/viewallreservedbooks',{
                  withCredentials:true
                })
                if(res.data.success){
                    // toast.success(res.data.message);
                    dispatch(reservedBookDetail(res.data.allreservedBooks))
                   }else{
                     toast.error(res.data.message);
                   }
            } catch (error) {
                toast.error(error.message)
            }
        }
        reservedBooks();
    },[dispatch])

    const cancelReservation = async (reserveId)=>{
        try {
          const res =  await axios.delete(`http://localhost:2000/cancelreservation/${reserveId}`,{
            withCredentials:true
          })
          if(res.data.success){
            toast.success(res.data.message);
            dispatch(deleteReservedUserDetails(reserveId))
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
            {
              reservedbooksDetails.length === 0 ? (<div className='no-msg-div'><h1>No Resereved Book Requests.....</h1></div>):(<div className='reserved-table-div'>
                <Table  className='reserved-table'>
                    <thead>
                        <tr>
                        <th>No</th>
                        <th>Fullname</th>
                        <th>Email</th>
                        <th>Place</th>
                        <th>Register Number</th>
                        <th>Bookname</th>
                        <th>Reserved Date</th>
                        <th>Request</th>
                        <th>Deadline</th>
                        <th></th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                         reservedbooksDetails.map((reservedBookDetail,index)=>(
                            <tr key={reservedBookDetail._id}>
                            <td>{index + 1}</td>
                            <td>{reservedBookDetail.fullname}</td>
                            <td>{reservedBookDetail.email}</td>
                            <td>{reservedBookDetail.place}</td>
                            <td>{reservedBookDetail.registernumber}</td>
                            <td>{reservedBookDetail.bookname}</td>
                            <td>{reservedBookDetail.reserveddate}</td>
                            <td style={{color:reservedBookDetail.request === "approved" ? 'green':'red',fontWeight:'bold'}}>{reservedBookDetail.request}</td>
                            <td>{reservedBookDetail.deadline}</td>
                            <td>
                                <Button className='edit-btn' as={Link} to='/updatereserveddetails' onClick={()=>dispatch(sendReservedDetails(reservedBookDetail))}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                                  </svg>
                              </Button>
                            </td>
                            <td><Button className='delete-reservation' onClick={()=>cancelReservation(reservedBookDetail._id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                          </svg></Button></td>
                        </tr>
                         ))
                       }
                    </tbody>
                </Table> 
                  </div>  )
            }     
            </Col>
        </Row>
    </Container>
  )
}

export default ViewReservedBooks