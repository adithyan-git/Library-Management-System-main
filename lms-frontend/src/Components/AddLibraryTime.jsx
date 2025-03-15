import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const AddLibraryTime = () => {

    const { Formik } = formik;
    const navigate = useNavigate();

        const schema = yup.object().shape({
            openingtime:yup.string().required("please enter the opening time"),
            closingtime:yup.string().required("please enter the closing time"),
            workingdays:yup.array().required("please enter the working days"),
        });

        const submitForm = async (data) =>{

            
            try {
                const res = await axios.post('http://localhost:2000/librarytime',{
                    openingtime:data.openingtime,
                    closingtime:data.closingtime,
                    workingdays:data.workingdays
                },{
                    withCredentials:true
                })

                if(res.data.success){
                    toast.success(res.data.message);
                    navigate('/')
                }else{
                    toast.error(res.data.message)
                    navigate('/')

                }
            } catch (error) {
                toast.error(error.message)
            }
        }

  return (
   <Container fluid className='padding-top'>
    <Row>
        <Col lg={12} className='p-0'>
                   <div className='addtime-div'>
                   <Formik
      validationSchema={schema}
      onSubmit={submitForm}
      initialValues={{
        openingtime: '',
        closingtime: '',
        workingdays: '',
      }}
    >
             {({ handleSubmit, handleChange, values, touched, errors }) => (
                   <Form className='librarytime-add-form'  noValidate onSubmit={handleSubmit}> 
                    <Row>
                        <Col lg={12}>
                          <div className='add-time-head'>
                            <h3>ALT</h3>
                            <h4>
                                Add-LibraryTime
                            </h4>
                            </div>
                        </Col>
                    </Row>
                        <Row>
                        <Col lg={6}>
                        <Form.Group  className='mb-3' controlId='openingtimegroup'>
                        <Form.Label>Opening Time</Form.Label>
                        <Form.Control 
                        type='text' 
                        placeholder='enter the opening time'
                        name='openingtime'
                        value={values.openingtime}
                        onChange={handleChange}
                        isValid={touched.openingtime && !errors.openingtime}
                        isInvalid={errors.openingtime}
                        />                                      
                        <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>{errors.openingtime}</Form.Control.Feedback>
                      </Form.Group>
                        </Col>
                      
                        <Col lg={6}>
                        <Form.Group controlId='closingtimegroup'>
                        <Form.Label>ClosingTime</Form.Label>
                        <Form.Control 
                        type='text' 
                        placeholder='enter the closingtime'
                        name='closingtime'
                        value={values.closingtime}
                        onChange={handleChange}
                        isValid={touched.closingtime && !errors.closingtime}
                        isInvalid={errors.closingtime}
                        />
                         <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type='invalid'>{errors.closingtime}</Form.Control.Feedback>
                      </Form.Group>
                        </Col>
                        </Row>
                        <Row>
                        <Col lg={12}>
                        <Form.Group controlId='workingdaysgroup'>
                        <Form.Label>Working Days</Form.Label>
                        <div className='day-div'>
                        <Form.Check
                            inline
                            label="Sun"
                            name="workingdays"
                            type='checkbox'
                            value='sunday'
                            onChange={handleChange}
                            />
                            <Form.Check
                            inline
                            label="Mon"
                            name="workingdays"
                            type='checkbox'
                            value='monday'
                            onChange={handleChange}
                            />
                            <Form.Check
                            inline
                            label="Tue"
                            name="workingdays"
                            type='checkbox'
                            value='tuesday'
                            onChange={handleChange}
                            />
                            <Form.Check
                            inline
                            label="Wed"
                            name="workingdays"
                            type='checkbox'
                            value='wednesday'
                            onChange={handleChange}

                            />
                            <Form.Check
                            inline
                            label="Thu"
                            name="workingdays"
                            type='checkbox'
                            value='thursday'
                            onChange={handleChange}
                            />
                            <Form.Check
                            inline
                            label="Fri"
                            name="workingdays"
                            type='checkbox'
                            value='friday'
                            onChange={handleChange}
                            />
                            <Form.Check
                            inline
                            label="Sat"
                            name="workingdays"
                            type='checkbox'
                            value='saturday'
                            onChange={handleChange}
                            />
                        </div>
                       
                         <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type='invalid'>{errors.workingdays}</Form.Control.Feedback>
                      </Form.Group>
                        </Col>
                        </Row>
                    
                     <div className='add-time-btn'>
                       <Link to='/'><Button>Cancel</Button></Link> <Button type='submit'>Submit</Button>
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

export default AddLibraryTime