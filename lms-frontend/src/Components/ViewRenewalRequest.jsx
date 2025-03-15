import React from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteAcceptedRenewalRequest, renewalEdit } from '../Redux/slice';
import axios from 'axios';
import { toast } from 'react-toastify';

const ViewRenewalRequest = () => {

        const renewalRequests = useSelector((state)=>state.books.renewalRequests);
        
        const dispatch = useDispatch();

        const deleteRenewalRequest = async (id) =>{

           try {
            const res = await axios.delete(`http://localhost:2000/deleteacceptedrenewalrequests/${id}`,{
                withCredentials:true
            })

            if(res.data.success){
                toast.success(res.data.message);
                dispatch(deleteAcceptedRenewalRequest(id))

            }else{
                toast.error(res.data.messsage);
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
                renewalRequests.length === 0 ? (<div className='no-msg-div'><h1>Renewal Request Are Empty .....</h1></div>):( <div className='renewal-table-div'>
                    <Table  className='renewal-table'>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>fullName</th>
                                <th>Email</th>
                                <th>RegisterNumber</th>
                                <th>BookName</th>
                                <th>BorrowedDate</th>
                                <th>DueDate</th>
                                <th>ExtendingDate</th>
                                <th>Request Status</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                renewalRequests.map((request,index)=>(
                                    <tr key={request._id}>
                                        <td>{index + 1}</td>
                                        <td>{request.fullname}</td>
                                        <td>{request.email}</td>
                                        <td>{request.registernumber}</td>
                                        <td>{request.bookname}</td>
                                        <td>{request.borrowdate}</td>
                                        <td>{request.duedate}</td>
                                        <td>{request.extendingdate}</td>
                                        <td style={{color:request.status === ("rejected") ? 'red' : (null)|| request.status === ("pending") ? 'red' : (null) || request.status === ("approved") ? 'green' : (null),fontWeight:'bolder',fontSize:'10px' }}>{request.status}</td>
                                        <td><Button className='renewaldate' as={Link} to={'/updaterenewal'} onClick={()=>dispatch(renewalEdit(request))}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                        </svg></Button>
                                        </td>
                                        <td><Button className='renewal-delete' onClick={()=>deleteRenewalRequest(request._id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-square" viewBox="0 0 16 16" >
                                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                            </svg></Button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
    
                    </Table>
                    </div>)
               }
            </Col>
        </Row>
    </Container>
  )
}

export default ViewRenewalRequest