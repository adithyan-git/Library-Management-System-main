import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const SendNewBookRequest = () => {

   const { Formik } = formik;
   const navigate = useNavigate();

  const schema = yup.object().shape({
    librarianName: yup.string().required('enter the library name'),
    bookName: yup.string().required('enter the bookname'),
    author: yup.string().required('enter the author name'),
    howmanyCopies: yup.string().required('enter the nnumber of copies'),
    date: yup.string().required('choose the date'),
  });

  const submitForm = async (data) =>{
        try {
            const res = await axios.post('http://localhost:2000/sendnewbookrequest',{
                librarianName:data.librarianName,
                bookName:data.bookName,
                author:data.author,
                howmanyCopies:data.howmanyCopies,
                date:data.date
            },{
                withCredentials:true
            });

            if(res.data.success){
                toast.success(res.data.message);
                navigate('/')
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
  }

  return (
    <Container fluid className='padding-top'>
        <Row>
            <Col lg={12} className='p-0'>
               <div className='sendrequest-div'>
               <Formik
      validationSchema={schema}
      onSubmit={submitForm}
      initialValues={{
        librarianName: '',
        bookName: '',
        author: '',
        howmanyCopies: '',
        date: '',
      }}
    >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form  noValidate onSubmit={handleSubmit} className='newbookRequest-form'>
                    <Row>
                        <Col lg={12}>
                            <div className='newbook-request-div'>
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-square-dots-fill" viewBox="0 0 16 16">
                                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                                    </svg></span>
                                <h5>Send-NewBook-Request-Form</h5>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md={4} lg={4} controlId="validationFormik01">
                        <Form.Label>Librarian Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="librarianName"
                            value={values.librarianName}
                            placeholder='enter the librarian name'
                            onChange={handleChange}
                            isValid={touched.librarianName && !errors.librarianName}
                            isInvalid={errors.librarianName}
                        />
                        <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>{errors.librarianName}</Form.Control.Feedback>

                        </Form.Group>
                        <Form.Group as={Col} md={4} lg={4} controlId="validationFormik01">
                        <Form.Label>BookName</Form.Label>
                        <Form.Control
                            type="text"
                            name="bookName"
                            value={values.bookName}
                            placeholder='enter the book name'
                            onChange={handleChange}
                            isValid={touched.bookName && !errors.bookName}
                            isInvalid={errors.bookName}

                        />
                            <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>{errors.bookName}</Form.Control.Feedback>
                       </Form.Group>
                       <Form.Group as={Col} md={4} lg={4} controlId="validationFormik01">
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            type="text"
                            name="author"
                            value={values.author}
                            placeholder='enter the author name'
                            onChange={handleChange}
                            isValid={touched.author && !errors.author}
                            isInvalid={errors.author}

                        />
                        <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>{errors.author}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={6} lg={6} controlId="validationFormik01">
                        <Form.Label>HowmanyCopies</Form.Label>
                        <Form.Control
                            type="number"
                            name="howmanyCopies"
                            value={values.howmanyCopies}
                            placeholder='enter the number of copies'
                            onChange={handleChange}
                            isValid={touched.howmanyCopies && !errors.howmanyCopies}
                            isInvalid={errors.howmanyCopies}

                        />
                        <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>{errors.howmanyCopies}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={6} lg={6} controlId="validationFormik01">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="date"
                            value={values.date}
                            onChange={handleChange}
                            isValid={touched.date && !errors.date}
                            isInvalid={errors.date}
                        />
                        <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>{errors.date}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    
                    <div className='newbookrequest-btn'>
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

export default SendNewBookRequest