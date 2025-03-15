import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const AddMissingBook = () => {

    const { Formik } = formik;
    const navigate = useNavigate();

    const schema = yup.object().shape({
        bookname:yup.string().required("please enter the bookname"),
        author:yup.string().required("please enter the author name"),
        price:yup.string().required("please enter the price"),
        numberofmissingcopies:yup.string().required("please enter the noumber of missing copies"),
       
    })

    const submitForm =  async (data)=>{
        try {
            const res = await axios.post('http://localhost:2000/addmissingbook',{
                bookname:data.bookname,
                author:data.author,
                price:data.price,
                numberofmissingcopies:data.numberofmissingcopies
            },{
                withCredentials:true
            });

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
    <Container fluid className='padding-top bg-img'>
        <Row >
            <Col lg={12} className='p-0'>
                  <div className='addmissingbook-div'> 
                  <Formik
      validationSchema={schema}
      onSubmit={submitForm}
      initialValues={{
        bookname: '',
        author: '',
        price: '',
        numberofmissingcopies: '',
        
      }}
    >
             {({ handleSubmit, handleChange, values, touched, errors }) => (
                   <Form className='add-form'  noValidate onSubmit={handleSubmit}> 
                    <Row>
                        <Col lg={12}>
                          <div className='addbook-head'>
                            <h3>A</h3>
                            <h4>
                                Add-Missed-Book
                            </h4>
                            </div>
                        </Col>
                    </Row>
                        <Row>
                        <Col md={6} lg={6}>
                        <Form.Group  className='mb-3' controlId='booknamegroup'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                        type='text' 
                        placeholder='enter the title name'
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
                        <Form.Group controlId='authorgroup'>
                        <Form.Label>Author</Form.Label>
                        <Form.Control 
                        type='text' 
                        placeholder='enter the author name'
                        name='author'
                        value={values.author}
                        onChange={handleChange}
                        isValid={touched.author && !errors.author}
                        isInvalid={errors.author}
                        />
                         <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type='invalid'>{errors.author}</Form.Control.Feedback>
                      </Form.Group>
                        </Col>
                        </Row>
                        <Row>
                        <Col md={6} lg={6}>
                        <Form.Group controlId='pricegroup'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control 
                        type='number' 
                        placeholder='enter the price'
                        name='price'
                        value={values.price}
                        onChange={handleChange}
                        isValid={touched.price && !errors.price}
                        isInvalid={errors.price}
                        />
                         <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type='invalid'>{errors.price}</Form.Control.Feedback>
                      </Form.Group>
                        </Col>
                    
                        <Col md={6} lg={6}>
                        <Form.Group className='mb-3' controlId='numberofmissingcopiesgroup'>
                        <Form.Label>Missing Copies Number</Form.Label>
                        <Form.Control 
                        type='number' 
                        placeholder='enter the number of numberofmissingcopies '
                        name='numberofmissingcopies'
                        value={values.numberofmissingcopies}
                        onChange={handleChange}
                        isValid={touched.numberofmissingcopies && !errors.numberofmissingcopies}
                        isInvalid={errors.numberofmissingcopies}
                        />
                         <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type='invalid'>{errors.numberofmissingcopies}</Form.Control.Feedback>
                      </Form.Group>
                        </Col>
                      
                        </Row>
                     
                  
                     <div className='add-btn'>
                        <Link to='/'><Button>Cancel</Button></Link><Button type='submit'>Submit</Button>
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

export default AddMissingBook