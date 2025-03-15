import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import {  useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const ReserveBooks = () => {

    const { Formik } = formik;
    const   bookDetails  = useSelector((state)=>state.books.bookDetails);
      const loginDetails = useSelector((state)=>state.books.loginDetails);
      const userProfileDetails = useSelector((state)=>state.books.userProfileDetails);
      const userMembership = useSelector((state)=>state.books.userMembership);
      const navigate = useNavigate();

  const schema = yup.object().shape({
    fullname: yup.string().required(),
    email: yup.string().required(),
    address: yup.string().required(),
    place: yup.string().required(),
    registernumber: yup.string().required(),
    bookname: yup.string().required(),
    reserveddate: yup.string().required(),
  });

  const submitForm = async (data) =>{
    
        try {
            const res = await axios.post('http://localhost:2000/reservebooks',{
                fullname: data.fullname,
                email:data.email,
                address: data.address,
                place:data.place,
                registernumber: data.registernumber,
                bookname:data.bookname,
                reserveddate:data.reserveddate,
            },{
                withCredentials:true
            });

            if(res.data.success){
                toast.success(res.data.message);
                navigate('/reservebooksdetails')
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
            <Col lg={6} className='p-0 '>
                <div className='reserve-img-div'>
                    <img src="/Images/reserveimage.webp" alt="" />
                </div>
            </Col>
            <Col lg={6} className='p-0'>

            <div className='main-reserve-div'>
            <Formik
      validationSchema={schema}
      onSubmit={submitForm}
      initialValues={{
        fullname: (loginDetails.role === 'user' ? loginDetails.fullname :null|| userProfileDetails.fullname),
        email: (loginDetails.role === 'user' ? loginDetails.email :null || userProfileDetails.email),
        address: (loginDetails.address || userProfileDetails.address),
        place: (loginDetails.place || userProfileDetails.place),
        registernumber: userMembership.registernumber,
        bookname:bookDetails.title,
        reserveddate: '',
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form  noValidate onSubmit={handleSubmit} className='reserve-form'>
                    <Row>
                                            <Col lg={12}>
                                                <div className='reserve-head'>
                                                    <h6>R</h6>
                                                    <h5>
                                                        Reserve-Form
                                                    </h5>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6} lg={6}>
                                            <Form.Group controlId='fulllname'>
                                                <Form.Label>Fullname</Form.Label>
                                                <Form.Control 
                                                type='text'
                                                name='fullname'
                                                placeholder='enter the name'
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
                                            <Form.Group controlId='email'>
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control 
                                                type='text'
                                                name='email'
                                                placeholder='email.....'
                                                value={values.email}
                                                onChange={handleChange}
                                                isValid={touched.email && !errors.email}
                                                isInvalid={errors.email}
                                                />
                                                <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                                <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                                            </Form.Group>
                                            </Col>
                                            <Col md={4} lg={4}>
                                            <Form.Group controlId='address'>
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control 
                                                type='text'
                                                name='address'
                                                placeholder='address....'
                                                value={values.address}
                                                onChange={handleChange}
                                                isValid={touched.address && !errors.address}
                                                isInvalid={errors.address}
                                                />
                                                <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                                <Form.Control.Feedback type='invalid'>{errors.address}</Form.Control.Feedback>
                                            </Form.Group>
                                            </Col>
                                            <Col md={4} lg={4}>
                                            <Form.Group controlId='place'>
                                                <Form.Label>Place</Form.Label>
                                                <Form.Control 
                                                type='text'
                                                name='place'
                                                placeholder='place....'
                                                value={values.place}
                                                onChange={handleChange}
                                                isValid={touched.place && !errors.place}
                                                isInvalid={errors.place}
                                                />
                                                <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                                <Form.Control.Feedback type='invalid'>{errors.fullname}</Form.Control.Feedback>
                                            </Form.Group>
                                            </Col>
                                            <Col md={4} lg={4}>
                                            <Form.Group controlId='registernumber'>
                                                <Form.Label>Registernumber</Form.Label>
                                                <Form.Control 
                                                type='text'
                                                name='registernumber'
                                                placeholder='registernumber'
                                                value={values.registernumber}
                                                onChange={handleChange}
                                                isValid={touched.registernumber && !errors.registernumber}
                                                isInvalid={errors.registernumber}
                                                />
                                                <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                                <Form.Control.Feedback type='invalid'>{errors.registernumber}</Form.Control.Feedback>
                                            </Form.Group>
                                            </Col>
                                            <Col md={6} lg={6}>
                                            <Form.Group controlId='bookname'>
                                                <Form.Label>Bookname</Form.Label>
                                                <Form.Control 
                                                type='text'
                                                name='bookname'
                                                placeholder='bookname....'
                                                value={values.bookname}
                                                onChange={handleChange}
                                                isValid={touched.bookname && !errors.bookname}
                                                isInvalid={errors.bookname}
                                                />
                                                <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                                <Form.Control.Feedback type='invalid'>{errors.bookname}</Form.Control.Feedback>
                                            </Form.Group>
                                            </Col>
                                            <Col md={6} lg={6}>
                                            <Form.Group controlId='reserveddate'>
                                                <Form.Label>Reserveddate</Form.Label>
                                                <Form.Control 
                                                type='date'
                                                name='reserveddate'
                                                value={values.reserveddate}
                                                onChange={handleChange}
                                                isValid={touched.reserveddate && !errors.reserveddate}
                                                isInvalid={errors.reserveddate}
                                                />
                                                <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                                <Form.Control.Feedback type='invalid'>{errors.reserveddate}</Form.Control.Feedback>
                                            </Form.Group>
                                            </Col>
                                        </Row>
                                        <div className='reserve-btn'>
                                            <Link to={'/userallbooks'}><Button>Cancel</Button></Link><Button type='submit'>Confirm</Button>
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

export default ReserveBooks