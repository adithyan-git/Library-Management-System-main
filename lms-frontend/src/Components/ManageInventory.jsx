import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const ManageInventory = () => {

    const { Formik } = formik;
    const navigate = useNavigate();

  const schema = yup.object().shape({
    booktitle: yup.string().required("enter the bookname"),
    publisher: yup.string().required("enter the author name"),
    price: yup.string().required("enter the price"),
    problem: yup.string().required("enter the problem"),
  });

  const submitForm = async (data)=>{
        try {
            const res = await axios.post('http://localhost:2000/addbookproblem',{
                booktitle:data.booktitle,
                publisher:data.publisher,
                price:data.price,
                problem:data.problem
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
            <Col lg={12}>
            <div className='manage-div'>
            <Formik
      validationSchema={schema}
      onSubmit={submitForm}
      initialValues={{
        booktitle: '',
        publisher: '',
        price: '',
        problem: '',
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit} className='manage-form'>
                    <Row>
                        <Col lg={12}>
                            <div className='add-miss-head'>
                                <h3>A</h3>
                                <h5>Add Book Problem</h5>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                    <Col md={6} lg={6}>
                    <Form.Group   controlId='booknamegroup'>
                        <Form.Label>Bookname</Form.Label>
                        <Form.Control
                        type="text"
                        name="booktitle"
                        value={values.booktitle}
                        onChange={handleChange}
                        isValid={touched.booktitle && !errors.booktitle}
                        isInvalid={errors.booktitle}
                        />
                        <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>{errors.booktitle}</Form.Control.Feedback>
                    </Form.Group>
                    </Col>
                    <Col md={6} lg={6}>
                    <Form.Group  controlId='publishergroup'>
                        <Form.Label>Publisher</Form.Label>
                        <Form.Control
                        type="text"
                        name="publisher"
                        value={values.publisher}
                        onChange={handleChange}
                        isValid={touched.publisher && !errors.publisher}
                        isInvalid={errors.publisher}
                        />
                        <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>{errors.publisher}</Form.Control.Feedback>
                    </Form.Group>
                    </Col>
                    <Col md={6} lg={6}>
                    <Form.Group controlId='pricegroup'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                        type="number"
                        name="price"
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
                    <Form.Group   controlId='problemgroup'>
                        <Form.Label>Problem</Form.Label>
                        <Form.Control
                        type="text"
                        name="problem"
                        value={values.problem}
                        onChange={handleChange}
                        isValid={touched.problem && !errors.problem}
                        isInvalid={errors.problem}
                        />
                        <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>{errors.problem}</Form.Control.Feedback>
                    </Form.Group>
                    </Col>
                  
                    
                    
                    </Row>
                    <div className='manage-btn'>
                      <Link to={'/'}><Button>Cancel</Button></Link>  <Button type='submit'>Submit</Button> 
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

export default ManageInventory