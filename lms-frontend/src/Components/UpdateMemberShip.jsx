import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { memberShipExpired, memberShipUpdate } from '../Redux/slice';

const UpdateMemberShip = () => {


        const expiredMembers = async () =>{
    
            try {
             const res = await axios.get('http://localhost:2000/membershipexpiredmembers',{
                withCredentials:true
             })
     
             if(res.data.success){
                 toast.success(res.data.message);
                 dispatch(memberShipExpired(res.data.membershipExpiredUsers));
             }else{
                 toast.error(res.data.message);
             }
            } catch (error) {
                toast.error(error.message)
            }
     
         }
       
    const { Formik } = formik;
    const memberDetails = useSelector((state)=>state.books.memberDetails);
    const navigate  = useNavigate();    
    const dispatch = useDispatch();

    const schema = yup.object().shape({
        email: yup.string().required("enter your email"),
        registernumber: yup.string().required("enter your register number"),
        membershipstatus: yup.string().required(" enter your membership status"),
        duedate: yup.string().required("selet your duedate")
      });
    

      const updateMemberShipStatus = async (data) => {
                
        const details={
            id:memberDetails._id,
            registernumber:data.registernumber
        }
        
        try {
            const res = await axios.put(`http://localhost:2000/updatemembership/${memberDetails._id}`,{
                email:data.email,
                registernumber:data.registernumber,
                membershipstatus:data.membershipstatus,
                duedate:data.duedate
            },{
                withCredentials:true
            })

            if(res.data.success){
                toast.success(res.data.message);
                dispatch(memberShipUpdate(details));
                expiredMembers()
                navigate('/membershiprequest');
            }else{
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.success(error.message)
        }
            
      }

      

  return (
    <Container fluid className='padding-top'>
        <Row>
            <Col lg={12} className='p-0'>
                 <div className='member-div'>
                 <Formik
      validationSchema={schema}
      onSubmit={updateMemberShipStatus}
      initialValues={{
        email: memberDetails.email,
        registernumber: memberDetails.registrationnumber,
        membershipstatus: memberDetails.status,
        duedate: memberDetails.duedate,
      }}
    >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form className='member-update-form' noValidate onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={12}>
                            <div className='update-member-div'>
                                <h3>U <span>M</span></h3>
                                <h5>Update-Membership-Form</h5>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                type='text'
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                isValid={touched.email && !errors.email}
                                isInvalid={errors.email}
                                />
                                <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group>
                                <Form.Label>Register Number</Form.Label>
                                <Form.Control
                                type='number'
                                name="registernumber"
                                value={values.registernumber}
                                onChange={handleChange}
                                isValid={touched.registernumber && !errors.registernumber}
                                isInvalid={errors.registernumber}
                                 />
                                 <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                 <Form.Control.Feedback type='invalid'>{errors.registernumber}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                 
                    <Row>
                        <Col lg={6}>
                            <Form.Group>
                                <Form.Label>Membership Status</Form.Label>
                               <Form.Select 
                               name='membershipstatus'
                               onChange={handleChange}
                               value={values.membershipstatus}
                               >
                                <option value="approved">Approved</option>
                                <option value="pending">Pending</option>
                               </Form.Select>
                                <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type='invalid'>{errors.membershipstatus}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group>
                                <Form.Label>Due Date</Form.Label>
                                <Form.Control 
                                type='date'
                                name="duedate"
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
                  
                    <div className='update-member-btn'>
                        <Link to={'/membershiprequest'}><Button>Cancle</Button></Link><Button type='submit'>Submit</Button> 
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

export default UpdateMemberShip