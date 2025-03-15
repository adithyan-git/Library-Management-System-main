import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Registrations = () => {

    const { Formik } = formik;
    const navigate = useNavigate();

   
         
       
       
        

     

 
   
      const userSchema = yup.object().shape({
        fullname: yup.string().required("enter the fullname"),
        email: yup.string().required("enter the email"),
        password: yup.string().required("enter the password").min(5,'password must want minimum 5 charecters').max(10,"password maximum contain atleast 8 charecters"),
        dateofbirth: yup.string().required("enter the dateofbirth"),
        place: yup.string().required("enter the place"),
        address: yup.string().required("enter the address"),
        gender: yup.string().required("select the gender"),
        phonenumber: yup.string().required("enter the phonenumber"),
        profileimage:yup.mixed().required("upload a image")
      });

       
     
        const  userRegister = async (data) => {
            
            const formData = new FormData();

            formData.append("fullname",data.fullname);
            formData.append("email",data.email);
            formData.append("password",data.password);
            formData.append("dateofbirth",data.dateofbirth);
            formData.append("place",data.place);
            formData.append("address",data.address);
            formData.append("gender",data.gender);
            formData.append("phonenumber",data.phonenumber);
            formData.append("profileimage",data.profileimage);
            try {
                const res = await axios.post('http://localhost:2000/userregister',formData,{withCredentials:true});
                
                if(res.data.success){
                    toast.success(res.data.message);
                    navigate("/adminlogin");

                }else{
                    toast.error(res.data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }

  
      
        const handleProfileChange = (event,setFieldValue)=>{
            const profileImage = event.target.files[0];
            setFieldValue("profileimage",profileImage);
        }

  return (
    <Container fluid className='padding-top'>
        <Row>
            <Col lg={6} className='mx-auto my-5'>
          
          
        
         
                 <Formik
      validationSchema={userSchema}
      onSubmit={userRegister}
      initialValues={{
        fullname: '',
        email: '',
        password: '',
        dateofbirth: '',
        place:'',
        address: '',
        gender: '',
        phonenumber:'',
        profileimage:null
      }}
    >
      {({setFieldValue,handleSubmit, handleChange, values, touched, errors }) => (
                <Form  noValidate onSubmit={handleSubmit} className='admin-register-form'>
                     <div className='register-head'>
                <h4>
                    Sign-Up Form
                </h4>
            </div>
            
            <div className='register-icon'> 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-lock2-fill" viewBox="0 0 16 16">
            <path d="M7 6a1 1 0 0 1 2 0v1H7z"/>
            <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-2 6v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V8.3c0-.627.46-1.058 1-1.224V6a2 2 0 1 1 4 0"/>
            </svg>
            </div>
                    <Row>
                        <Col lg={6}>
                        <Form.Group controlId='fullnamegroup'>
                        <Form.Label>fullname</Form.Label>
                        <Form.Control 
                        type='text'
                        name="fullname"
                        value={values.fullname}
                        onChange={handleChange}
                        isValid={touched.fullname && !errors.fullname}
                        isInvalid={errors.fullname}
                        />
                        <Form.Control.Feedback type="valid">looks good</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.fullname}</Form.Control.Feedback>
                    </Form.Group>
                        </Col>
                     
                        <Col lg={6}>
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
                        <Form.Control.Feedback type="valid">looks good</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        
                        <Col lg={4}>
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
                        <Form.Control.Feedback type="valid">looks good</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>
                        </Col>
                        <Col lg={4}>
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
                        <Col lg={4}>
                        <Form.Group controlId='placegroup'>
                        <Form.Label>Place</Form.Label>
                        <Form.Control 
                        type='text'
                        name="place"
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
                        <Col lg={6}>
                        <Form.Group controlId='addressgroup'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control 
                        type='text'
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
                        <Col lg={6}>
                           <Form.Group controlId='radiogroup'>
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
                    </Row>
                 
                    <Row>
                        <Col lg={6}>
                        <Form.Group controlId='phonenumbergroup'>
                        <Form.Label>phonenumber</Form.Label>
                        <Form.Control 
                        type='text'
                        name="phonenumber"
                        value={values.phonenumber}
                        onChange={handleChange}
                        isValid={touched.phonenumber && !errors.phonenumber}
                        isInvalid={errors.phonenumber}
                        />
                        <Form.Control.Feedback type="valid">looks good</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.phonenumber}</Form.Control.Feedback>
                    </Form.Group>
                        </Col>
                        <Col lg={6}>
                        <Form.Group controlId='imagegroup'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control 
                        type='file'
                        name="profileimage"
                        onChange={(e)=>handleProfileChange(e,setFieldValue)}
                        isValid={touched.profileimage && !errors.profileimage}
                        isInvalid={errors.profileimage}
                        />
                        <Form.Control.Feedback type="valid">looks good</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.profileimage}</Form.Control.Feedback>
                    </Form.Group>
                        </Col>
                    </Row>
                    <div className='admin-register-btn'>
                    <Link to='/'><Button>Cancel</Button></Link><Button type='submit'>Sign-Up</Button>
                    </div>
                    <div className='link-sign-in-div'><Link to='/adminlogin'><p>Sign-In...?</p></Link></div>

                </Form>
      )}
            </Formik>
            </Col>
        </Row>
    </Container>
  )
}

export default Registrations