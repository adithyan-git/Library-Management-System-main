import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { sendLoginDetails } from '../Redux/slice';
import { useDispatch } from 'react-redux';

const AdminLogin = () => {

    const { Formik } = formik;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userSchema = yup.object().shape({
      email: yup.string().required("enter the email"),
      password: yup.string().required("enter the password"),
    });

   
    const userLogin = async (data) =>{
        
      try {
        const res = await axios.post('http://localhost:2000/userlogin',{
          email:data.email,
          password:data.password  
        },{
          withCredentials:true
        })          
        if(res.data.success){
          toast.success(res.data.message);
          dispatch(sendLoginDetails(res.data.loggedinPerson))
          navigate('/');

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
            <Col lg={4} className='mx-auto my-5 '>
            <Formik
      validationSchema={userSchema}
      onSubmit={userLogin}
      initialValues={{
        email: '',
        password: '',
      }}
    >
                 {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form className='login-form' noValidate onSubmit={handleSubmit}>
                   <div className='login2-sign-in'>
                <h4>Sign-In</h4>
              </div>
              <div className='login2-icon'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shield-lock-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.8 11.8 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7 7 0 0 0 1.048-.625 11.8 11.8 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 63 63 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5"/>
                </svg>
            </div>
                    <Row>
                   <Form.Group controlId='emailgroup'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                        type='text'
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        isValid={touched.email && !errors.email}
                        isInvalid={errors.email}
                        />
                        <Form.Control.Feedback  type='valid'>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                    </Row>
                    <Row>
                <Form.Group controlId='passwordgroup'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type='password'
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isValid={touched.password && !errors.password}
                        isInvalid={errors.password}
                        />
                        <Form.Control.Feedback type='valid' >Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                    </Form.Group>
                    </Row>
                    <div className='login2-btn'>
                      <Link to='/'><Button>Cancel</Button></Link>
                      <Button type='submit'>Sign In</Button>
                      </div>
                </Form>
                 )}
            </Formik>
            
            
            </Col>
        </Row>
    </Container>
  )
}

export default AdminLogin