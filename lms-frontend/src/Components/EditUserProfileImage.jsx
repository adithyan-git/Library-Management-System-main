import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserProfileImage } from '../Redux/slice';

const EditUserProfileImage = () => {

    const { Formik } = formik;
    const userProfileDetails = useSelector((state)=>state.books.userProfileDetails);
    const navigate = useNavigate(); 
    const dispatch = useDispatch()
  const schema = yup.object().shape({
    profileimage: yup.mixed().required('upload a image'),
  });


  const submitForm = async (data)=>{

    const formData = new FormData()
    formData.append('profileimage',data.profileimage);
  
    
    try {
        const res = await axios.put('http://localhost:2000/edituserprofileimage',formData,{
            withCredentials:true
        })

        if(res.data.success){
            toast.success(res.data.message);
            dispatch(changeUserProfileImage(res.data.findUser))
            navigate('/')
        }else{
            toast.error(res.data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
  }

  const handleImageChange =(e,setFieldValue)=>{
    const newImage = e.target.files[0]
    setFieldValue('profileimage',newImage)
  }
  return (
    <Container fluid className='padding-top'>
        <Row>
        <Col lg={12} >
           <div className='user-image-div'>
           <Formik
      validationSchema={schema}
      onSubmit={submitForm}
      initialValues={{
        profileimage:userProfileDetails.image,
      }}
    >
      
      {({ setFieldValue,handleSubmit, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit} className='user-image-form'>
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
         <Col lg={12}>
         <Form.Group controlId='imagegroup'>
            <Form.Label>Image</Form.Label>
            <Form.Control 
            type='file'
            name='profileimage'
            onChange={(e)=>handleImageChange(e,setFieldValue)}
            isValid={touched.profileimage && !errors.profileimage}
            isInvalid={errors.profileimage}
            />
            <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>{errors.profileimage}</Form.Control.Feedback>
          </Form.Group>
         </Col>
         </Row>  
         <div className='user-image-btn'>
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

export default EditUserProfileImage