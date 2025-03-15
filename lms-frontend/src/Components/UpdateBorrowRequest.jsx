import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { borrowRequestUpdation, sendExpiredBorrowedBook } from '../Redux/slice';
const UpdateBorrowRequest = () => {

    const { Formik } = formik;
    const borrowRequestDetails = useSelector((state)=>state.books.borrowRequestDetails);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const bookReturnExpired = async () =>{
        try {
            const res = await axios.get('http://localhost:2000/automaticbookreturnexpiringnotification')

            if(res.data.success){
                toast.success(res.data.message);
                dispatch(sendExpiredBorrowedBook(res.data.borrowedExpiredUsers))
            }else{
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    } 
    
    const schema = yup.object().shape({
        fullname: yup.string().required("enter your fullname"),
        email: yup.string().required("enter your email"),
        request: yup.string().required("enter your request"),
        borroweddate: yup.string().required("choose the date"),
        duedate: yup.string().required("choose the duedate"),
        borrowstatus: yup.string().required("enter the borrowstatus"),

      });

      const submitForm = async (data) =>{
        const details={
            id:borrowRequestDetails._id,
            request:data.request,
            borroweddate:data.borroweddate,
            duedate:data.duedate,
            borrowstatus:data.borrowstatus
        }
            try {
                const res = await axios.put(`http://localhost:2000/updateborrowingrequest/${borrowRequestDetails._id}`,{
                    fullname:data.fullname,
                    email:data.email,
                    request:data.request,
                    borroweddate:data.borroweddate,
                    duedate:data.duedate,
                    borrowstatus:data.borrowstatus
                },{
                    withCredentials:true
                })
    
                 if(res.data.success){
                     toast.success(res.data.message);
                     bookReturnExpired()
                     dispatch(borrowRequestUpdation(details))
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
            <Col lg={12} className='p-0'>
                 <div className='updaterequest-form'>
                 <Formik
      validationSchema={schema}
      onSubmit={submitForm}
      initialValues={{
        fullname: borrowRequestDetails.fullname,
        email: borrowRequestDetails.email,
        request: borrowRequestDetails.request,
        borroweddate:borrowRequestDetails.borroweddate,
        duedate: borrowRequestDetails.duedate,
        borrowstatus:borrowRequestDetails.borrowstatus
      }}
    >           

    {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit} className='borrow-edit-form'>
                    <Row>
                        <Col lg={12}>
                            <div className='borrow-div'>
                                <h3>U</h3>
                                <h5>Update-Form</h5>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4} lg={4}>
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
                        <Col md={4} lg={4}>
                        <Form.Group controlId='emailgroup'>
                            <Form.Label >Email</Form.Label>
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
                        <Col md={4} lg={4}>
                        <Form.Group controlId='requestgroup'>
                            <Form.Label >Status</Form.Label>
                            <Form.Select
                            name='request'
                            onChange={handleChange}
                            value={values.request}
                            >
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                                <option value="pending">Pending</option>

                            </Form.Select>
                           
                        </Form.Group>
                        </Col>
                       
                    </Row>
                    
                   
                    <Row>
                        <Col lg={12}>
                            <div className='borrow-msg'>
                                <h5>Fill At The Time of Borrowing  </h5>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4} lg={4}>
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

                            <Col md={4} lg={4}>
                            <Form.Group controlId='duedategroup'>
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
                            <Col md={4} lg={4}>
                            <Form.Group controlId='borrowstatus'>
                            <Form.Label>BorrowStatus</Form.Label>
                            <Form.Select 
                            name='borrowstatus'
                            onChange={handleChange}
                            value={values.borrowstatus}
                            >
                                <option value="borrowed">Borrowed</option>
                                <option value="notborrowed">Not Borrowed</option>
                                <option value="nothing">nothing</option>


                            </Form.Select>
                            <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>{errors.borrowstatus}</Form.Control.Feedback>
                        </Form.Group>
                            </Col>
                    </Row>
                   
                
                    <div className='borrow-submit-btn'>
                       <Link to='/viewborrowbooksrequest'><Button>Cancel</Button></Link>  <Button type='submit'>Submit</Button>
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

export default UpdateBorrowRequest