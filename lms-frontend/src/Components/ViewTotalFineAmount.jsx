import axios from 'axios';
import React, { useEffect } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { sendFineDetails, updateFineStatus } from '../Redux/slice';

const ViewTotalFineAmount = () => {

    const dispatch = useDispatch();
    const fineDetails = useSelector((state)=>state.books.fineDetails);
   const totalFineAmount =useSelector((state)=>state.books.totalFineAmount);

    
    useEffect(()=>{
        const totalFineAmount = async () => {
            try {
                const res = await axios.get('http://localhost:2000/viewtotalfineammount',{
                  withCredentials:true
                })
            if(res.data.success){
                // toast.success(res.data.message);
                dispatch(sendFineDetails(res.data.allFine))

            }else{
                toast.error(res.data.message);
            }
            } catch (error) {
                toast.error(error.message)
            }
        }
        totalFineAmount();
    },[dispatch])

    const showMessage = ()=>{
      toast('fine already recieved')
    }

    const reciveFine = async (fineId)=>{
        try {
          const res = await axios.put(`http://localhost:2000/finerecieved/${fineId}`,{
            withCredentials:true
          })

          if(res.data.success){
            toast.success(res.data.message);
            dispatch(updateFineStatus(fineId))

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
            <Col lg={12}  className='p-0'>
               {
                fineDetails.length === 0 ? (<div className='no-msg-div'><h1>No fine Details.....</h1></div>):( <div className='fine-div'>
                  <Table  className='fine-Table'>
        <thead>
          <tr>
            <th>No</th>
            <th>Fullname</th>
            <th>Email</th>
            <th>Bookname</th>
            <th>Borrowed Date</th>
            <th>Due Date</th>
            <th>Number Of <br/> OverDue Days  </th>
            <th>FinePerDay</th>
            <th>TotalFine <br />Amount</th>
            <th>Fine Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          
            {
              fineDetails.map((finedetail,index)=>(
                  <tr>
                      <td>{index + 1}</td>
                      <td>{finedetail.fullname}</td>
                      <td>{finedetail.email}</td>
                      <td>{finedetail.bookname}</td>
                      <td>{finedetail.borroweddate}</td>
                      <td>{finedetail.duedate}</td>
                      <td>{finedetail.numberofoverduedays}</td>
                      <td>{finedetail.fineperday}</td>
                      <td>{finedetail.totalfineamount}</td>
                      <td style={{color:finedetail.status.toLowerCase() === "recieved" ? "green" : 'red', fontWeight:'bold',fontSize:'11px' }}>{finedetail.totalfineamount === '0' ? ('no fine'):(finedetail.status)}</td>
                      <td >{finedetail.totalfineamount === '0' ? (null):(finedetail.status.toLowerCase() === "recieved" ?(<Button  variant="warning" onClick={()=>showMessage()} >Recieved</Button>):(<Button onClick={()=>reciveFine(finedetail._id) } variant='danger'>Recieve</Button>))}</td>
                  </tr>
              ))
            }
            <tr >
              <td colSpan={7}></td>
              <td className='total-fine'>TotalFineAmount</td>
              <td className='total-fine'> {totalFineAmount} rps</td>
              <td className='total-fine'></td>
              <td className='total-fine'></td>
            
            </tr>
          </tbody>
             </Table>
                  </div>)
               }
            </Col>
        </Row>
    </Container>
  )
}

export default ViewTotalFineAmount