import axios from 'axios'
import React, { useEffect } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { deleteExpiredMemberShip, memberShipExpired, sendMemberDetails, sendMemberShipRequest } from '../Redux/slice'
import { Link } from 'react-router-dom'

const ViiewMemberShipRequest = () => {
    const memberShipRequests = useSelector((state)=>state.books.memberShipRequests);
    const dispatch = useDispatch();

    useEffect(()=>{
        const displayMemberShipRequest = async () => {

            const res = await axios.get('http://localhost:2000/viewmembership',{
              withCredentials:true
            })
                if(res.data.success){
                    toast.success(res.data.message);
                    dispatch(sendMemberShipRequest(res.data.allMemberShipRequest))
                }else{
                    toast.error(res.data.message);
                }
        }
    
        displayMemberShipRequest();
    },[dispatch])


    const expiredMembers = async () =>{
    
      try {
       const res = await axios.get('http://localhost:2000/membershipexpiredmembers',{
          withCredentials:true
       })

       if(res.data.success){
           toast.success(res.data.message);
           dispatch(memberShipExpired(res.data.membershipExpiredUsers));
       }else{
           toast.error(res.data.message);
       }
      } catch (error) {
          toast.error(error.message)
      }

   }

    const deleteMemberShip = async (membershipId) => {
      
        try {
          const res = await axios.delete(`http://localhost:2000/deleteexpiredmembership/${membershipId}`,{
            withCredentials:true
          });
          if(res.data.success){
            toast.success(res.data.message);
            dispatch(deleteExpiredMemberShip(membershipId));
            expiredMembers()
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
            memberShipRequests.length === 0 ? (<div className='no-msg-div'><h1>No MemberShip Requests.....</h1></div>):( <div className='member-div-table'>
              <Table  className='membership-table' responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>fullname</th>
            <th>email</th>
            <th>Username</th>
            <th>Phone <br />number</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Date</th>
            <th>Due Date</th>
            <th>Date-Of-Birth</th>
            <th>Membership Type</th>
            <th>Register <br />number</th>
            <th>Request's Status</th>
            <th>ExpireStatus</th>
            <th>Place</th>
            <th>Proof</th>

            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {memberShipRequests.map((request,index)=>(
               <tr key={request._id}>
               <td>{index + 1}</td>
               <td><img src={`http://localhost:2000/${request.file}`} alt="" /></td>
               <td>{request.fullname}</td>
               <td>{request.email}</td>
               <td>{request.username}</td>
               <td>{request.phonenumber}</td>
               <td>{request.address}</td>
               <td>{request.gender}</td>
               <td>{request.date}</td>
               <td>{request.duedate}</td>
               <td>{request.dateofbirth}</td>
               <td>{request.membershiptype}</td>
               <td>{request.registrationnumber}</td>
               <td style={{color:request.status === 'pending' ? 'red' : 'green',fontWeight:'bold'}}>{request.status}</td>
               <td style={{color:request.expiredstatus === 'expired' ? 'red' : 'darkblue', fontWeight:'bold'}}>{request.expiredstatus}</td>
               <td>{request.place}</td>
               <td><img src={`http://localhost:2000/${request.imageproof}`} alt="" /></td>

               <td><Button className='member-delete' onClick={()=>deleteMemberShip(request._id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
  </svg></Button></td>
               <td><Link to={'/updatemembership'} onClick={()=>dispatch(sendMemberDetails(request))}>
               <Button className='member-edit'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
  </svg></Button>
               </Link></td>
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

export default ViiewMemberShipRequest
