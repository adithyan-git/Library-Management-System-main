import axios from 'axios';
import React, { useEffect } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { sendMostReservedBooks } from '../Redux/slice';

const ViewMostReservedBook = () => {

    const dispatch = useDispatch();
    const mostResevedBooks = useSelector((state)=>state.books.mostReservedBooks);


    useEffect(()=>{
        const mostReservedBooks = async () => {
            try {
                const res = await axios.get('http://localhost:2000/mostreservedbook',{
                    withCredentials:true
                })

                if(res.data.success){
                    // toast.success(res.data.message);
                    dispatch(sendMostReservedBooks(res.data.mostReservedBook))
                }else{
                    toast.error(res.data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    
        mostReservedBooks()
    },[dispatch])
  return (
    <Container fluid className='padding-top'>
        <Row>
            <Col lg={12} >
            <div className='most-reserved-div'>
            <Table   className='reserved-table'>
            <thead> 
                <tr>
                <th>No</th>
                <th>Bookname</th>
                <th>Image</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Publisher</th>
                <th>ReserveCount</th>
                </tr>
            </thead>
            <tbody>
               {
                mostResevedBooks.map((mostreservedbook,index)=>(
                    <tr key={mostreservedbook._id}>
                        <td>{index + 1}</td>
                        <td>{mostreservedbook.title}</td>
                        <td><img src={`http://localhost:2000/${mostreservedbook.bookimage}`} alt="" /></td>
                        <td>{mostreservedbook.author}</td>
                        <td>{mostreservedbook.genre}</td>
                        <td>{mostreservedbook.publisher}</td>
                        <td>{mostreservedbook.reservedcount}</td>
                    </tr>
                ))
               }
                </tbody>
            </Table>
            </div>
            </Col>
        </Row>
    </Container>
  )
}

export default ViewMostReservedBook