import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sendApprovedReturn } from '../Redux/slice';

const ApproveReturn = () => {

    const { Formik } = formik;
    const returnBook = useSelector((state)=>state.books.returnBook);
    const dispatch = useDispatch()
    const navigate = useNavigate();

  const schema = yup.object().shape({
    fullname: yup.string().required("enter the fullname"),
    email: yup.string().required("enter the email"),
    bookname: yup.string().required("enter the bookname"),
    registernumber: yup.string().required("enter theregister number"),
    address: yup.string().required("enter the address"),
    returnstatus:yup.string().required("enter the returnstatus"),
    returndate: yup.string().required("choose your return date"),
    borroweddate: yup.string().required("choose your borroweddate"),
    duedate: yup.string().required("choose your duedate"),
    numberofoverduedays:yup.string().required("enter the number of overduedays"),
    fineperday: yup.string().required("enter the fine per day"),
    totalfineamount: yup.string().required("enter the total fine amount"),
  });

  const submitReturn = async (data) =>{

    
        try {
            const res = await axios.put(`http://localhost:2000/approvereturn/${returnBook._id}`,{
                fullname:data.fullname,
                email:data.email,
                bookname:data.bookname,
                registernumber:data.registernumber,
                address:data.address,
                returnstatus:data.returnstatus,
                returndate:data.returndate,
                borroweddate:data.borroweddate,
                duedate:data.duedate,
                numberofoverduedays:data.numberofoverduedays,
                fineperday:data.fineperday,
                totalfineamount:data.totalfineamount
            },{
                withCredentials:true
            });
    
            if(res.data.success){
                toast.success(res.data.message);
                dispatch(sendApprovedReturn(returnBook._id))
                 navigate('/viewborrowbooksrequest')
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
            <Col lg={12} >
                <div className='return-approve-div'>
                <Formik
      validationSchema={schema}
      onSubmit={submitReturn}
      initialValues={{
        fullname: returnBook.fullname,
        email: returnBook.email,
        bookname: returnBook.bookname,
        registernumber: returnBook.registernumber,
        address: returnBook.address,
        returnstatus:returnBook.return,
        returndate: returnBook.returndate,
        borroweddate: returnBook.borroweddate,
        duedate: returnBook.duedate,
        numberofoverduedays:'',
        fineperday:'',
        totalfineamount:'',
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form className='return-form' noValidate onSubmit={handleSubmit}>
                <Row>
                        <Col lg={12}>
                            <div className='return-head'>
                                <h3>R</h3>
                                <h5>
                                    Return-Form
                                </h5>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4} lg={4}>
                        <Form.Group controlId='fulllnamegroup'>
                            <Form.Label>Fullname</Form.Label>
                            <Form.Control 
                            type='text'
                            name='fullname'
                            placeholder='enter the name'
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
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                            type='text'
                            name='email'
                            placeholder='enter the email'
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
                        <Form.Group controlId='booknamegroup'>
                            <Form.Label>Bookname</Form.Label>
                            <Form.Control
                            type='text'
                            name='bookname'
                            placeholder='enter the bookname'
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
                        <Col md={4} lg={4}>
                        <Form.Group controlId='registernumbergroup'>
                            <Form.Label>Registernumber</Form.Label>
                            <Form.Control
                            type='text'
                            name='registernumber'
                            placeholder='enter the registernumber'
                            value={values.registernumber}
                            onChange={handleChange}
                            isValid={touched.registernumber && !errors.registernumber}
                            isInvalid={errors.registernumber}
                            />
                            <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>{errors.registernumber}</Form.Control.Feedback>
                        </Form.Group>
                        </Col>
                        <Col md={4} lg={4}>
                        <Form.Group controlId='addressgroup'>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                            type='text'
                            name='address'
                            placeholder='enter the address'
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
                        <Form.Group controlId='addressgroup'>
                            <Form.Label>ReturnStatus</Form.Label>
                            <Form.Select 
                            name='returnstatus'
                            onChange={handleChange}
                            value={values.returnstatus}
                            >
                                <option value="approved">Approved</option>
                                <option value="pending">Pending</option>
                            </Form.Select>
                            <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>{errors.returnstatus}</Form.Control.Feedback>
                        </Form.Group>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col md={4} lg={4}>
                        <Form.Group controlId='returndategroup'>
                            <Form.Label>ReturnDate</Form.Label>
                            <Form.Control
                            type='Date'
                            name='returndate'
                            value={values.returndate}
                            onChange={handleChange}
                            isValid={touched.returndate && !errors.returndate}
                            isInvalid={errors.returndate}
                            />
                            <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>{errors.returndate}</Form.Control.Feedback>
                        </Form.Group>
                        </Col>
                        <Col md={4}  lg={4}>
                        <Form.Group controlId='duedategroup'>
                            <Form.Label>Borrowed Date</Form.Label>
                            <Form.Control
                            type='Date'
                            name='borroweddate'
                            value={values.borroweddate}
                            onChange={handleChange}
                            isValid={touched.borroweddate && !errors.borroweddate}
                            isInvalid={errors.borroweddate}
                            />
                            <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>{errors.duedate}</Form.Control.Feedback>
                        </Form.Group>
                        </Col>
                        <Col md={4} lg={4}>
                        <Form.Group controlId='duedategroup'>
                            <Form.Label>DueDate</Form.Label>
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
                    </Row>
                    <Row>
                        <Col md={4} lg={4}>
                        <Form.Group controlId='returndategroup'>
                            <Form.Label>Number Of OverDueDays</Form.Label>
                            <Form.Control
                            type='text'
                            name='numberofoverduedays'
                            value={values.numberofoverduedays}
                            onChange={handleChange}
                            isValid={touched.numberofoverduedays && !errors.numberofoverduedays}
                            isInvalid={errors.numberofoverduedays}
                            />
                            <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>{errors.numberofoverduedays}</Form.Control.Feedback>
                        </Form.Group>
                        </Col>
                        <Col md={4} lg={4}>
                        <Form.Group controlId='duedategroup'>
                            <Form.Label>Fine Per Day</Form.Label>
                            <Form.Control
                            type='text'
                            name='fineperday'
                            value={values.fineperday}
                            onChange={handleChange}
                            isValid={touched.fineperday && !errors.fineperday}
                            isInvalid={errors.fineperday}
                            />
                            <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>{errors.fineperday}</Form.Control.Feedback>
                        </Form.Group>
                        </Col>
                        <Col md={4} lg={4}>
                        <Form.Group controlId='duedategroup'>
                            <Form.Label>Total Fine Amount</Form.Label>
                            <Form.Control
                            type='text'
                            name='totalfineamount'
                            value={values.totalfineamount}
                            onChange={handleChange}
                            isValid={touched.totalfineamount && !errors.totalfineamount}
                            isInvalid={errors.totalfineamount}
                            />
                            <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>{errors.totalfineamount}</Form.Control.Feedback>
                        </Form.Group>
                        </Col>
                    </Row>
                    <div className='return-form-btn'>
                        <Link to='/viewborrowbooksrequest'><Button>Cancel</Button></Link><Button type='submit'>
                            Submit
                        </Button>
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

export default ApproveReturn