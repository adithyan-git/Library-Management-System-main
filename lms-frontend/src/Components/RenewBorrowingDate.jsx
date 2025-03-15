import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const RenewBorrowingDate = () => {

    const { Formik } = formik;
    const userRenewdata = useSelector((state)=>state.books.userRenewdata);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        fullname: yup.string().required(),
        email: yup.string().required(),
        bookname: yup.string().required(),
        borrowdate: yup.string().required(),
        duedate: yup.string().required(),
        extendingdate: yup.string().required(),
        registernumber:yup.string().required(),
    });

        const submitForm = async (data)=>{
            try {
                const res = await axios.post('http://localhost:2000/renewborrowingdate',{
                    fullname: data.fullname,
                    email:data.email,
                    bookname:data.bookname,
                    borrowdate:data.borrowdate,
                    duedate: data.duedate,
                    extendingdate:data.extendingdate,
                    registernumber:data.registernumber,
                },{
                    withCredentials:true
                })

                if(res.data.success){
                    toast.success(res.data.message);
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
            <Col lg={6} className='mx-auto my-5'>
                    <div className='renew-form'>
                    <Formik
      validationSchema={schema}
      onSubmit={submitForm}
      initialValues={{
        fullname: userRenewdata.fullname,
        email: userRenewdata.email,
        bookname: userRenewdata.bookname,
        borrowdate: userRenewdata.borroweddate,
        duedate:userRenewdata.duedate,
        extendingdate:'',
        registernumber: userRenewdata.registernumber,
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Row>
                                  <Col lg={12} >
                                    <div  className='renew-head'>
                                        <h5>Renew-Form</h5>
                                    </div>
                                  </Col>
                                </Row>
                                <Row>
                                 <Col lg={4}>
                                 <Form.Group controlId='fullnamegroup'>
                                    <Form.Label>Fullname</Form.Label>
                                    <Form.Control 
                                    type='text'
                                    name='fullname'
                                    placeholder='enter your name'
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
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control 
                                    type='text'
                                    name='email'
                                    placeholder='enter your email'
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
                                 <Form.Group controlId='bookName'>
                                    <Form.Label>BookName</Form.Label>
                                    <Form.Control 
                                    type='text'
                                    name='bookname'
                                    placeholder='bookName.....'
                                    value={values.bookname}
                                    onChange={handleChange}
                                    isValid={touched.bookname && !errors.bookname}
                                    isInvalid={errors.bookname}
                                    />
                                    <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type='invalid'>{errors.bookname}</Form.Control.Feedback>
                                  </Form.Group>
                                 </Col>
                                </Row>
                                <Row>
                                 <Col lg={6}>
                                 <Form.Group controlId='borrowDate'>
                                    <Form.Label>BorrowDate</Form.Label>
                                    <Form.Control 
                                    type='date'
                                    name='borrowdate'
                                    placeholder='borrowDate.....'
                                    value={values.borrowdate}
                                    onChange={handleChange}
                                    isValid={touched.borrowdate && !errors.borrowdate}
                                    isInvalid={errors.borrowdate}
                                    />
                                    <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type='invalid'>{errors.borrowdate}</Form.Control.Feedback>
                                  </Form.Group>
                                 </Col>
                                 <Col lg={6}>
                                 <Form.Group controlId='dueDate'>
                                    <Form.Label>DueDate</Form.Label>
                                    <Form.Control 
                                    type='date'
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
                                 <Col lg={6}>
                                 <Form.Group controlId='extendingDate'>
                                    <Form.Label>ExtendingDate</Form.Label>
                                    <Form.Control 
                                    type='date'
                                    name='extendingdate'
                                    value={values.extendingdate}
                                    onChange={handleChange}
                                    isValid={touched.extendingdate && !errors.extendingdate}
                                    isInvalid={errors.extendingdate}
                                    />
                                    <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type='invalid'>{errors.extendingdate}</Form.Control.Feedback>
                                  </Form.Group>
                                 </Col>
                                 <Col lg={6}>
                                 <Form.Group controlId='registernumber'>
                                    <Form.Label>RegisterNumber</Form.Label>
                                    <Form.Control 
                                    type='text'
                                    name='registernumber'
                                    placeholder='registernumber'
                                    value={values.registernumber}
                                    onChange={handleChange}
                                    isValid={touched.registernumber && !errors.registernumber}
                                    isInvalid={errors.registernumber}
                                    />
                                    <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type='invalid'>{errors.registernumber}</Form.Control.Feedback>
                                  </Form.Group>
                                 </Col>
                                </Row>
                                <div className='renewform-btn'>
                                   <Link to='/'> <Button >Cancel</Button></Link><Button type='submit'>Confirm</Button>
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

export default RenewBorrowingDate