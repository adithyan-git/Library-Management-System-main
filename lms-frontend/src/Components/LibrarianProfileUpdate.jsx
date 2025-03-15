import React from 'react'
import * as formik from 'formik';
import * as yup from 'yup';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { sendUpdatedLibrarianDetail } from '../Redux/slice';

const LibrarianProfileUpdate = () => {

    const { Formik } = formik;
    const librarianProfileDetails =  useSelector((state)=>state.books.librarianProfileDetails)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const schema = yup.object().shape({
        fullname: yup.string().required('enter the fullname'),
        email: yup.string().required('enter the email'),
        phonenumber: yup.string().required('enter the phonenumber '),
        gender: yup.string().required('select the gender'),
        address: yup.string().required('enter the address'),
        place: yup.string().required('enter the place'),
        dateofbirth: yup.string().required('select your date of birth'),

    });

        const submitForm = async (data) =>{
            try {
                const res = await axios.put("http://localhost:2000/librarianprofile",{
                    fullname: data.fullname,
                    email: data.email,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    address: data.address,
                    place:data.place,
                    dateofbirth:data.dateofbirth
                },{
                    withCredentials:true
                 });
    
                if(res.data.success){
                    toast.success(res.data.message);
                     dispatch(sendUpdatedLibrarianDetail(data))
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
                        <div className='librarian-profile-update-main-div'>
                        <Formik
      validationSchema={schema}
      onSubmit={submitForm}
      initialValues={{
        fullname: librarianProfileDetails.fullname,
        email: librarianProfileDetails.email,
        phonenumber: librarianProfileDetails.phonenumber,
        gender: librarianProfileDetails.gender,
        address: librarianProfileDetails.address,
        place: librarianProfileDetails.place,
        dateofbirth: librarianProfileDetails.dateofbirth,
      }}
    >
             {({ handleSubmit, handleChange, values, touched, errors }) => (
                   <Form className='update-librarian-form'  noValidate onSubmit={handleSubmit}> 
                   <Row>
                     <Col lg={12}>
                        <div className='update-librarian-form-head'>
                           <h4>U</h4>
                           <h3>Update-Form</h3>
                        </div>
                     </Col>
                   </Row>
                     <Row>
                        <Col lg={4}>
                        <Form.Group  className='mb-3' controlId='fullnamegroup'>
                        <Form.Label>fullname</Form.Label>
                        <Form.Control 
                        type='text' 
                        placeholder='enter the fullname'
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
                   
                     <Col lg={4}>
                        <Form.Group  className='mb-3' controlId='emailgroup'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                        type='text' 
                        placeholder='enter the email'
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
                     
                     <Col lg={4}>
                        <Form.Group  className='mb-3' controlId='phonenumbergroup'>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control 
                        type='text' 
                        placeholder='enter the phone number'
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
                     <Row>
                     <Col lg={6}>
                        <Form.Group  className='mb-3' controlId='radiogroup'>
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
                    
                     <Col lg={6}>
                        <Form.Group className='mb-3' controlId='addressgroup'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control 
                        type='text' 
                        placeholder='enter the address'
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
                        <Form.Group className='mb-3' controlId='placegroup'>
                        <Form.Label>Place</Form.Label>
                        <Form.Control 
                        type='text' 
                        placeholder='enter the place'
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
                        <Col lg={6}>
                        <Form.Group className='mb-3' controlId='dateofbirthgroup'>
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
                     </Row>
                     <div className='update-librarian-btn'>
                        <Link to={'/'}><Button>Cancel</Button></Link><Button type='submit'>Submit</Button>
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

export default LibrarianProfileUpdate