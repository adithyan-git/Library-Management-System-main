import React, { useState } from 'react'
import {  Container,Row, Col,Form, FormControl,Button } from 'react-bootstrap'
import * as formik from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { sendLoginDetails } from '../Redux/slice'

const Banner = () => {

  const { Formik } = formik;
  const dispatch = useDispatch()
  const loginDetails = useSelector((state)=>state.books.loginDetails);
  
  const userSchema = yup.object().shape({
    email:yup.string().required("please enter your email"),
    password:yup.string().required("please enter your password")
  })

 
const userLogin = async (data) => {
  try {
    const res = await axios.post("http://localhost:2000/userlogin",{
      email:data.email,
      password:data.password
  },{
    withCredentials:true
  })

  if(res.data.success){
    toast.success(res.data.message);
    dispatch(sendLoginDetails(res.data.loggedinPerson))
  }else{
    toast.error(res.data.message);
  }
  } catch (error) {
    toast.error(error.message);
  }
  
}

const [showForm,setShowForm] = useState(false);

const showLoginForm = () =>{
    setShowForm(true)
}
const closeLoginForm = () =>{
  setShowForm(false)
}

  return (
    <Container fluid className='padding-top'>
        <Row>
            <Col lg={12} className='p-0'>
                <div className='banner-img-div'>
                    <img src="Banner-Image/bannerimage.webp" alt="" className='banner-img'/>
                    <div className='banner-qoute-div'>
                      {
                      loginDetails.role === 'user' ? (null):loginDetails.role === ' admin' ? null : loginDetails.role === 'librarian' ? null : <Button onClick={showForm ? (()=>closeLoginForm()):(()=>showLoginForm())}>Sign-In</Button>
                       }
                    </div>
                    {
                    showForm ? (loginDetails.role === 'admin' ? null : loginDetails.role === 'user' ? null : loginDetails.role === 'librarian' ? null :  <div className='form-div'>
                      <div className='login-sign-in-div'>
                      <h4>Sign-In</h4>
                      </div>
                     <div className='login-icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shield-lock-fill" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.8 11.8 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7 7 0 0 0 1.048-.625 11.8 11.8 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 63 63 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5"/>
                        </svg>
                      </div>      
                         <Formik
                            validationSchema={userSchema}
                            onSubmit={userLogin}
                            initialValues={{
                              email: '',
                              password: '',
                            }}
                          >
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                          <Form noValidate onSubmit={handleSubmit}>
                     
                          <Row className='mb-3'>
                            <Form.Group  controlId='emailGroup'>
                              <Form.Control 
                              type='email' 
                              placeholder='email'
                              name='email'
                              value={values.email}
                              onChange={handleChange}
                              isInvalid={errors.email}
                              isValid={!errors.email && touched.email}
                              />
                              <FormControl.Feedback type='valid'>good</FormControl.Feedback>
                              <FormControl.Feedback type='invalid'>{errors.email}</FormControl.Feedback>
                            </Form.Group>
                          </Row>
                          <Row className='mb-3'>
                            <Form.Group mb={3} controlId='passwordGroup'>
                              <Form.Control 
                              type='password' 
                              placeholder='password'
                              name='password'
                              value={values.password}
                              onChange={handleChange}
                              isValid={touched.password && !errors.password}
                              isInvalid={errors.password}
                              />
                               <FormControl.Feedback type='valid'>good</FormControl.Feedback>
                               <FormControl.Feedback type='invalid' >{errors.password}</FormControl.Feedback>
                            </Form.Group>
                          </Row>
                              <div className='signin-btn'><Button type='submit'>Sign In</Button></div>
                          </Form>
                        )}
                        </Formik>
                       
                      
                     </div>):(null)
                  }
                </div>
                  
            </Col>
        </Row>

    </Container>
  )
}

export default Banner