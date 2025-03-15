
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { sendExpiredBorrowedBook, sendNotificationDetails } from '../Redux/slice'
import {  useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'

const BorrowedDateExpiredUsers = () => {

    const expiredBorrowedBook = useSelector((state)=>state.books.expiredBorrowedBook);
    const dispatch = useDispatch()
    
  

   const showmessage = () =>{
    toast('notification already sended')
   }

   useEffect(()=>{
    const bookReturnExpired = async () =>{
        try {
            const res = await axios.get('http://localhost:2000/automaticbookreturnexpiringnotification')

            if(res.data.success){
                toast.success(res.data.message);
                dispatch(sendExpiredBorrowedBook(res.data.borrowedExpiredUsers))
            }else{
                toast.success(res.data.message);
            }
        } catch (error) {
            // toast.error(error.message)
        }
    } 
    bookReturnExpired()
   },[]);
  return (
    <Container fluid className='padding-top'>
        <Row>
            <Col lg={12} className='p-0'>
               {
                expiredBorrowedBook.length === 0 ? (<div className='no-msg-div'><h1>No Expired Books ......</h1></div>):( <div className='expire-div'>
                    <Table  className='expiredbook-table'>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Fullname</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Place</th>
                                <th>RegisterNumber</th>
                                <th>BookName</th>
                                <th>BorrowedDate</th>
                                <th>DueDate</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                expiredBorrowedBook.map((expiredborrowedbook,index)=>(
                                    <tr key={expiredborrowedbook._id}>
                                        <td>{index + 1}</td>
                                        <td>{expiredborrowedbook.fullname}</td>
                                        <td>{expiredborrowedbook.email}</td>
                                        <td>{expiredborrowedbook.address}</td>
                                        <td>{expiredborrowedbook.place}</td>
                                        <td>{expiredborrowedbook.registernumber}</td>
                                        <td>{expiredborrowedbook.bookname}</td>
                                        <td>{expiredborrowedbook.borroweddate}</td>
                                        <td>{expiredborrowedbook.duedate}</td>
                                        <td>{expiredborrowedbook.messagestatus === 'nothing' ? (<Link to='/sendexpiredbookborrowednotification'><Button className='expiredbook-notification-btn' variant='warning' onClick={()=>dispatch(sendNotificationDetails(expiredborrowedbook))}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"/>
                                        </svg></Button></Link>):(<Button className='expiredbook-notification-btn' onClick={()=>showmessage()} variant='info' ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell-slash" viewBox="0 0 16 16">
                                        <path d="M5.164 14H15c-.299-.199-.557-.553-.78-1-.9-1.8-1.22-5.12-1.22-6q0-.396-.06-.776l-.938.938c.02.708.157 2.154.457 3.58.161.767.377 1.566.663 2.258H6.164zm5.581-9.91a4 4 0 0 0-1.948-1.01L8 2.917l-.797.161A4 4 0 0 0 4 7c0 .628-.134 2.197-.459 3.742q-.075.358-.166.718l-1.653 1.653q.03-.055.059-.113C2.679 11.2 3 7.88 3 7c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0c.942.19 1.788.645 2.457 1.284zM10 15a2 2 0 1 1-4 0zm-9.375.625a.53.53 0 0 0 .75.75l14.75-14.75a.53.53 0 0 0-.75-.75z"/>
                                        </svg></Button>)}</td>
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

export default BorrowedDateExpiredUsers