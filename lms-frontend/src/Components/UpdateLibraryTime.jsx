import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const UpdateLibraryTime = () => {

    const editTime = useSelector((state)=>state.books.editLibraryTime);
        
    const navigate = useNavigate();
    const { Formik } = formik;


    const schema = yup.object().shape({
        openingtime: yup.string().required('enter the openingtime'),
        closingtime: yup.string().required('enter the closingtime'),
        workingdays: yup.array().required(),
    });

    const submitForm = async (data)=>{
        
        
            try {
                const res = await axios.put(`http://localhost:2000/updatelibrarytime/${editTime._id}`,{
                    openingtime:data.openingtime,
                    closingtime:data.closingtime,
                    workingdays:data.workingdays
                },{
                    withCredentials:true
                });

                if(res.data.success){
                    toast.success(res.data.message);
                    navigate('/')
                }else{
                    toast.error(res.data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
    } 
   

  return (
    <section className='time-section'>
          <Container fluid className='padding-top'>
        <Row>
            <Col lg={12} >

            <div className='update-time-div'>
            <Formik
                  validationSchema={schema}
                  onSubmit={submitForm}
                  initialValues={{
                    openingtime: editTime.openingtime,
                    closingtime: editTime.closingtime,
                    workingdays: []
                  }}
                >
                         {({ handleSubmit, handleChange, values, touched, errors }) => (
                               <Form className='librarytime-add-form'  noValidate onSubmit={handleSubmit}> 
                                <Row>
                                    <Col lg={12}>
                                      <div className='add-time-head'>
                                        <h4>
                                            Add-LibraryTime
                                        </h4>
                                        </div>
                                    </Col>
                                </Row>
                                    <Row>
                                    <Col lg={12}>
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
                                    </Row>
                                    <Row>
                                    <Col lg={12}>
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
                                  </Form.Group>
                                    </Col>
                                    </Row>
                                
                                 <div className='add-time-btn'>
                                  <Link to={'/'}><Button>Cancle</Button></Link><Button type='submit'>Submit</Button>
                                 </div>
                               </Form>
                         )}
            </Formik>
            </div>
            </Col>
        </Row>
    </Container>
    </section>
  )
}

export default UpdateLibraryTime