import axios from 'axios';
import React, { useEffect } from 'react'
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteRegisterdUser, sendAllUsers, sendEdituserValue } from '../Redux/slice';

const ViewAllUsers = () => {

  const allUsers = useSelector((state)=>state.books.allUsers);
  const dispatch = useDispatch();


  useEffect(()=>{
    const allUsers = async ()=>{
      try {
       const res = await axios.get("http://localhost:2000/viewallusers",{
         withCredentials:true
       })
   
       if(res.data.success){
         toast.success(res.data.message);
          dispatch(sendAllUsers(res.data.allUsers));
          
        }else{
         toast.error(res.data.message);
       }
      } catch (error) {
         toast.error(error.message);
      }
    }
    allUsers();
    },[dispatch])
  const deleteUser = async (userId) => {
    try {
      const res = await axios.delete(`http://localhost:2000/deleteperson/${userId}`,{
        withCredentials:true
      });

    if(res.data.success){
      toast.success(res.data.message);
      dispatch(deleteRegisterdUser(userId))
    }else{
      toast.error(res.data.message);
    }
    } catch (error) {
      toast.error(error.message);
    }
  }
  
  return (
    <Container fluid className='padding-top'>
     {
      allUsers.length === 0 ? (<div className='no-msg-div'><h1>No Registerd users .....</h1></div>):( <Row>
        {
         allUsers.map((user)=>(
           <Col sm={12} md={6} lg={3} key={user._id}>
 
             <div className='user-card-div'>
             <Card style={{ width: '18rem' }} className='user-card'>
                 <Card.Img variant="top" src={`http://localhost:2000/${user.profileimage}`} />
                 <Link to='/adminedituserprofileimage' onClick={()=>dispatch(sendEdituserValue(user))}>
                 <span className='user-edit-span' >
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                   <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                   <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                 </svg>
                 </span>
                 </Link>
                 <Card.Body>
                   <Card.Title>{user.fullname}</Card.Title>
                   <ListGroup variant="flush">
                     <ListGroup.Item><span>Username</span> <p>{user.username}</p></ListGroup.Item>
                     <ListGroup.Item><span>D-O-B</span> <p>{user.dateofbirth}</p></ListGroup.Item>
                     <ListGroup.Item><span>Email</span> <p>{user.email}</p></ListGroup.Item>
                     <ListGroup.Item><span>Address</span> <p>{user.address}</p></ListGroup.Item>
                     <ListGroup.Item><span>Gender</span> <p>{user.gender}</p></ListGroup.Item>
                     <ListGroup.Item><span>Ph.No</span> <p>{user.phonenumber}</p></ListGroup.Item>
                     <ListGroup.Item><span>Place</span> <p>{user.place}</p></ListGroup.Item>
                     <ListGroup.Item><span>Status</span> <p style={{color:user.status === 'active'? 'green':'red',fontWeight:900,fontSize:'10px',letterSpacing:'1px'}}>{user.status}</p></ListGroup.Item>

                   </ListGroup>
                   <div className='user-card-btn'>
                     <Link to="/adminedituser" onClick={()=>dispatch(sendEdituserValue(user))}> 
                          <Button variant="success">Edit</Button>
                     </Link>
                   <Button variant="danger" onClick={()=>deleteUser(user._id)}>Delete</Button>
                   </div>
                 </Card.Body>
               </Card>
             </div>
           
         </Col>
         ))
        }
       </Row>)
     }
    </Container>
  )
}

export default ViewAllUsers