import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { updatedUserprofile } from '../Redux/slice';

const EditUserProfileDetails = () => {

    const { Formik } = formik;
    const loginDetails = useSelector((state)=>state.books.loginDetails);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const schema = yup.object().shape({
        fullname: yup.string().required(),
        email: yup.string().required(),
        dateofbirth: yup.string().required(),
        place: yup.string().required(),
        address: yup.string().required(),
        gender:  yup.string().required(),
        phonenumber: yup.string().required()
    });

    const submitForm = async (data) => {
        try {
            const res = await axios.put("http://localhost:2000/edituserprofile",{
                fullname: data.fullname,
                email: data.email,
                dateofbirth: data.dateofbirth,
                place: data.place,
                address: data.address,
                gender: data.gender,
                phonenumber: data.phonenumber,
            },{
                withCredentials:true
             });

            if(res.data.success){
                toast.success(res.data.message);
                dispatch(updatedUserprofile(data))
                navigate('/')
             }else{
                toast.error(res.data.message);
             }
        } catch (error) {
            toast.error(error.message);
        }
        
    }

  return (
    <Container fluid>
        <Row>
            <Col lg={6}>
                <div className='user-edit-profileform'>
    <Formik
      validationSchema={schema}
      onSubmit={submitForm}
      initialValues={{
        fullname: loginDetails.fullname,
        
        email:loginDetails.email,
        dateofbirth: loginDetails.dateofbirth,
        place:loginDetails.place,
        address: loginDetails.address,
        gender:loginDetails.gender,
        phonenumber:loginDetails.phonenumber
      }}
    >
             {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row>
                            <Col lg={12}>
                            <div className='userprofileedit-form-head'>
                                <h6>U</h6>
                            <h4>
                                Update-Form
                                </h4>
                            </div>
                            </Col>
                        </Row>  
                        <Row>
                            <Col lg={6}>
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
                           
                            <Col lg={6}>
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
                        </Row> 
                        <Row>
                            <Col lg={6}>
                            <Form.Group  className='mb-3' controlId='dateofbirth'>
                            <Form.Label>DateOfBirth</Form.Label>
                            <Form.Control 
                            type='date' 
                            placeholder='dateofbirth.....'
                            name='dateofbirth'
                            value={values.dateofbirth}
                            onChange={handleChange}
                            isValid={touched.dateofbirth && !errors.dateofbirth}
                            isInvalid={errors.dateofbirth}
                            />                                      
                            <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>{errors.dateofbirth}</Form.Control.Feedback>
                            </Form.Group>
                            </Col>
                            <Col lg={6}>
                            <Form.Group controlId='place'>
                            <Form.Label>Place</Form.Label>
                            <Form.Control 
                            type='text' 
                            placeholder='place....'
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
                           
                        </Row>                      
                        <Row>
                            <Col lg={6}>
                            <Form.Group  className='mb-3' controlId='address'>
                            <Form.Label>Address</Form.Label>
                            <Form.Control 
                            type='text' 
                            placeholder='address.....'
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
                            <Col lg={6}>
                            <Form.Group controlId='gender'>
                            <Form.Label>Gender</Form.Label>
                            <div  className="mb-3">
                                <Form.Check
                                    inline
                                    label="male"
                                    name="gender"
                                    type="radio"
                                    value='male'
                                    onChange={handleChange}
                                />
                                <Form.Check
                                    inline
                                    label="female"
                                    name="gender"
                                    type="radio"
                                    value='female'
                                    onChange={handleChange}
                                /> 
                                <Form.Check
                                    inline
                                    label="other"
                                    name="gender"
                                    type="radio"
                                    value='other'
                                    onChange={handleChange}
                                />
                            </div>
                            </Form.Group>
                            </Col>
                            <Col lg={12}>
                            <Form.Group controlId='phonenumber'>
                            <Form.Label>Phonenumber</Form.Label>
                            <Form.Control 
                            type='text' 
                            placeholder='phonenumber....'
                            name='phonenumber'
                            value={values.phonenumber}
                            onChange={handleChange}
                            isValid={touched.phonenumber && !errors.phonenumber}
                            isInvalid={errors.phonenumber}
                            />
                            <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>{errors.phonenumber}</Form.Control.Feedback>
                            </Form.Group>
                            </Col>
                        </Row>
                       
                      
                        <div className='user-profileedit-btn'>
                            <Link to={'/'}><Button>Cancel</Button></Link>
                            <Button type='submit'>Submit</Button>
                        </div>
                    </Form>
                )}
                    </Formik>
                </div>
            </Col>
            <Col lg={6}>
                <div className='user-edit-profileform-img'>
                    <img src="/Images/editimageuser.jpg" alt="" />
                </div>
            </Col>
        </Row>
    </Container>
  )
}

export default EditUserProfileDetails