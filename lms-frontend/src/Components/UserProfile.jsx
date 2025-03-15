import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import {logOutUser, sendUserProfileDetails } from '../Redux/slice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const UserProfile = () => {

    const userProfileDetails = useSelector((state)=>state.books.userProfileDetails)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
     const userLogOut = async () => {
    
      try {
        const res = await axios.delete("http://localhost:2000/logoutuser",{
          withCredentials:true
        })
        if(res.data.success){
          toast.success(res.data.message);
          dispatch(logOutUser(false));
          navigate('/')
    
        }else{
          toast.error(res.data.message)
        }
      } catch (error) {
        toast.error(error.message);
      }
     }


       useEffect(()=>{
         const viewUserProfile = async ()=>{
     
          try {
           const res = await axios.get('http://localhost:2000/viewuserprofile',{
           withCredentials:true
           })
           
           if(res.data.success){
             toast.success(res.data.message);
             dispatch(sendUserProfileDetails(res.data.userProfile));
           }else{
             toast.error(res.data.message)
           }
          } catch (error) {
           toast.error(error.message)
          }
         }
         viewUserProfile()
        },[dispatch])

  return (
   <Container fluid className='padding-top'>
        <Row>
            <Col lg={12} className='p-0'>
                <div className='profile-main-div'>
                    <div className='profile-details-main-div'>
                        <div className='image-bgrnd-clr'>
                            <div className='edit-logout'>
                                <Link to={'/edituserprofile'}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                    </svg>
                                </span>
                                </Link>
                                <span onClick={()=>userLogOut()} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-power" viewBox="0 0 16 16">
                                <path d="M7.5 1v7h1V1z"/>
                                <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812"/>
                                </svg>
                                </span>
                            </div>
                        </div>
                        <div className='profile-photo'>
                            <img src={`http://localhost:2000/${userProfileDetails.image}`} alt="" />
                            <div className='profile-img-edit'>
                                    <Link to={'/edituserprofileimage'}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                            </svg>
                                    </Link>
                            </div>
                        </div>
                        <div className='name-username'>
                            <h5>{userProfileDetails.fullname}</h5>
                        </div>
                        <div className='sub-details'>
                        <div className='field-names'>
                            <h5>Email</h5>
                            <h5>Gender</h5>
                            <h5>Address</h5>
                            <h5>Place</h5>
                            <h5>Phonenumber</h5>
                            <h5>Date Of Birth</h5>
                        </div>
                        <div className='field-names-values'>
                            <p>{userProfileDetails.email}</p>
                            <p>{userProfileDetails.gender}</p>
                            <p>{userProfileDetails.address}</p>
                            <p>{userProfileDetails.place}</p>
                            <p>{userProfileDetails.phonenumber}</p>
                            <p>{userProfileDetails.dateofbirth}</p>
                        </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
   </Container>
  )
}

export default UserProfile