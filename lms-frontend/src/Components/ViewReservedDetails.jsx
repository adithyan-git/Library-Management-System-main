import axios from 'axios'
import React, { useEffect } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { reservedBook, userReservedBookDetails } from '../Redux/slice'
import { Link } from 'react-router-dom'

const ViewReservedDetails = () => {

    const dispatch = useDispatch();
    const reservedUserBookDetails = useSelector((state)=>state.books.reservedUserBookDetails);
    
    useEffect(()=>{
        const reservedBookDetails = async ()=>{
            try {
                const res = await axios.get('http://localhost:2000/viewreserveddetails',{
                    withCredentials:true
                })

                if(res.data.success){
                    toast.success(res.data.message);
                    dispatch(userReservedBookDetails(res.data.reservedUser))
                }else{
                    toast.error(res.data.message);
                }
            } catch (error) {
                toast.error(error.message);

            }
        }
        reservedBookDetails()
    },[dispatch])

    const sendMessage = () => {
        toast('you are already borrowed book')
    }


  
  return (
    <Container fluid className='padding-top'>
        <Row>
            <Col lg={12} >
                {
                    reservedUserBookDetails.length === 0 ? (<div className='no-msg-div'><h1>No Reserved Details....</h1></div>):(<div className='table-div-reserved'>
                        <Table  className='reserved-details-table' >
              <thead>
                <tr>
                  <th>No</th>
                  <th>Bookname</th>
                  <th>image</th>
                  <th>ReservedDate</th>
                  <th>Request Status</th>
                  <th>Message</th>
                  <th>DeadLine</th>
                  <th>BorrowStatus</th>
                  <th>Message</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
               {
                reservedUserBookDetails.map((book,index)=>(
                  <tr key={book._id}>
                  <td>{index + 1}</td>
                  <td>{book.bookname}</td>
                  <td><img src={`http://localhost:2000/${book.bookimage}`} alt="" /></td>
                  <td>{book.reserveddate}</td>
                  <td><p style={{backgroundColor:book.request === ('pending' , 'rejected') ? 'rgba(232, 145, 145, 0.71)' : 'lightgreen', fontWeight:'bolder' }}>{book.request}</p></td>
                  <td>{book.request === ('approved'&&'not borrowed') ? " send borrow request for this book before your deadline":null || book.request === 'rejected' ? "reservation rejected,you cann't reserve this book":null || book.request === 'pending' ? "request will be updated later " :null  }</td>
                  <td style={{color:book.deadline === 'nothing' ? 'orange' : 'red', fontWeight:'bolder' }}> { book.request === 'rejected' ? null : book.deadline}</td>
                  <td><p style={{color:book.borrowstatus === 'borrowed' ? 'green':'blue',backgroundColor:book.borrowstatus === 'borrowed' ? 'lightgreen':'skyblue'}}>{book.borrowstatus}</p></td>
                  <td>{book.borrowstatus === "borrowed" ? 'this message will delete automatically' : 'no message' || book.borrowstatus === 'notborrowed' ? 'this message will delete automatically' : 'no message' }</td>
                  <td>{book.borrowstatus === 'not borrowed' && book.request === 'approved' && book.reservemessage === 'nothing'  ? <Link to='/borrowbooks'><Button onClick={()=>dispatch(reservedBook(book))}>Borrow</Button></Link>: book.borrowstatus === 'borrowed' && book.request === 'approved'  ? <Button onClick={()=>sendMessage()}>Borrowed</Button>:book.reservemessage === 'sended' ? 'request sended' : null} </td>
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

export default ViewReservedDetails