import React from 'react'
import * as formik from 'formik';
import * as yup from 'yup';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { sendUpdatedExpireStatus } from '../Redux/slice';

const SendMemberShipExpiredNotification = () => {

    const { Formik } = formik;
    const expiredMembershipDetails = useSelector((state)=>state.books.expiredMembershipDetails);
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const schema = yup.object().shape({
    fullname: yup.string().required("enter the fullname"),
    email: yup.string().required("enter the email"),
    message: yup.string().required("enter the message "),
  });

  const sendNotification = async (data) => {
        try {
            const res = await axios.post(`http://localhost:2000/membershipexpiringnotification/${expiredMembershipDetails._id}`,{
                fullname:data.fullname,
                email:data.email,
                message:data.message
            },{
                withCredentials:true
            })

            if(res.data.success){
                toast.success(res.data.message);
                dispatch(sendUpdatedExpireStatus(expiredMembershipDetails._id))
                navigate('/expiredmemberships')
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
              <div className='membership-Expired-div'>
              <Formik
              validationSchema={schema}
              onSubmit={sendNotification}
              initialValues={{
                fullname: expiredMembershipDetails.fullname,
                email: expiredMembershipDetails.email,
                message:'' ,
              }}
            >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit} className='notificationmembership-form'>
                <Row>
                    <Col lg={12}>
                        <div className='SendNotification-head'>
                          <h3><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">   <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"/> </svg></h3>
                          <h5>Send Notification</h5>
                          </div>
                    </Col>
                </Row>
          <Row className="mb-3">
            <Form.Group as={Col} lg={12} controlId="fullnamegroup">
              <Form.Label>Fullname</Form.Label>
              <Form.Control
                type="text"
                name="fullname"
                value={values.fullname}
                placeholder='enter the name'
                onChange={handleChange}
                isValid={touched.fullname && !errors.fullname}
                isInvalid={errors.fullname}
              />
              <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>{errors.fullname}</Form.Control.Feedback>
            </Form.Group>
            
            </Row>
            <Row>
            <Form.Group as={Col} lg={12} controlId="emailgroup">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={values.email}
                placeholder='enter the email'
                onChange={handleChange}
                isValid={touched.email && !errors.email}
              />
              <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
            </Form.Group>
            </Row>
            <Row>
            <Form.Group as={Col} lg={12} controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control
                type="text"
                name="message"
                value={values.message}
                placeholder='enter the message'
                onChange={handleChange}
                isValid={touched.message && !errors.message}
              />
              <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>{errors.message}</Form.Control.Feedback>
            </Form.Group>
            </Row>
            <div className='membership-notification-btn'>
               <Link to={'/expiredmemberships'}><Button>Cancel</Button></Link><Button type='submit'>send</Button>
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

export default SendMemberShipExpiredNotification