import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const OrderNewBooks = () => {

    const { Formik } = formik;
    const navigate = useNavigate();

    const schema = yup.object().shape({
        libraryname: yup.string().required("enter your library name"),
        fullname: yup.string().required("enter the your fullname"),
        address: yup.string().required("enter the your address"),
        place: yup.string().required("enter your place"),
        phonenumber: yup.string().required("enter your phonenumber"),
        email: yup.string().required("enter the reciever's email"),
        subject: yup.string().required("enter the subject "),
        bookname:yup.string().required("enter book names"),
      });
     
      const submitForm = async (data) => {
        try {
          const res = await axios.post('http://localhost:2000/orderbook',{
            libraryname: data.libraryname,
            fullname:data.fullname,
            address: data.address,
            place: data.place,
            phonenumber:data.phonenumber,
            email: data.email,
            subject: data.subject,
            bookname:data.bookname
          },{
            withCredentials:true
          })

          if(res.data.message){
            toast.success(res.data.message);
            navigate('/')
          }else{
            toast.error(res.data.message)
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
      
  return (
    <Container fluid className='padding-top '>
        <Row>
            <Col lg={12} className='p-0'>
              <div className='order-form-div'>

              <Formik
      validationSchema={schema}
      onSubmit={submitForm}
      initialValues={{
        libraryname: '',
        fullname: '',
        address: '',
        place: '',
        phonenumber:'',
        email: '',
        subject: '',
        bookname:''
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit} className='order-form'>
            <Row>
                <Col lg={12}>
                    <div className='order-head'>
                      <h3>O</h3>
                        <h5>Order - Form</h5>
                    </div>
                </Col>
            </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="librarynamegroup">
              <Form.Label>Libraryname</Form.Label>
              <Form.Control
                type="text"
                name="libraryname"
                value={values.libraryname}
                placeholder='enter your libraryname'
                onChange={handleChange}
                isValid={touched.libraryname && !errors.libraryname}
                isInvalid={errors.libraryname}
              />
              <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>{errors.libraryname}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="fullnamegroup">
              <Form.Label>Fullname</Form.Label>
              <Form.Control
                type="text"
                name="fullname"
                value={values.fullname}
                placeholder='enter your fullname'
                onChange={handleChange}
                isValid={touched.fullname && !errors.fullname}
                isInvalid={errors.fullname}
              />
              <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>{errors.fullname}</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="addressgroup">
              <Form.Label>address</Form.Label>
              <Form.Control
                type="text"
                placeholder="eneter your address"
                name="address"
                value={values.address}
                onChange={handleChange}
                isValid={touched.address && !errors.address}
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>{errors.address}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="placegroup">
              <Form.Label>Place</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter your place"
                name="place"
                value={values.place}
                onChange={handleChange}
                isValid={touched.place && !errors.place}
                isInvalid={!!errors.place}
              />
              <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>{errors.place}</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="phonenumbergroup">
              <Form.Label>Phonenumber</Form.Label>
              <Form.Control
                type="text"
                placeholder=" enter your phonenumber"
                name="phonenumber"
                value={values.phonenumber}
                onChange={handleChange}
                isValid={touched.phonenumber && !errors.phonenumber}
                isInvalid={!!errors.phonenumber}
              />
              <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>{errors.phonenumber}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="emailgroup">
              <Form.Label>Reciever Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="enter the reciever's email"
                name="email"
                value={values.email}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="subjectgroup">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter the subject"
                name="subject"
                value={values.subject}
                onChange={handleChange}
                isValid={touched.subject && !errors.subject}
                isInvalid={!!errors.subject}
              />
              <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>{errors.subject}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="booknamegroup">
              <Form.Label>Bookname</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter the booknames"
                name="bookname"
                value={values.bookname}
                onChange={handleChange}
                isValid={touched.bookname && !errors.bookname}
                isInvalid={!!errors.bookname}
              />
              <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>{errors.bookname}</Form.Control.Feedback>
            </Form.Group>
          </Row>
        
            <div className='order-btn'>
                <Link to='/'><Button>Cancel</Button></Link> <Button type="submit">Submit</Button>
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

export default OrderNewBooks