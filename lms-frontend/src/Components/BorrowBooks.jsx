import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const BorrowBooks = () => {

  const { Formik } = formik;
  const   bookDetails  = useSelector((state)=>state.books.bookDetails);
  const loginDetails = useSelector((state)=>state.books.loginDetails);
  const userMembership = useSelector((state)=>state.books.userMembership);
  const reserveBook = useSelector((state)=>state.books.reserveBook);
  
  const navigate = useNavigate();

  const schema = yup.object().shape({
    fullname: yup.string().required(),
    email: yup.string().required(),
    address: yup.string().required(),
    place: yup.string().required(),
    registernumber: yup.string().required(),
    bookname: yup.string().required(),
    requestsendeddate:yup.string().required(),
  });

  const submitForm = async (data)=>{
    
    try {
      const res = await axios.post('http://localhost:2000/borrowbook',{
        fullname:data.fullname,
        email:data.email,
        address:data.address,
        place:data.place,
        registernumber:data.registernumber,
        bookname:data.bookname,
        requestsendeddate:data.requestsendeddate
      },{
        withCredentials:true
      });

      if(res.data.success){
        toast.success(res.data.message);
        // dispatch(updateReserveStatus(data))
        navigate('/')
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  return (
    <Container fluid className='padding-top'>
        <Row>
            <Col lg={12} className='p-0'>
                      <div className='borrowform-div'>

                <Formik
                validationSchema={schema}
                onSubmit={submitForm}
                initialValues={{
                fullname:loginDetails.fullname,
                email:loginDetails.email,
                address:loginDetails.address,
                place:loginDetails.place,
                registernumber: userMembership.registernumber,
                bookname: (bookDetails.title || reserveBook.bookname),
                requestsendeddate:'',
                }}
                >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit} className='borrowsubmit-form'>
            <Row>
            <Col lg={12}>
              <div className='borrow-form-head'>
                <h6>B</h6>
               <h4>
                Borrow-Book
                </h4>
              </div>
            </Col>
        </Row>                      
          <Row>
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
          </Row>  
          <Row>
              <Col md={6} lg={6}>
              <Form.Group  className='mb-3' controlId='place'>
              <Form.Label>Place</Form.Label>
              <Form.Control 
              type='text' 
              placeholder='place'
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
          </Row>                                       
          <Row>
              <Col md={6} lg={6}>
              <Form.Group  className='mb-3' controlId='bookname'>
              <Form.Label>Bookname</Form.Label>
              <Form.Control 
              type='text' 
              placeholder='bookname....'
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
              <Col md={6} lg={6}>
              <Form.Group controlId='requestsendeddate'>
              <Form.Label>Date</Form.Label>
              <Form.Control 
              type='date' 
              name='requestsendeddate'
              value={values.requestsendeddate}
              onChange={handleChange}
              isValid={touched.requestsendeddate && !errors.requestsendeddate}
              isInvalid={errors.requestsendeddate}
              />
              <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>{errors.requestsendeddate}</Form.Control.Feedback>
            </Form.Group>
              </Col>
          </Row>
          <div className='borrow-btn'>
            <Link to='/userallbooks'><Button>Cancel</Button></Link>
            <Button type='submit'>Submit</Button>
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

export default BorrowBooks