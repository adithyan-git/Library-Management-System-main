import axios from 'axios'
import React, { useEffect } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteReturnUserDetails, sendAllReturnBookUserDetails } from '../Redux/slice'
import { toast } from 'react-toastify'

const ViewReturnedBooksUserDetails = () => {

    const dispatch = useDispatch();
    const allReturnedBookDetails = useSelector((state)=>state.books.allReturnedBookDetails);

    useEffect(()=>{
        const returnedBookUserDetails = async ()=>{
            try {
                const res = await axios.get('http://localhost:2000/viewreturneduserdetails',{
                    withCredentials:true
                })
                if(res.data.success){
                    // toast.success(res.data.message);
                    dispatch(sendAllReturnBookUserDetails(res.data.allReturnedUsers))
                }else{
                    toast.error(res.data.message);
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
        
        returnedBookUserDetails();
    },[dispatch])

    const deleteReturnedDetail = async (id)=>{
       try {
        const res = await axios.delete(`http://localhost:2000/deletereturndbookdetails/${id}`,{
            withCredentials:true
        })

        if(res.data.success){
            toast.success(res.data.message);
            dispatch(deleteReturnUserDetails(id))
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
                allReturnedBookDetails.length === 0 ? (<div className='no-msg-div'><h1>No Returned Book Users....</h1></div>):( <div className='return-div'>
                    <Table className='returnDetails-table'>
          <thead>
            <tr>
              <th>No</th>
              <th>Fullname</th>
              <th>Email</th>
              <th>Bookname</th>
              <th>Registernumber</th>
              <th>Address</th>
              <th>Return Date</th>
              <th>Due Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
                allReturnedBookDetails.map((returnedbookUserDetails,index)=>(
                    <tr key={returnedbookUserDetails._id}>
                        <td>{index + 1}</td>
                        <td>{returnedbookUserDetails.fullname}</td>
                        <td>{returnedbookUserDetails.email}</td>
                        <td>{returnedbookUserDetails.bookname}</td>
                        <td>{returnedbookUserDetails.registernumber}</td>
                        <td>{returnedbookUserDetails.address}</td>
                        <td>{returnedbookUserDetails.returndate}</td>
                        <td>{returnedbookUserDetails.duedate}</td>
                        <td><Button onClick={()=>deleteReturnedDetail(returnedbookUserDetails._id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
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

export default ViewReturnedBooksUserDetails