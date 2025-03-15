import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBorrowRequest, returnBook, sendBorrowDetails, sendExpiredBorrowedBook } from '../Redux/slice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ViewBooksBorrowRequest = () => {

    const dispatch = useDispatch();
    const borrowBookRequest = useSelector((state)=>state.books.borrowBookRequest);
    const navigate = useNavigate();
    console.log('ooooooooooooooooooo',borrowBookRequest);
    

   

    // useEffect(()=>{
    //     const viewBorrowBookRequest = async ()=>{
    //         try {
    //             const res = await axios.get('http://localhost:2000/viewborrowbooks',{
    //               withCredentials:true
    //             })
            
    //         if(res.data.success){
    //             // toast.success(res.data.message);
    //             dispatch(sendBookBorrowRequest(res.data.allBorrowedBooks))
    //         }else{
    //             toast.error(res.data.message)
    //         }
    //         } catch (error) {
    //             toast.error(error.message)
    //         }
    //     }
    
    //     viewBorrowBookRequest()
    // },[dispatch])

  
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
          toast.error(error.message)
      }
  } 
  
    const deleteBorrowDetail = async (borrowedId) =>{
      try {
        const res = await axios.delete(`http://localhost:2000/deleteborroweddetails/${borrowedId}`,{
          withCredentials:true
        })
        if(res.data.success){
           toast.success(res.data.message);
           dispatch(deleteBorrowRequest(borrowedId));
           bookReturnExpired()
           navigate('/viewborrowbooksrequest');
          }else{
            toast.error(res.data.message)
          }
      } catch (error) {
          toast.error(error.message)
      }
    }

    const sendApprove = () => {
      toast('return approved')
    }
  return (
    <Container fluid className='padding-top'>
        <Row>
            <Col lg={12} className='p-0'>
           {
            borrowBookRequest.length === 0 ? (<div className='no-msg-div'><h1>No Borrow Books Request....</h1></div>):( <div className='borrowtable-div'>
              <Table  className='borrow-form' responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Fullname</th>
            <th>Email</th>
            <th>Address</th>
            <th>RegisterNumber</th>
            <th>Place</th>
            <th>BookName</th>
            <th>Request sended Date</th>
            <th>Request</th>
            <th>Borrowed Date</th>
            <th>BorrowStatus</th>
            <th>DueDate</th>
            <th>ExpireStatus</th>
            <th>Return</th>
            <th>RenewStatus</th>
            <th>Edit</th>
            <th>Approve Return</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
         {borrowBookRequest.map((borrowRequest,index)=>(
           <tr key={borrowRequest._id}>
           <td>{index + 1}</td>
           <td>{borrowRequest.fullname}</td>
           <td>{borrowRequest.email}</td>
           <td>{borrowRequest.address}</td>
           <td>{borrowRequest.registernumber}</td>
           <td>{borrowRequest.place}</td>
           <td>{borrowRequest.bookname}</td>
           <td>{borrowRequest.requestsendeddate}</td>
           <td style={{color:borrowRequest.request === 'approved' ? 'green' :'red', fontWeight:'900',fontSize:'11px'}}>{borrowRequest.request}</td>

           <td>{borrowRequest.borroweddate}</td>
           <td style={{fontSize:'11px',fontWeight:'900'}}>{borrowRequest.borrowstatus}</td>

           <td style={{fontSize:'11px',fontWeight:'900'}}>{borrowRequest.duedate}</td>
           <td style={{color:borrowRequest.expirestatus === 'nothing' ? 'black' :'red', fontWeight:'900',fontSize:'11px'}}>{borrowRequest.expirestatus}</td>
           <td style={{color:borrowRequest.return === 'approved'  ? 'green' :'blue' || borrowRequest.return === 'pending'  ? 'red' :'blue' , fontWeight:'900',fontSize:'11px' }}>{borrowRequest.return}</td>
           <td>{borrowRequest.renewstatus}</td>

           <td><Button className='borrow-edit-btn' as={Link} to='/updateborrowrequest' onClick={()=>dispatch(sendBorrowDetails(borrowRequest))}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
  </svg></Button></td>
  <td >{
  borrowRequest.borroweddate !== "0000-00-00" && borrowRequest.return === 'approved' && borrowRequest.request === 'approved'  ? (<Button className='check-color' onClick={()=>sendApprove()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
  </svg></Button>):(borrowRequest.borroweddate !== '0000-00-00' && borrowRequest.request === 'approved'&& borrowRequest.return === 'pending' ? (<Button  className='borrow-return-btn' as={Link} to='/approvereturn' onClick={()=>dispatch(returnBook(borrowRequest))} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-square" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
  </svg></Button>):(null) ) }</td>
  <td><Button className='borrow-dlt-btn' onClick={()=>deleteBorrowDetail(borrowRequest._id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
  </svg></Button></td>
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

export default ViewBooksBorrowRequest