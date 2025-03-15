import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { borrowDetails, renewData } from '../Redux/slice';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const ViewBorrowingDetails = () => {

    const allborrowDetails = useSelector((state)=>state.books.allborrowDetails);

    const dispatch = useDispatch()
    
    useEffect(()=>{
        const borrowBooksDetails = async ()=>{
            try {
                const res = await axios.get('http://localhost:2000/viewborrowdetails',{
                    withCredentials:true
                })
            
                if(res.data.success){
                    toast.success(res.data.message);
                    dispatch(borrowDetails(res.data.findPerson))
                }else{
                    toast.error(res.data.message);
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
        borrowBooksDetails();
    },[]);

  return (
    <Container fluid className='padding-top'>
        <Row>
        <Col lg={12} className='p-0'>
            {
              allborrowDetails.length === 0 ? (<div className='no-msg-div'><h1>No Borrowed Details....</h1></div>):(<div className='borrowTable'>
                <Table className='borrow-details-table'  responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>BookName</th>
              <th>Image</th>
              <th>Request Sended Date</th>
              <th>Borrowed Date</th>
              <th>Due Date</th>
              <th>Request Status</th>
              <th>Request Message</th>
              <th>Borrow Status</th>
              <th>Expire Status</th>
              <th>Expire Message</th>
              <th>Message</th>
              <th>Return Status</th>
              <th>RenewStatus</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
               { allborrowDetails.map((detail,index)=>(
                <tr key={detail._id}>
                <td>{index + 1}</td>
                <td>{detail.bookname}</td>
                <td><img src={`http://localhost:2000/${detail.image}`} alt="" /></td>
                <td>{detail.requestsendeddate}</td>
                <td>{detail.borroweddate}</td>
                <td style={{width:'100px'}}>{detail.duedate}</td>
                <td style={{color:detail.request === "approved" ? "green" : "red",fontWeight:'900'}}><p style={{padding:'5px',backgroundColor:detail.request === "approved" ? "#addead" : "#fcc8c8",borderRadius:'20px'}}>{detail.request}</p></td>
                <td style={{width:'150px'}}>{detail.request === "approved" ? "borrow book from library with in 2 days" : (null) || detail.request === "rejected" ? "request rejected you cann't borrow book" : (null) || detail.request === 'pending'? "request will update later" : null}</td>
                <td style={{color:detail.borrowstatus === "borrowed" ? "green" : "orange",fontWeight:'900'}}><p style={{padding:'5px',backgroundColor:detail.borrowstatus === "borrowed" ? "#addead" : "#fce2b4",borderRadius:'20px'}}>{detail.borrowstatus}</p></td>
                <td style={{color:detail.expirestatus === "expired" ? 'red' : 'black' ,fontWeight:'900'}}><p  style={{padding:'5px',backgroundColor:detail.expirestatus === "expired" ? '#fcc8c8' : '#dcd8d8',borderRadius:'20px'}}>{detail.expirestatus}</p></td>
                <td style={{width:'150px'}}>{detail.expirestatus === "expired" ? "your borrowed time limit ended, Bring the book into library with in 2 days , you can renew duedate": detail.borrowstatus === "borrowed" ? "your borrowed date will be expired on duedate,so bring   the book into library before one day of duedate": "" }</td>
                <td style={{width:'150px'}}><p>This details will be deleted  automatically after one day of return</p></td>
                <td style={{color:detail.return === 'approved' ? "green" :'red',fontWeight:'900'}}><p style={{padding:'5px',backgroundColor:detail.return === "approved" ? '#addead' : '#fcc8c8',borderRadius:'20px'}}>{detail.return}</p></td>
                <td><p style={{color:detail.renewstatus === 'pending' ? 'blue' : null || detail.renewstatus === 'approved' ? 'green' : null || detail.renewstatus === 'rejected' ? 'red' : null,backgroundColor:detail.renewstatus === "approved" ? "#addead" : null || detail.renewstatus === "rejected" ? "#fcc8c8":null || detail.renewstatus === "pending" ? "#b5b5f6":null  ,borderRadius:'20px',padding:'5px'}}>{detail.renewstatus}</p></td>
                <td>{detail.expirestatus === 'expired' && detail.return === 'pending' && detail.renewstatus === 'nothing' ? (<Link to='/renewbookborrowingdate'><Button className='renew-btn' onClick={()=>dispatch(renewData(detail))} variant="warning">RenewDate</Button></Link>):(null)}</td>
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

export default ViewBorrowingDetails