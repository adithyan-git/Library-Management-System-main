import React from 'react'
import { Col, Container, Row ,Form, Button} from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { sendUpdatedBookValue } from '../Redux/slice';

const EditBook = () => {

    const { Formik } = formik;
    const editInitialValues = useSelector((state)=>state.books.editInitialValues);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

        const schema = yup.object().shape({
            title:yup.string().required("please enter the title"),
            author:yup.string().required("please enter the author name"),
            genre:yup.string().required("please enter the author name"),
            publisher:yup.string().required("please enter the author name"),
            publicationyear:yup.date().required("please enter the author name"),
            totalcopies:yup.string().required("please enter the author name"),
            shelflocationnumber:yup.string().required("please enter the author name"),
            bookstatus:yup.string().required("please enter the author name"),
            category:yup.string().required("please enter the author name"),
            price:yup.string().required("please enter the author name"),
            summary:yup.string().required("please enter the author name")
        })

        
        const bookUpdation = async (data) => {
            

           try {
            const res = await axios.put(`http://localhost:2000/editbook/${editInitialValues._id}`,{
               title: data.title,
               author: data.author,
               genre: data.genre,
               publisher: data.publisher,
               publicationyear: data.publicationyear,
               totalcopies: data.totalcopies,
               shelflocationnumber:data.shelflocationnumber,
               bookstatus:data.bookstatus,
               category:data.category,
               price:data.price,
               summary:data.summary
            },{
               withCredentials:true
              })
   
              if(res.data.success){
                toast.success(res.data.message);
                dispatch(sendUpdatedBookValue(res.data.findedBook,editInitialValues._id))
                navigate('/allbooks')
              }else{
               toast.error(res.data.message)
              }
           } catch (error) {
              toast.error(error.message)
           }
        }

   //      const handleFileChange = (event,setFieldValue)=>{
   //       const file = event.target.files[0]
   //       setFieldValue("bookimage",file);
   //   }

  return (
    <Container fluid >
    <Row>
        <Col lg={12} className='p-0'>
               <div className='edit-div'>
               <Formik
                  validationSchema={schema}
                  onSubmit={bookUpdation}
                  initialValues={{
                  title: editInitialValues.title,
                  author: editInitialValues.author,
                  genre: editInitialValues.genre,
                  publisher: editInitialValues.publisher,
                  publicationyear: editInitialValues.publicationyear,
                  totalcopies: editInitialValues.totalcopies,
                  shelflocationnumber:editInitialValues.shelflocationnumber,
                  bookstatus:editInitialValues.bookstatus,
                  category:editInitialValues.category,
                  price:editInitialValues.price,
                  summary:editInitialValues.summary
                  }}
                  >
     {({ handleSubmit, handleChange, values, touched, errors }) => (
           <Form className='add-form'  noValidate onSubmit={handleSubmit}> 
            <Row>
                <Col lg={12}>
                  <div className='addbook-head'>
                     <h3>E</h3>
                    <h4>
                        Edit-Book
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
                <Col md={4}   lg={4}>
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
                <Col md={4}  lg={4}>
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
                <Col md={4}  lg={4}>
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
                <Col md={4}  lg={4}>
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
                <Col md={4}  lg={4}>
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
               
                <Col md={4}  lg={4}>
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
                <Col md={4}  lg={4}>
                <Form.Group className='mb-3' controlId='bookstatusgroup'>
                <Form.Label>Book-Status</Form.Label>
                <Form.Select
                name='bookstatus'
                onChange={handleChange}
                values={values.bookstatus}
                > <option value='nothing'>Nothing</option>
                  <option value='available'>Available</option>
                  <option value='not-available'>Not Available</option>

                </Form.Select>
                 <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                 <Form.Control.Feedback type='invalid'>{errors.bookstatus}</Form.Control.Feedback>
              </Form.Group>
                </Col>
                <Col md={4}  lg={4}>
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
                <Col md={6}  lg={6}>
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
                <Col md={6} lg={6}>
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

export default EditBook