import React from 'react'
import { Col, Container, Row ,Form, Button} from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sendAddedBook } from '../Redux/slice';

const AddBook = () => {

    const { Formik } = formik;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const schema = yup.object().shape({
        title:yup.string().required("please enter the title"),
        author:yup.string().required("please enter the author name"),
        genre:yup.string().required("please enter the genre"),
        publisher:yup.string().required("please enter the apublisher"),
        publicationyear:yup.date().required("please enter publicationyear"),
        totalcopies:yup.string().required("please enter the totalcopies"),
        shelflocationnumber:yup.string().required("please enter the shelfnumber"),
        bookstatus:yup.string().required("please enter the bookstatus"),
        category:yup.string().required("please enter the category"),
        bookimage:yup.mixed().required("please upload bookimage"),
        price:yup.string().required("please enter the price"),
        summary:yup.string().required("please enter the summary")
    })

    const addBook = async (data) => {
               
        const formData = new FormData();
        
        formData.append('title',data.title);
        formData.append('author',data.author);
        formData.append('genre',data.genre);
        formData.append('publisher',data.publisher);
        formData.append('publicationyear',data.publicationyear);
        formData.append('totalcopies',data.totalcopies);
        formData.append('shelflocationnumber',data.shelflocationnumber);
        formData.append('bookstatus',data.bookstatus);
        formData.append('category',data.category);
        formData.append('bookimage',data.bookimage);
        formData.append('price',data.price);
        formData.append('summary',data.summary);


        try {
            const res = await axios.post('http://localhost:2000/addbook',formData,{
                withCredentials:true
            })
            
            if(res.data.success){
                toast.success(res.data.message);
                dispatch(sendAddedBook(res.data.book))
                navigate('/allbooks')
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
        
    }

    const handleFileChange = (event,setFieldValue)=>{
        const file = event.target.files[0];
        setFieldValue("bookimage",file);
    }

    
  return (
    <Container fluid >
            <Row>
                <Col lg={12}  className='p-0'>
                   <div className='adddiv-form'>
                   <Formik
      validationSchema={schema}
      onSubmit={addBook}
      initialValues={{
        title: '',
        author: '',
        genre: '',
        publisher: '',
        publicationyear: '',
        totalcopies: '',
        shelflocationnumber:'',
        bookstatus:'',
        category:'',
        bookimage:null,
        price:'',
        summary:''
      }}
    >
             {({ setFieldValue,handleSubmit, handleChange, values, touched, errors }) => (
                   <Form className='add-form'  noValidate onSubmit={handleSubmit}> 
                    <Row>
                        <Col lg={12}>
                          <div className='addbook-head'>
                            <h3>A</h3>
                            <h4>
                                Add-Book
                            </h4>
                            </div>
                        </Col>
                    </Row>
                     <Row>
                        <Col md={4} lg={4}>
                        <Form.Group  className='mb-3' controlId='titlegroup'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                        type='text' 
                        placeholder='enter the title name'
                        name='title'
                        value={values.title}
                        onChange={handleChange}
                        isValid={touched.title && !errors.title}
                        isInvalid={errors.title}
                        />                                      
                        <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>{errors.title}</Form.Control.Feedback>
                      </Form.Group>
                        </Col>
                        <Col md={4} lg={4}>
                        <Form.Group controlId='authorgroup'>
                        <Form.Label>Author</Form.Label>
                        <Form.Control 
                        type='text' 
                        placeholder='enter the author name'
                        name='author'
                        value={values.author}
                        onChange={handleChange}
                        isValid={touched.author && !errors.author}
                        isInvalid={errors.author}
                        />
                         <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type='invalid'>{errors.author}</Form.Control.Feedback>
                      </Form.Group>
                        </Col>
                        <Col md={4} lg={4}>
                        <Form.Group controlId='genregroup'>
                        <Form.Label>Genre</Form.Label>
                        <Form.Control 
                        type='text' 
                        placeholder='enter the genre'
                        name='genre'
                        value={values.genre}
                        onChange={handleChange}
                        isValid={touched.genre && !errors.genre}
                        isInvalid={errors.genre}
                        />
                         <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type='invalid'>{errors.genre}</Form.Control.Feedback>
                      </Form.Group>
                        </Col>
                     </Row>
                     <Row>
                        <Col md={4} lg={4}>
                        <Form.Group className='mb-3' controlId='publishergroup'>
                        <Form.Label>Publisher</Form.Label>
                        <Form.Control 
                        type='text' 
                        placeholder='enter the publisher name'
                        name='publisher'
                        value={values.publisher}
                        onChange={handleChange}
                        isValid={touched.publisher && !errors.publisher}
                        isInvalid={errors.publisher}
                        />
                         <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type='invalid'>{errors.publisher}</Form.Control.Feedback>
                      </Form.Group>
                        </Col>
                        <Col md={4} lg={4}>
                        <Form.Group className='mb-3' controlId='publicationyeargroup'>
                        <Form.Label>Publication-Year</Form.Label>
                        <Form.Control 
                        type='date' 
                        placeholder='enter the publication year'
                        name='publicationyear'
                        value={values.publicationyear}
                        onChange={handleChange}
                        isValid={touched.publicationyear && !errors.publicationyear}
                        isInvalid={errors.publicationyear}
                        />
                         <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type='invalid'>{errors.publicationyear}</Form.Control.Feedback>
                      </Form.Group>
                        </Col>
                        <Col md={4} lg={4}>
                        <Form.Group className='mb-3' controlId='totalcopiesgroup'>
                        <Form.Label>Total-Copies</Form.Label>
                        <Form.Control 
                        type='number' 
                        placeholder='enter the total copies'
                        name='totalcopies'
                        value={values.totalcopies}
                        onChange={handleChange}
                        isValid={touched.totalcopies && !errors.totalcopies}
                        isInvalid={errors.totalcopies}
                        />
                         <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type='invalid'>{errors.totalcopies}</Form.Control.Feedback>
                      </Form.Group>
                        </Col>
                     </Row>
                     <Row>
                        
                        <Col md={4} lg={4}>
                        <Form.Group className='mb-3' controlId='shelflocationnumbergroup'>
                        <Form.Label>Shelf-Location-Number</Form.Label>
                        <Form.Control 
                        type='number' 
                        placeholder='enter the shelf location number'
                        name='shelflocationnumber'
                        value={values.shelflocationnumber}
                        onChange={handleChange}
                        isValid={touched.shelflocationnumber && !errors.shelflocationnumber}
                        isInvalid={errors.shelflocationnumber}
                        />
                         <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type='invalid'>{errors.shelflocationnumber}</Form.Control.Feedback>
                      </Form.Group>
                        </Col>
                        <Col md={4} lg={4}>
                        <Form.Group className='mb-3' controlId='bookstatusgroup'>
                        <Form.Label>Book-Status</Form.Label>
                        <Form.Select 
                        aria-label="Default select example"
                        name='bookstatus'
                        value={values.bookstatus} 
                        onChange={handleChange} 
                        >
                          <option   value='nothing'>Nothing</option>
                          <option   value='available'>Available</option>
                          <option   value='not-available'>Not Available</option>
                        </Form.Select>
                      </Form.Group>
                        </Col>
                        <Col md={4} lg={4}>
                        <Form.Group className='mb-3' controlId='categorygroup'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control 
                        type='text' 
                        placeholder='enter the category'
                        name='category'
                        value={values.category}
                        onChange={handleChange}
                        isValid={touched.category && !errors.category}
                        isInvalid={errors.category}
                        />
                         <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type='invalid'>{errors.category}</Form.Control.Feedback>
                      </Form.Group>
                        </Col>
                     </Row>
                     <Row>
                        
                        <Col md={4} lg={4}>
                        <Form.Group className='mb-3' controlId='bookimagegroup'>
                        <Form.Label>Book-Image</Form.Label>
                        <Form.Control 
                        type='file' 
                        name='bookimage'
                        onChange={(e)=>handleFileChange(e,setFieldValue)}
                        isValid={touched.bookimage && !errors.bookimage}
                        isInvalid={errors.bookimage}
                        />
                         <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type='invalid'>{errors.bookimage}</Form.Control.Feedback>
                      </Form.Group>
                        </Col>
                        <Col md={4} lg={4}>
                        <Form.Group className='mb-3' controlId='summarygroup'>
                        <Form.Label>Summary</Form.Label>
                        <Form.Control 
                        type='text' 
                        placeholder='enter the summary'
                        name='summary'
                        value={values.summary}
                        onChange={handleChange}
                        isValid={touched.summary && !errors.summary}
                        isInvalid={errors.summary}
                        />
                         <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type='invalid'>{errors.summary}</Form.Control.Feedback>
                      </Form.Group>
                        </Col>
                        <Col md={4} lg={4}>
                        <Form.Group className='mb-3' controlId='pricegroup'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control 
                        type='number' 
                        placeholder='enter the price'
                        name='price'
                        value={values.price}
                        onChange={handleChange}
                        isValid={touched.price && !errors.price}
                        isInvalid={errors.price}
                        />
                         <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                         <Form.Control.Feedback type='invalid'>{errors.price}</Form.Control.Feedback>
                      </Form.Group>
                        </Col>
                     </Row>
                    
                     <div className='add-btn'>
                     <Link to={'/allbooks'}><Button>Cancel</Button></Link><Button type='submit'>Submit</Button>
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

export default AddBook