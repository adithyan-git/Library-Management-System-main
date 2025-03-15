import axios from 'axios'
import React, { useEffect } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { sendMostBorrowedBooks } from '../Redux/slice'

const MostBorrowedBooks = () => {

    const dispatch = useDispatch();
    const mostBorrowedBooks = useSelector((state)=>state.books.mostBorrowedBooks);


    useEffect(()=>{
        const mostBorrowedBooks = async () => {
            try {
                const res = await axios.get('http://localhost:2000/mostborrowedbook',{
                    withCredentials:true
                })

                if(res.data.success){
                    // toast.success(res.data.message);
                    dispatch(sendMostBorrowedBooks(res.data.mostBorrowedBooks))
                }else{
                    toast.error(res.data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    
        mostBorrowedBooks()
    },[dispatch])

  return (
    <Container fluid className='padding-top'>
        <Row>
            <Col lg={12}>
                <div className='most-borrow-div'>
                <Table  className='mostborrow-table'>
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
                mostBorrowedBooks.map((mostborrowedbook,index)=>(
                    <tr key={mostborrowedbook._id}>
                        <td>{index + 1}</td>
                        <td>{mostborrowedbook.title}</td>
                        <td><img src={`http://localhost:2000/${mostborrowedbook.bookimage}`} alt="" /></td>
                        <td>{mostborrowedbook.author}</td>
                        <td>{mostborrowedbook.genre}</td>
                        <td>{mostborrowedbook.publisher}</td>
                        <td>{mostborrowedbook.borrowcount}</td>
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

export default MostBorrowedBooks