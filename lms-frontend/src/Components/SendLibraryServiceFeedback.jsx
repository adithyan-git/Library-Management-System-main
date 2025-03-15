import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {  useSelector } from 'react-redux';

const SendLibraryServiceFeedback = () => {

    const { Formik } = formik;
    const navigate = useNavigate();
    const userMembership = useSelector((state)=>state.books.userMembership);

    const schema = yup.object().shape({
        fullname: yup.string().required(),
        email: yup.string().required(),
        registernumber: yup.string().required(),
        message: yup.string().required(),
      });

      const submitForm = async (data)=>{

        try {
            const res = await axios.post('http://localhost:2000/sendlibraryservicefeedback',{
                fullname:data.fullname,
                email:data.email,
                registernumber:data.registernumber,
                message:data.message
            },{
                withCredentails:true
            })

            if(res.data.success){
                toast.success(res.data.message);
                // dispatch(sendServiceFeedback(data))
                navigate('/')
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
                <div className='service-head'>
                  <h1>Do You Have Any FeedBack <br /> About Our Services...?</h1>
                </div>
                <div className='libraryfeedback-div'>
                <Formik
      validationSchema={schema}
      onSubmit={submitForm}
      initialValues={{
        fullname: userMembership.fullname,
        email: userMembership.email,
        registernumber: userMembership.registernumber,
        message: '',
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit} className='libraryfeedback-form'>
                         <Row>  
                                    <Col lg={12}>
                                      <div className='libraryfeedback-head'>
                                        <h6>F</h6>
                                       <h4>
                                        Feedback-Form
                                        </h4>
                                      </div>
                                    </Col>
                                </Row>                      
                                  <Row>
                                      <Col md={6} lg={6}>
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
                                      <Col md={6} lg={6}>
                                      <Form.Group controlId='email'>
                                      <Form.Label>Email</Form.Label>
                                      <Form.Control 
                                      type='text' 
                                      placeholder='email....'
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
                                      <Form.Group controlId='registernumber'>
                                      <Form.Label>Registernumber</Form.Label>
                                      <Form.Control 
                                      type='text' 
                                      placeholder='registernumber....'
                                      name='registernumber'
                                      value={values.registernumber}
                                      onChange={handleChange}
                                      isValid={touched.registernumber && !errors.registernumber}
                                      isInvalid={errors.registernumber}
                                      />
                                      <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                      <Form.Control.Feedback type='invalid'>{errors.registernumber}</Form.Control.Feedback>
                                    </Form.Group>
                                      </Col>
                                      <Col md={6} lg={6}>
                                      <Form.Group controlId='message'>
                                      <Form.Label>Message</Form.Label>
                                      <Form.Control 
                                      type='text' 
                                      placeholder='message....'
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
                                  <div className='libraryfeedback-btn'>
                                    <Link to={'/'}><Button>Cancel</Button></Link> <Button type='submit'>Submit</Button>
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

export default SendLibraryServiceFeedback