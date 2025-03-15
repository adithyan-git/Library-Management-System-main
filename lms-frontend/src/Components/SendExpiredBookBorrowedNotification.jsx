import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { updatedBorrowNotification } from '../Redux/slice';

const SendExpiredBookBorrowedNotification = () => {

    const { Formik } = formik;
    const sendExpiredBookDetails = useSelector((state)=>state.books.sendExpiredBookDetails);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
  const schema = yup.object().shape({
    fullname: yup.string().required('enter the fullname '),
    email: yup.string().required('enter the email'),
    message: yup.string().required('enter the message'),
    duedate: yup.string().required('select the duedate'),
    bookname: yup.string().required('enter the bookname'),
    borroweddate: yup.string().required('select the borrowed date'),
  });

  const submitForm = async (data)=>{
    try {
        const res = await axios.post(`http://localhost:2000/returnexpiringnotification/${sendExpiredBookDetails._id}`,{
            fullname:data.fullname,
            email:data.email,
            message:data.message,
            duedate:data.duedate,
            bookname:data.bookname,
            borroweddate:data.borroweddate,

        },{
            withCredentials:true
        })

        if(res.data.success){
            toast.success(res.data.message);
            dispatch(updatedBorrowNotification(sendExpiredBookDetails._id))
            navigate('/viewborrowbooksrequest')
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
            <Col lg={12}>

            <div className='sendBookExpired-div'>
            <Formik
      validationSchema={schema}
      onSubmit={submitForm}
      initialValues={{
        fullname: sendExpiredBookDetails.fullname,
        email: sendExpiredBookDetails.email,
        message: '',
        duedate: sendExpiredBookDetails.duedate,
        bookname:sendExpiredBookDetails.bookname,
        borroweddate:sendExpiredBookDetails.borroweddate
      }}
    >
    
        {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit} className='expired-book-form'>
                                <Row>
                                    <Col lg={12}>
                                      <div className='Send-Notification-head'>
                                        <h3>U</h3>
                                        <h4>
                                            Send-Notification
                                        </h4>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={4}>
                                    <Form.Group  className='mb-3' controlId='fullnamegroup'>
                                    <Form.Label>Fullname</Form.Label>
                                    <Form.Control 
                                    type='text' 
                                    placeholder='enter the fullname '
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
                                    <Col lg={4}>
                                    <Form.Group controlId='emailgroup'>
                                    <Form.Label>Reciever's Email</Form.Label>
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
                                    <Col lg={4}>
                                    <Form.Group controlId='messagegroup'>
                                    <Form.Label>message</Form.Label>
                                    <Form.Control 
                                    type='text' 
                                    placeholder='enter the message'
                                    name='message'
                                    value={values.message}
                                    onChange={handleChange}
                                    isValid={touched.message && !errors.message}
                                    isInvalid={errors.message}
                                    />
                                     <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                     <Form.Control.Feedback type='invalid'>{errors.message}</Form.Control.Feedback>
                                  </Form.Group>
                                    </Col>
                                 </Row>
                                 <Row>
                                    <Col lg={4}>
                                    <Form.Group  className='mb-3' controlId='duedategroup'>
                                    <Form.Label>Duedate</Form.Label>
                                    <Form.Control 
                                    type='Date' 
                                    name='duedate'
                                    value={values.duedate}
                                    onChange={handleChange}
                                    isValid={touched.duedate && !errors.duedate}
                                    isInvalid={errors.duedate}
                                    />                                      
                                    <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type='invalid'>{errors.duedate}</Form.Control.Feedback>
                                  </Form.Group>
                                    </Col>
                                    <Col lg={4}>
                                    <Form.Group controlId='booknamegroup'>
                                    <Form.Label>Bookname</Form.Label>
                                    <Form.Control 
                                    type='text' 
                                    placeholder='enter the bookname'
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
                                    <Col lg={4}>
                                    <Form.Group controlId='borroweddategroup'>
                                    <Form.Label>Borrowed Date</Form.Label>
                                    <Form.Control 
                                    type='date' 
                                    name='borroweddate'
                                    value={values.borroweddate}
                                    onChange={handleChange}
                                    isValid={touched.borroweddate && !errors.borroweddate}
                                    isInvalid={errors.borroweddate}
                                    />
                                     <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                     <Form.Control.Feedback type='invalid'>{errors.borroweddate}</Form.Control.Feedback>
                                  </Form.Group>
                                    </Col>
                                 </Row>
                                 
                               
                                 
                                 <div className='expired-notification-btn'>
                                    <Link to='/bookborrowedexpiredusers'><Button>Cancel</Button></Link><Button type='submit'>Submit</Button>
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

export default SendExpiredBookBorrowedNotification