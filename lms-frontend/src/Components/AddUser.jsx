import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sendAddedUser } from '../Redux/slice';

const AddUser = () => {

      const { Formik } = formik;
      const dispatch = useDispatch();
      const navigate = useNavigate();

      const schema = yup.object().shape({
              fullname:yup.string().required("please enter your fullname"),
              email:yup.string().required("please enter your email"),
              password:yup.string().required("please enter your password"),
              dateofbirth:yup.date().required("please choose your date of birth"),
              place:yup.string().required("please enter your place"),
              address:yup.string().required("please enter your address"),
              gender:yup.string().required("please select your gender"),
              phonenumber:yup.string().required("please enter your phonenumber"),
              profileimage:yup.mixed().required("please upload a image"),
              
          })
          
          const handleProfileImage = (event,setFieldValue)=>{
            const profileImage = event.target.files[0];
            setFieldValue('profileimage',profileImage)

          }

          const addUser = async (data)=>{

              const formData = new FormData();

              formData.append("fullname",data.fullname);
              formData.append("email",data.email);
              formData.append("password",data.password);
              formData.append("dateofbirth",data.dateofbirth);
              formData.append("place",data.place);
              formData.append("address",data.address);
              formData.append("gender",data.gender);
              formData.append("phonenumber",data.phonenumber);
              formData.append("profileimage",data.profileimage);

              try {
                const res = await axios.post('http://localhost:2000/adduser',formData,{
                  withCredentials:true
                })
                
                if(res.data.success){
                  toast.success(res.data.message);
                  dispatch(sendAddedUser(res.data.registrationData));
                  navigate('/');
                }else{
                  toast.error(res.data.message);
                }
              } catch (error) {
                toast.error(error.message);
              }
          }
  return (
    <Container fluid className='padding-top  '>
      <Row>
        <Col lg={6} style={{padding:'0px'}}>
          <div className='add-img'>
            <p>A BookSpere Library Management System is a digital solution that efficiently organizes, tracks, and manages library resources, making book lending and inventory management seamless.</p>
          </div>
        </Col>
        <Col lg={6} className='p-0 '>
            <div className='adduser-div'>
            <Formik
      validationSchema={schema}
      onSubmit={addUser}
      initialValues={{
        fullname: '',
        email: '',
        password: '',
        dateofbirth: '',
        place: '',
        address:'',
        gender:'',
        phonenumber:'',
        profileimage:null,
       
      }}
    >
             {({ setFieldValue,handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit} className='adduser-form'>
            <Row>
              <Col lg={12}>
                <div className='addusers-div'>
                    <h5>Add User Form</h5>
                </div>
              </Col>
            </Row>
            <Row>
             <Col md={6} lg={6}>
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
        
             <Col md={6} lg={6}>
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
            </Row>
            <Row>
             <Col md={4} lg={4}>
             <Form.Group controlId='passwordgroup'>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type='password'
                name='password'
                placeholder='enter your password'
                value={values.password}
                onChange={handleChange}
                isValid={touched.password && !errors.passwordd}
                isInvalid={errors.password}
                />
                <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
              </Form.Group>
             </Col>
             <Col md={4} lg={4}>
             <Form.Group controlId='dateofbirthgroup'>
                <Form.Label>Date Of Birth</Form.Label>
                <Form.Control 
                type='date'
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
             <Col md={4} lg={4}>
             <Form.Group controlId='placegroup'>
                <Form.Label>Place</Form.Label>
                <Form.Control 
                type='text'
                name='place'
                placeholder='enter your place'
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
             <Col md={6} lg={6}>
             <Form.Group controlId='addressgroup'>
                <Form.Label>Address</Form.Label>
                <Form.Control 
                type='text'
                name='address'
                placeholder='enter your address'
                value={values.address}
                onChange={handleChange}
                isValid={touched.address && !errors.address}
                isInvalid={errors.address}
                />
                <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type='invalid'>{errors.address}</Form.Control.Feedback>
              </Form.Group>
             </Col>
             <Col md={6} lg={6}>
             <Form.Group controlId='radiogroup'>
                <Form.Label>Select your gender</Form.Label>
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
            </Row>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group controlId='phonenumbergroup'>
                <Form.Label>Phonenumber</Form.Label>
                <Form.Control 
                type='text'
                name='phonenumber'
                placeholder='enter your phonenumber'
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
              <Row>
                <Col md={12} lg={12}>
                <Form.Group controlId='profileimagegroup'>
                <Form.Label>Image</Form.Label>
                <Form.Control 
                type='file'
                name='profileimage'
                onChange={(e)=>handleProfileImage(e,setFieldValue)}
                isValid={touched.profileimage && !errors.profileimage}
                isInvalid={errors.profileimage}
                />
                <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type='invalid'>{errors.profileimage}</Form.Control.Feedback>
              </Form.Group>
                </Col>
              </Row>
              <div className='adduser-btn'>
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

export default AddUser