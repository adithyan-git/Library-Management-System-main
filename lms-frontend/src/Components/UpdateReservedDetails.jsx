import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const UpdateReservedDetails = () => {

    const { Formik } = formik;
    const editreserveddetails = useSelector((state)=>state.books.editreserveddetails);
    console.log('...',editreserveddetails);
    
    const navigate = useNavigate();
    
    const schema = yup.object().shape({
        fullname: yup.string().required("enter the fullname"),
        email: yup.string().required("enter the email"),
        request: yup.string().required("enter the status"),
        deadline: yup.string().required("choose the duedte"),
        message: yup.string().required("enter the message"),
      });

      const submitForm = async (data)=>{
        
            try {
                const res =await axios.put(`http://localhost:2000/updatereservedrequest/${editreserveddetails._id}`,{
                    fullname:data.fullname,
                    email:data.email,
                    request:data.request,
                    deadline:data.deadline,
                    message:data.message
                },{
                    withCredentials:true
                })

                if(res.data.success){
                       toast.success(res.data.message);
                       navigate('/viewreserveddetails')
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
            <Col lg={12} >
                <div className='reservedbook-edit-main-div'>
                <Formik
      validationSchema={schema}
      onSubmit={submitForm}
      initialValues={{
        fullname:editreserveddetails.fullname ,
        email:editreserveddetails.email,
        request: editreserveddetails.request,
        deadline: editreserveddetails.deadline,
        message: editreserveddetails.message,
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit} className='reservedbook-edit'>
                    <Row>
                        <Col lg={12}>
                            <div className='reserved-form-head'>
                                <h3>U</h3>
                                <h5>Update Form</h5>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4} lg={4}>
                            <Form.Group controlId='fullnamegroup'>
                                <Form.Label>Fullname</Form.Label>
                                <Form.Control
                                type="text"
                                name="fullname"
                                value={values.fullname}
                                onChange={handleChange}
                                isValid={touched.fullname && !errors.fullname}
                                isInvalid={errors.fullname}
                                />
                                <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type='invalid'>{errors.fullname}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                   
                        <Col  md={4} lg={4}>
                            <Form.Group controlId='emailgroup'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                type="text"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                isValid={touched.email && !errors.email}
                                isInvalid={errors.email}
                                />
                                <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                 
                        <Col  md={4} lg={4}>
                            <Form.Group controlId='statusgroup'>
                                <Form.Label>Status</Form.Label>
                                <Form.Select
                                name='request'
                                onChange={handleChange}
                                value={values.request}
                                >   
                                 <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </Form.Select>
                                <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type='invalid'>{errors.request}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col  md={6} lg={6}>
                            <Form.Group controlId='deadlinegroup'>
                                <Form.Label>Deadline</Form.Label>
                                <Form.Control
                                type="date"
                                name="deadline"
                                value={values.deadline}
                                onChange={handleChange}
                                isValid={touched.deadline && !errors.deadline}
                                isInvalid={errors.deadline}
                                />
                                <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type='invalid'>{errors.deadline}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                 
                        <Col  md={6} lg={6}>
                            <Form.Group controlId='messagegroup'>
                                <Form.Label>Message</Form.Label>
                                <Form.Control
                                type="text"
                                name="message"
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
                    <div className='reserved-submit-btn'>
                        <Link to='/viewreserveddetails'><Button>Cancel</Button></Link><Button type='submit'>Submit</Button>
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

export default UpdateReservedDetails