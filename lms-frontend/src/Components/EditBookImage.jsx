import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import * as formik from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { sendUpdatedBookImage } from '../Redux/slice';

const EditBookImage = () => {

    const { Formik } = formik;
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const editInitialValues = useSelector((state)=>state.books.editInitialValues);
    console.log(editInitialValues);
    

  const schema = yup.object().shape({
    bookimage: yup.mixed().required('upload a image'),
  });

  const submitForm = async (data)=>{

    const formData = new FormData()
    formData.append('bookimage',data.bookimage);

    try {
        const res = await axios.put(`http://localhost:2000/editbookimage/${editInitialValues._id}`,formData,{
            withCredentials:true
        })

        if(res.data.success){
            toast.success(res.data.message);
            dispatch(sendUpdatedBookImage(res.data.checkBook,editInitialValues._id))
            navigate('/allbooks')
        }else{
            toast.error(res.data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
  }

  const handleImageChange =(e,setFieldValue)=>{
    const newImage = e.target.files[0]
    setFieldValue('bookimage',newImage)
  }
  return (
    <Container fluid className='padding-top'>
    <Row>
        <Col lg={12} className='p-0'>
           <div className='admin-profile-image-update-div'>
           <Formik
  validationSchema={schema}
  onSubmit={submitForm}
  initialValues={{
    bookimage:editInitialValues.bookimage,
  }}
> 
                  {({ setFieldValue,handleSubmit, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit} className='admin-image-form'>
              <Row>
                <Col lg={12} >
                    <div className='admin-profile-image-head'>
                       <h4>Update-Form</h4>
                    </div>
                </Col>
              </Row>
               <Row>
         <Col lg={12}>
         <Form.Group controlId='imagegroup'>
            <Form.Label>Image</Form.Label>
            <Form.Control 
            type='file'
            name='bookimage'
            onChange={(e)=>handleImageChange(e,setFieldValue)}
            isValid={touched.bookimage && !errors.bookimage}
            isInvalid={errors.bookimage}
            />
            <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>{errors.bookimage}</Form.Control.Feedback>
          </Form.Group>
         </Col>
         </Row>  
         <div className='admin-image-btn'>
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

export default EditBookImage