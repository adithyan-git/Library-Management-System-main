import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { feedbackSend } from '../Redux/slice';

const SendBookFeedback = () => {

    const { Formik } = formik;
    const   bookDetails  = useSelector((state)=>state.books.bookDetails);
    const loginDetails = useSelector((state)=>state.books.loginDetails);
    const userProfileDetails = useSelector((state)=>state.books.userProfileDetails);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const schema = yup.object().shape({
        fullname: yup.string().required(),
        address: yup.string().required(),
        email: yup.string().required(),
        feedback: yup.string().required(),
        date: yup.string().required(),
        bookname:yup.string().required(),
    });

    const submitForm = async (data)=>{
      const feedbackDetails ={

        fullname: data.fullname,
        address:data.address,
        email: data.email,
        feedback:data.feedback,
        date: data.date,
        bookname:data.bookname
    }

   try {
     const res = await axios.post('http://localhost:2000/sendbookfeedback',feedbackDetails,{
        withCredentials:true
    })

    if(res.data.message){
        toast.success(res.data.message);
        dispatch(feedbackSend(data))
        navigate('/')
    }else{
        toast.error(res.data.message)
    }
   } catch (error) {
        toast.error(error.message);
   }

    }

  return (
    <Container fluid className='padding-top'>
        <Row>
            <Col lg={12} className='p-0'>
            
           <div className='bookfeedback-div'>
           <div className='feedback-main-head'>
              <h1>How Are You Feeling ?</h1>
              <p>Your feedback is the compass that guides our improvements.</p>
            </div>
           <Formik
      validationSchema={schema}
      onSubmit={submitForm}
      initialValues={{
        bookname:bookDetails.title,
        fullname: (loginDetails.fullname || userProfileDetails.fullname),
        address: (loginDetails.address || userProfileDetails.address),
        email: (loginDetails.email || userProfileDetails.email) ,
        feedback:'',
        date: '',
        
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (

                <Form  noValidate onSubmit={handleSubmit} className='bookfeedback-form'>
                     <Row>
                                    <Col lg={12}>
                                      <div className='bookfeedback-form-head'>
                                        <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-square-text-fill" viewBox="0 0 16 16">
                                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z"/>
                                          </svg></span>
                                        <h4>
                                            send-Book-Feedback
                                        </h4>
                                        </div>
                                    </Col>
                                </Row>
                                 <Row>
                                 <Col md={4} lg={4}>
                                    <Form.Group  className='mb-3' controlId='bookname'>
                                    <Form.Label>Bookname</Form.Label>
                                    <Form.Control 
                                    type='text' 
                                    placeholder='bookname.....'
                                    name='bookname'
                                    value={values.bookname}
                                    onChange={handleChange}
                                    isValid={touched.bookname && !errors.bookname}
                                    isInvalid={errors.bookname}
                                    />                                      
                                    <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type='invalid'>{errors.bookname}</Form.Control.Feedback>
                                  </Form.Group>
                                    </Col>
                                    <Col md={4} lg={4}>
                                    <Form.Group  className='mb-3' controlId='fullname'>
                                    <Form.Label>Fullname</Form.Label>
                                    <Form.Control 
                                    type='text' 
                                    placeholder='fullname.....'
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
                                    <Col md={4} lg={4}>
                                    <Form.Group controlId='email'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control 
                                    type='text' 
                                    placeholder='email.....'
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
                                    <Col md={4} lg={4}>
                                    <Form.Group controlId='address'>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control 
                                    type='text' 
                                    placeholder='address....'
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
                                    <Col md={4} lg={4}>
                                    <Form.Group controlId='feedback'>
                                    <Form.Label>Feedback</Form.Label>
                                    <Form.Control 
                                    type='text' 
                                    placeholder='feedback....'
                                    name='feedback'
                                    value={values.feedback}
                                    onChange={handleChange}
                                    isValid={touched.feedback && !errors.feedback}
                                    isInvalid={errors.feedback}
                                    />
                                     <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                     <Form.Control.Feedback type='invalid'>{errors.feedback}</Form.Control.Feedback>
                                  </Form.Group>
                                    </Col>
                                    <Col md={4} lg={4}>
                                    <Form.Group controlId='date'>
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control 
                                    type='date' 
                                    name='date'
                                    value={values.date}
                                    onChange={handleChange}
                                    isValid={touched.date && !errors.date}
                                    isInvalid={errors.date}
                                    />
                                     <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                     <Form.Control.Feedback type='invalid'>{errors.date}</Form.Control.Feedback>
                                  </Form.Group>
                                    </Col>
                                 </Row>
                                 <div className='sendfeedback-btn'>
                                    <Link to={'/bookdetails'}><Button >Cancel</Button></Link><Button type='submit'>Confirm</Button>
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

export default SendBookFeedback