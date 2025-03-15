import axios from 'axios';
import React, { useEffect } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { sendUnusedBooks } from '../Redux/slice';

const ViewUnusedBooks = () => {

    const dispatch = useDispatch();
    const unUsedBooks = useSelector((state)=>state.books.unUsedBooks);

    useEffect(()=>{
        const unusedBooks = async () => {
            try {
                const res = await axios.get('http://localhost:2000/unusedbook',{
                    withCredentials:true
                })

                if(res.data.success){
                    // toast.success(res.data.message);
                    dispatch(sendUnusedBooks(res.data.unusedBook))
                }else{
                    toast.error(res.data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    
        unusedBooks()
    },[dispatch])
  return (
    <Container fluid className='padding-top'>
        <Row>
            <Col lg={12} >
                <div className='unused-div'>
                <Table   className='unusedbook-table' >
            <thead> 
                <tr>
                <th>No</th>
                <th>Bookname</th>
                <th>Image</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Publisher</th>
                <th>BorrowCount</th>
                </tr>
            </thead>
            <tbody>
               {
                unUsedBooks.map((unUsedBook,index)=>(
                    <tr key={unUsedBook._id}>
                        <td>{index + 1}</td>
                        <td>{unUsedBook.title}</td>
                        <td><img src={`http://localhost:2000/${unUsedBook.bookimage}`} alt="" /></td>
                        <td>{unUsedBook.author}</td>
                        <td>{unUsedBook.genre}</td>
                        <td>{unUsedBook.publisher}</td>
                        <td>{unUsedBook.borrowcount}</td>
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

export default ViewUnusedBooks