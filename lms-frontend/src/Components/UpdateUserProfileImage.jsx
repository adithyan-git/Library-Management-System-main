import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const UpdateUserProfileImage = () => {

    const { Formik } = formik;
    const editUserDetails = useSelector((state)=>state.books.editUserDetails);
    console.log(editUserDetails);
    
    const navigate = useNavigate();

    const schema = yup.object().shape({
        profileimage: yup.mixed().required('upload an image'),
      });

      const handleImageChange =(e,setFieldValue)=>{
        const newImage = e.target.files[0]
        setFieldValue('profileimage',newImage)
      }

      const submitForm = async (data) => {

        const formData = new FormData()
        
        formData.append('profileimage',data.profileimage);
    
        try {
            const res = await axios.put(`http://localhost:2000/adminedituserprofile/${editUserDetails._id}`,formData,{
                withCredentials:true
            })
    
            if(res.data.success){
                toast.success(res.data.message);
                navigate('/allusers')
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
                <div className='admin-useredit-profile-div'>
                <Formik
            validationSchema={schema}
            onSubmit={submitForm}
                initialValues={{
                    profileimage: editUserDetails.profileimage,
                }}
             > 
               {({ setFieldValue,handleSubmit, handleChange, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row>
                            <Col lg={12}>
                                <div className='update-admin-div'>
                                    <h3>U</h3>
                                    <h5>Update-Form</h5>
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
                            <div className='admin-useredit-btn'>
                                <Link to='/allusers'><Button>Cancle</Button></Link><Button type='submit'>Submit</Button>
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

export default UpdateUserProfileImage