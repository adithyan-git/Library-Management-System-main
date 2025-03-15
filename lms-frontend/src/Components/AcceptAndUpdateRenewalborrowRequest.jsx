import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { sendUpdatedRenewalRequest } from '../Redux/slice';

const AcceptAndUpdateRenewalborrowRequest = () => {

  const { Formik } = formik;
  const renewalEditDetails = useSelector((state)=>state.books.renewalEditDetails);
  console.log('renew==',renewalEditDetails);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    email: yup.string().required('enter the email'),
    registernumber: yup.string().required('enter the register number'),
    duedate: yup.string().required('enter the duedate'),
    extendingdate: yup.string().required('enter the extendingborrowdate'),
    status: yup.string().required('enter the status'),
  });

  const submitForm = async (data)=>{
    
    const details = {
      id:renewalEditDetails._id,
      status:data.status,
      renewalEditDetails:renewalEditDetails,
      data:data
    }
    try {
        const res = await axios.put(`http://localhost:2000/renewborrowingdateupdation/${renewalEditDetails._id}`,{
            email:data.email,
            registernumber:data.registernumber,
            duedate:data.duedate,
            extendingdate:data.extendingdate,
            status:data.status,
        },{
            withCredentials:true
        });

        if(res.data.success){
            toast.success(res.data.message);
            dispatch(sendUpdatedRenewalRequest(details));
            navigate('/viewrenewalrequests')
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

         <div className='renew-div'>
         <Formik
      validationSchema={schema}
      onSubmit={submitForm}
      initialValues={{
        email: renewalEditDetails.email,
        registernumber: renewalEditDetails.registernumber,
        duedate: renewalEditDetails.duedate,
        extendingdate: renewalEditDetails.extendingdate,
        status:renewalEditDetails.status,

      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit} className='renewalform'>
                <Row>
                  <Col lg={12}>
                    <div className='update-renew-head'>
                      <h3>U</h3>
                      <h5>Update-And-Accept-Form</h5>
                    </div>
                  </Col>
                </Row>
                  <Row>
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
                      <Form.Group  className='mb-3' controlId='registernumbergroup'>
                        <Form.Label>Registernumber</Form.Label>
                          <Form.Control 
                           type='text' 
                           placeholder='enter the registernumber'
                           name='registernumber'
                          value={values.registernumber}
                          onChange={handleChange}
                          isValid={touched.registernumber && !errors.registernumber}
                          isInvalid={errors.registernumber}
                         />                                      
                          <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                          <Form.Control.Feedback type='invalid'>{errors.registernumber}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group  className='mb-3' controlId='duedategroup'>
                        <Form.Label>Duedate</Form.Label>
                          <Form.Control 
                           type='date' 
                           placeholder='enter the duedate'
                           name='duedate'
                          value={values.duedate}
                          onChange={handleChange}
                          isValid={touched.duedate && !errors.duedate}
                          isInvalid={errors.duedate}
                         />                                      
                          <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                          <Form.Control.Feedback type='invalid'>{errors.duedate}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                 
                  <Row>
                     <Col lg={6}>
                      <Form.Group  className='mb-3' controlId='extendingborrowdategroup'>
                        <Form.Label>ExtendingBorrowdate</Form.Label>
                          <Form.Control 
                           type='date' 
                           placeholder='enter the extendingborrowdate'
                           name='extendingdate'
                          value={values.extendingdate}
                          onChange={handleChange}
                          isValid={touched.extendingdate && !errors.extendingdate}
                          isInvalid={errors.extendingdate}
                         />                                      
                          <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                          <Form.Control.Feedback type='invalid'>{errors.extendingdate}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col lg={6}>
                      <Form.Group  className='mb-3' controlId='statusgroup'>
                        <Form.Label>Status</Form.Label>
                          <Form.Select
                          name='status'
                          onChange={handleChange}
                          value={values.status}
                          > 
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                 
                  <div className='renewalform-btn'>
                    <Link to='/viewrenewalrequests'><Button>Cancel</Button></Link><Button type='submit'>Submit</Button>
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

export default AcceptAndUpdateRenewalborrowRequest