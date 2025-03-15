import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { sendExpiredmembership } from '../Redux/slice'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const ExpiredMemberShips = () => {
    
    const dispatch = useDispatch();
    const expiredMemberships = useSelector((state)=>state.books.expiredMemberships);    

    const ShowTost=()=>{
        toast('notification already  sended')
    }


  return (
    <Container fluid className='padding-top'>
        <Row>
            <Col lg={12} className='p-0'> 
               {
                expiredMemberships.length === 0 ? (<div className='no-msg-div'><h1>No Expired MemberShips.....</h1></div>):(<div className='memberShipExpired-table-div'>
                    <Table  className='memberShipExpired-table'>
                     <thead>
                         <tr>
                         <th>No</th>
                         <th>Fullname</th>
                         <th>Image</th>
                         <th>Email</th>
                         <th>Address</th>
                         <th>Phonenumber</th>
                         <th>MemberShipType</th>
                         <th>SendNotification</th>
                         </tr>
                     </thead>
                     <tbody>
                         
                         {
                             expiredMemberships.map((expiredMembership,index)=>(
                                 <tr key={expiredMembership._id}>
                                 <td>{index + 1 }</td>
                                 <td>{expiredMembership.fullname}</td>
                                 <td><img src={`http://localhost:2000/${expiredMembership.file}`} alt="" /></td>
                                 <td>{expiredMembership.email}</td>
                                 <td>{expiredMembership.address}</td>
                                 <td>{expiredMembership.phonenumber}</td>
                                 <td>{expiredMembership.membershiptype}</td>
                                 <td>{expiredMembership.messagestatus === 'nothing' ? (<Button className='membershipNotification-btn' as={Link} to='/sendnotificationofexpiredmemberships' onClick={()=>dispatch(sendExpiredmembership(expiredMembership))}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                                             <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"/>
                                             </svg></Button>):(<Button className='membershipNotification-btn' onClick={()=>ShowTost()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell-slash-fill" viewBox="0 0 16 16">
  <path d="M5.164 14H15c-1.5-1-2-5.902-2-7q0-.396-.06-.776zm6.288-10.617A5 5 0 0 0 8.995 2.1a1 1 0 1 0-1.99 0A5 5 0 0 0 3 7c0 .898-.335 4.342-1.278 6.113zM10 15a2 2 0 1 1-4 0zm-9.375.625a.53.53 0 0 0 .75.75l14.75-14.75a.53.53 0 0 0-.75-.75z"/>
</svg></Button>) }</td>
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

export default ExpiredMemberShips