import React from 'react'
import * as formik from 'formik';
import * as yup from 'yup';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { sendUpdatedLibrarianProfileImage } from '../Redux/slice';
import { Link, useNavigate } from 'react-router-dom';


const UpdateLibrarianprofileImage = () => {

    const { Formik } = formik;
    const librarianProfileDetails =  useSelector((state)=>state.books.librarianProfileDetails)
    const dispatch = useDispatch();
    const navigate = useNavigate()

  const schema = yup.object().shape({
    image: yup.mixed().required('upload a image'),
  });

  const submitForm = async (data)=>{

    const formData = new FormData()
    formData.append('image',data.image);

    try {
        const res = await axios.put('http://localhost:2000/updatelibrarianprofileimage',formData,{
            withCredentials:true
        })

        if(res.data.success){
            toast.success(res.data.message);
            dispatch(sendUpdatedLibrarianProfileImage(res.data.findedLibrarian));
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
    setFieldValue('image',newImage)
  }
  return (
    <Container fluid className='padding-top'>
        <Row>
            <Col lg={12} >
             <div className='librarian-image-form-div'>
             <Formik
      validationSchema={schema}
      onSubmit={submitForm}
      initialValues={{
        image:librarianProfileDetails.image,
      }}
    > 
             {({ setFieldValue,handleSubmit, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit} className='librarian-image-form'>
                  <Row>
                    <Col lg={12}>
                      <div className='librarian-update-image-head'>
                        <h2>U</h2>
                        <h3>Update-Form</h3>
                      </div>
                    </Col>
                  </Row>
                   <Row>
             <Col lg={12}>
             <Form.Group controlId='imagegroup'>
                <Form.Label>Image</Form.Label>
                <Form.Control 
                type='file'
                name='image'
                onChange={(e)=>handleImageChange(e,setFieldValue)}
                isValid={touched.image && !errors.image}
                isInvalid={errors.image}
                />
                <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type='invalid'>{errors.image}</Form.Control.Feedback>
              </Form.Group>
             </Col>
             </Row>  
             <div className='librarian-image-btn'>
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

export default UpdateLibrarianprofileImage