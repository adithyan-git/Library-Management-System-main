import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const AdminUserEdit = () => {

        const { Formik } = formik;
        const editUserDetails = useSelector((state)=>state.books.editUserDetails);
        const navigate = useNavigate();

         const schema = yup.object().shape({
                fullname:yup.string().required("please enter the fullname"),
                username:yup.string().required("please enter the username"),
                email:yup.string().required("please enter the email"),
                dateofbirth:yup.string().required("please enter the dateofbirth"),
                place:yup.string().required("please enter the place"),
                address:yup.string().required("please enter the address"),
                gender:yup.string().required("please enter the gender"),
                phonenumber:yup.string().required("please enter the phonenumber"),
            })

            const submitEdit = async (data)=>{

                try {
                    const res = await axios.put(`http://localhost:2000/edituserdetails/${editUserDetails._id}`,{
                        fullname:data.fullname,
                        username:data.username,
                        email:data.email,
                        dateofbirth:data.dateofbirth,
                        place:data.place,
                        address:data.address,
                        gender:data.gender,
                        phonenumber:data.phonenumber
                    },{
                        withCredentials:true
                    })
    
                    if(res.data.success){
                        toast.success(res.data.message);
                        navigate('/allusers')
                    }else{
                        toast.error(res.data.message);
                    }
                } catch (error) {
                    toast.error(error.message)
                }                
            }

  return (
    <Container fluid className='padding-top'>
        <Row>
            
            <Col lg={12} >
            <div className='adminuserdit-div'>
            <Formik
      validationSchema={schema}
      onSubmit={submitEdit}
      initialValues={{
        fullname: editUserDetails.fullname,
        username: editUserDetails.username,
        email: editUserDetails.email,
        dateofbirth: editUserDetails.dateofbirth,
        place: editUserDetails.place,
        address: editUserDetails.address,
        gender:editUserDetails.gender,
        phonenumber:editUserDetails.phonenumber,
      }}
    >
             {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit} className='user-admin-edit'>
                    <Row>
                    <Col lg={12}>
                <div className='admin-user-edit-head'> 
                    <h3>U</h3>
                    <h5>Update-Form</h5>
                </div>
            </Col>
                    </Row>
                    <Row>
                        <Col md={6} lg={6}>
                        <Form.Group  className='mb-3' controlId='fullnamegroup'>
                         <Form.Label>Fullname</Form.Label>
                         <Form.Control 
                            type='text' 
                            placeholder='enter the fullname'
                            name='fullname'
                            value={values.fullname}
                            onChange={handleChange}
                            isValid={touched.fullname && !errors.fullname}
                            isInvalid={errors.fullname}
                            />                                      
                        <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>{errors.fullname}</Form.Control.Feedback>
                         </Form.Group>  
                        </Col>
                        <Col md={6} lg={6}>
                        <Form.Group  className='mb-3' controlId='usernamegroup'>
                         <Form.Label>Username</Form.Label>
                         <Form.Control 
                            type='text' 
                            placeholder='enter the username'
                            name='username'
                            value={values.username}
                            onChange={handleChange}
                            isValid={touched.username && !errors.username}
                            isInvalid={errors.username}
                            />                                      
                        <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>{errors.fullname}</Form.Control.Feedback>
                         </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} lg={6}>
                        <Form.Group  className='mb-3' controlId='emailgroup'>
                         <Form.Label>Email</Form.Label>
                         <Form.Control 
                            type='text' 
                            placeholder='enter the email'
                            name='email'
                            value={values.email}
                            onChange={handleChange}
                            isValid={touched.email && !errors.email}
                            isInvalid={errors.email}
                            />                                      
                        <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                         </Form.Group>  
                        </Col>
                        <Col md={6} lg={6}>
                        <Form.Group  className='mb-3' controlId='dateofbirthgroup'>
                         <Form.Label>dateofbirth</Form.Label>
                         <Form.Control 
                            type='date' 
                            name='dateofbirth'
                            value={values.dateofbirth}
                            onChange={handleChange}
                            isValid={touched.dateofbirth && !errors.dateofbirth}
                            isInvalid={errors.dateofbirth}
                            />                                      
                        <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>{errors.dateofbirth}</Form.Control.Feedback>
                         </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} lg={6}>
                        <Form.Group  className='mb-3' controlId='placegroup'>
                         <Form.Label>Place</Form.Label>
                         <Form.Control 
                            type='text' 
                            placeholder='enter the place'
                            name='place'
                            value={values.place}
                            onChange={handleChange}
                            isValid={touched.place && !errors.place}
                            isInvalid={errors.place}
                            />                                      
                        <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>{errors.place}</Form.Control.Feedback>
                         </Form.Group>  
                        </Col>
                        <Col md={6} lg={6}>
                        <Form.Group  className='mb-3' controlId='addressgroup'>
                         <Form.Label>Address</Form.Label>
                         <Form.Control 
                            type='text' 
                            placeholder='enter the address'
                            name='address'
                            value={values.address}
                            onChange={handleChange}
                            isValid={touched.address && !errors.address}
                            isInvalid={errors.address}
                            />                                      
                        <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>{errors.address}</Form.Control.Feedback>
                         </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} lg={6}>
                          <Form.Group controlId='radiogroup'>
                            <Form.Label>Select your gender</Form.Label>
                                <div  className="mb-3">
                                  <Form.Check
                                    inline
                                    label="male"
                                    name="gender"
                                    type="radio"
                                    value='male'
                                    onChange={handleChange}
                                  />
                                  <Form.Check
                                    inline
                                    label="female"
                                    name="gender"
                                    type="radio"
                                    value='female'
                                    onChange={handleChange}
                                  /> 
                                </div>
                            </Form.Group>  
                        </Col>
                        <Col md={6} lg={6}>
                        <Form.Group  className='mb-3' controlId='phonenumbergroup'>
                         <Form.Label>Phone Number</Form.Label>
                         <Form.Control 
                            type='text' 
                            placeholder='enter the phonenumber'
                            name='phonenumber'
                            value={values.phonenumber}
                            onChange={handleChange}
                            isValid={touched.phonenumber && !errors.phonenumber}
                            isInvalid={errors.phonenumber}
                            />                                      
                        <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>{errors.phonenumber}</Form.Control.Feedback>
                         </Form.Group>
                        </Col>
                    </Row>
                  
                    <div className='admin-user-edit-btn'>
                        <Link to='/allusers'><Button>Cancel</Button></Link><Button type='submit'>Submit</Button>
                    </div>
                </Form>
             )}
             </Formik>
            </div>
            </Col>
        </Row>
    </Container>
  )
}

export default AdminUserEdit