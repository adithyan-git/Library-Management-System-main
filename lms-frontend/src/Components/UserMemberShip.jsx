import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { membershipSend } from '../Redux/slice';

const UserMemberShip = () => {

    const { Formik } = formik;
    const navigate = useNavigate();
    const loginDetails = useSelector((state)=>state.books.loginDetails);
    const dispatch = useDispatch();

    const schema = yup.object().shape({
        fullname: yup.string().required(),
        email: yup.string().required(),
        phonenumber: yup.string().required(),
        address: yup.string().required(),
        gender: yup.string().required(),
        date: yup.string().required(),
        dateofbirth: yup.string().required(),
        membershiptype: yup.string().required(),
        place: yup.string().required(),
        file: yup.mixed().required(),
        imageproof: yup.mixed().required(),
    });

    const submitForm = async (data)=>{
        
        const formData = new FormData();

        
        formData.append('fullname',data.fullname);
        formData.append('email',data.email)
        formData.append('phonenumber',data.phonenumber)
        formData.append('address',data.address)
        formData.append('gender',data.gender);
        formData.append('date',data.date)
        formData.append('dateofbirth',data.dateofbirth)
        formData.append('membershiptype',data.membershiptype)
        formData.append('place',data.place)
        formData.append('file',data.file)
        formData.append('imageproof',data.imageproof);

        try {
            const res = await axios.post('http://localhost:2000/membership',formData,{
                withCredentials:true
            })

            if(res.data.success){
                toast.success(res.data.message);
                dispatch(membershipSend(data));
                navigate('/')
            }else{
                toast.error(res.data.message);
            }
        } catch (error) {
            return toast.error(error.message);
        }
    }

    const handleImageChange =(e,setFieldValue)=>{
        const image = e.target.files[0]
        setFieldValue('file',image);
        
    }
    const handleProofChange =(e,setFieldValue)=>{
        const proof = e.target.files[0];
        setFieldValue('imageproof',proof) 
    }

  return (
    <Container fluid className='padding-top'>
        <Row>
            <Col lg={6} className='p-0'>
            <div className='membershipForm-div'>
            <Formik
      validationSchema={schema}
      onSubmit={submitForm}
      initialValues={{
        fullname:loginDetails.fullname ,
        email: loginDetails.email,
        username:loginDetails.username,
        phonenumber:loginDetails.phonenumber,
        address:loginDetails.address,
        gender:loginDetails.gender,
        date: "",
        dateofbirth:loginDetails.dateofbirth,
        membershiptype:'',
        place: loginDetails.place ,
        file: null,
        imageproof:null
       
      }}
    >
      {({ setFieldValue,handleSubmit, handleChange, values, touched, errors }) => (
                <Form  noValidate onSubmit={handleSubmit} className='membership-form'>
                    <Row>
                        <Col lg={12}>
                            <div className='membership-div'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-vcard-fill" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5M9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8m1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5m-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96q.04-.245.04-.5M7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0"/>
                            </svg>
                            <h6>Membership-Form</h6>
                            <p>Take Membership to become a member</p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} lg={6}>
                        <Form.Group controlId='fullnamegroup'>
                        <Form.Label>fullname</Form.Label>
                        <Form.Control 
                        type='text'
                        name="fullname"
                        value={values.fullname}
                        placeholder='enter...'
                        onChange={handleChange}
                        isValid={touched.fullname && !errors.fullname}
                        isInvalid={errors.fullname}
                        />
                        <Form.Control.Feedback type="valid">looks good</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.fullname}</Form.Control.Feedback>
                    </Form.Group>
                        </Col>
                      
                        <Col md={6}  lg={6}>
                        <Form.Group controlId='emailgroup'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                        type='text'
                        name="email"
                        value={values.email}
                        placeholder='example@gmil.com'
                        onChange={handleChange}
                        isValid={touched.email && !errors.email}
                        isInvalid={errors.email}
                        />
                        <Form.Control.Feedback type="valid">looks good</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                        </Col>
                    </Row> 
                    <Row>
                     
                        <Col md={4} lg={4}>
                        <Form.Group controlId='fphonenumbergroup'>
                        <Form.Label>Phonenumber</Form.Label>
                        <Form.Control 
                        type='text'
                        name="phonenumber"
                        placeholder='enter...'
                        value={values.phonenumber}
                        onChange={handleChange}
                        isValid={touched.phonenumber && !errors.phonenumber}
                        isInvalid={errors.phonenumber}
                        />
                        <Form.Control.Feedback type="valid">looks good</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.phonenumber}</Form.Control.Feedback>
                    </Form.Group>
                        </Col>
                        <Col md={4} lg={4}>
                        <Form.Group controlId='addressgroup'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control 
                        type='text'
                        placeholder='enter...'
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                        isValid={touched.address && !errors.address}
                        isInvalid={errors.address}
                        />
                        <Form.Control.Feedback type="valid">looks good</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                    </Form.Group>
                        </Col>
                        <Col md={4} lg={4}>
                        <Form.Group controlId='dategroup'>
                        <Form.Label>Date</Form.Label>
                        <Form.Control 
                        type='date'
                        name="date"
                        value={values.date}
                        onChange={handleChange}
                        isValid={touched.date && !errors.date}
                        isInvalid={errors.date}
                        />
                        <Form.Control.Feedback type="valid">looks good</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
                    </Form.Group>
                        </Col>
                    </Row> 
                    <Row>
                       
                        <Col md={6} lg={6}>
                        <Form.Group controlId='gendergroup'>
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
                        <Col md={6} lg={6}>
                        <Form.Group controlId='dateofbirthgroup'>
                        <Form.Label>Date-Of-Birth</Form.Label>
                        <Form.Control 
                        type='date'
                        name="dateofbirth"
                        value={values.dateofbirth}
                        onChange={handleChange}
                        isValid={touched.dateofbirth && !errors.dateofbirth}
                        isInvalid={errors.dateofbirth}
                        />
                        <Form.Control.Feedback type="valid">looks good</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.dateofbirth}</Form.Control.Feedback>
                    </Form.Group>
                        </Col>
                       
                    </Row> 
                    <Row>
                       
                       
                        <Col md={8} lg={8}>
                        <Form.Group controlId='membershiptypegroup'>
                        <Form.Label>MemberShiptype</Form.Label>
                        <div  className="mb-3">
                                  <Form.Check
                                    inline
                                    label="1-Month"
                                    name="membershiptype"
                                    type="radio"
                                    value='1-Month'
                                    onChange={handleChange}
                                  />
                                  <Form.Check
                                    inline
                                    label="5-Month"
                                    name="membershiptype"
                                    type="radio"
                                    value='5-Month'
                                    onChange={handleChange}
                                  /> 
                                  <Form.Check
                                    inline
                                    label="1-Year"
                                    name="membershiptype"
                                    type="radio"
                                    value='1-Year'
                                    onChange={handleChange}
                                  /> 
                                  
                                </div>
                    </Form.Group>
                        </Col>
                        <Col md={4}  lg={4}>
                        <Form.Group controlId='placegroup'>
                        <Form.Label>Place</Form.Label>
                        <Form.Control 
                        type='text'
                        name="place"
                        placeholder='enter...'
                        value={values.place}
                        onChange={handleChange}
                        isValid={touched.place && !errors.place}
                        isInvalid={errors.place}
                        />
                        <Form.Control.Feedback type="valid">looks good</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.place}</Form.Control.Feedback>
                    </Form.Group>
                        </Col>
                    </Row> 
                    
                    <Row>
                       
                        <Col md={6}  lg={6}>
                        <Form.Group controlId='imageroup'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control 
                        type='file'
                        name="file"
                        onChange={(e)=>handleImageChange(e,setFieldValue)}
                        isValid={touched.file && !errors.file}
                        isInvalid={errors.file}
                        />
                        <Form.Control.Feedback type="valid">looks good</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.file}</Form.Control.Feedback>
                    </Form.Group>
                        </Col>
                        <Col md={6}  lg={6}>
                        <Form.Group controlId='imageproofgroup'>
                        <Form.Label>Proof</Form.Label>
                        <Form.Control 
                        type='file'
                        name="imageproof"
                        onChange={(e)=>handleProofChange(e,setFieldValue)}
                        isValid={touched.imageproof && !errors.imageproof}
                        isInvalid={errors.imageproof}
                        />
                        <Form.Control.Feedback type="valid">looks good</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.imageproof}</Form.Control.Feedback>
                    </Form.Group>
                        </Col>
                    </Row> 
                    <Row>
                        <Col md={6} lg={6}> <Link to='/'><Button >Cancel</Button></Link></Col>
                        <Col md={6} lg={6}><Button type='submit'>Confirm</Button></Col>
                    </Row> 
                </Form>
      )}
      </Formik>
            </div>
            </Col>
            <Col lg={6} className='p-0'>
            <div className='membership-form-img'>
                <img src="/Humans/member.webp" alt="" />
            </div>
            </Col>
        </Row>
    </Container>
  )
}

export default UserMemberShip