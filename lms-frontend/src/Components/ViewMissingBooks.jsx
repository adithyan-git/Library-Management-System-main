import axios from 'axios';
import React, { useEffect } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteMissingBooks, sendMissingBook } from '../Redux/slice';

const ViewMissingBooks = () => {

    const dispatch = useDispatch();
    const missingBooks = useSelector((state)=>state.books.missingBooks);


    useEffect(()=>{
        const missingBook = async () => {
            try {
                const res = await axios.get('http://localhost:2000/viewmissingbook',{
                    withCredentials:true
                })

                if(res.data.success){
                    toast.success(res.data.message);
                    dispatch(sendMissingBook(res.data.allMissingBook))
                }else{
                    toast.error(res.data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    
        missingBook()
    },[dispatch]);

    const deleteMissingBook = async (bookId) =>{
        try {
            const res = await axios.delete(`http://localhost:2000/deletemissingbook/${bookId}`,{
                withCredentials:true
            });

            if(res.data.message){
                toast.success(res.data.message);
                dispatch(deleteMissingBooks(bookId))
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
  return (
    <Container fluid className='padding-top'>
        <Row>
            <Col lg={12} className='p-0'>
                {
                    missingBooks.length === 0 ? (<div className='no-msg-div'><h1>No Missing Books....</h1></div>):(<div className='missing-book-div'>
                        <Table   className='missing-table'>
                    <thead> 
                        <tr>
                        <th>No</th>
                        <th>Bookname</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Number OF  Missing Copies</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                        missingBooks.map((missingBook,index)=>(
                            <tr key={missingBook._id}>
                                <td>{index + 1}</td>
                                <td>{missingBook.bookname}</td>
                                <td>{missingBook.author}</td>
                                <td>{missingBook.price}</td>
                                <td>{missingBook.numberofmissingcopies}</td>
                                <td><Button onClick={()=>deleteMissingBook(missingBook._id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                </svg></Button></td>
                            </tr>
                        ))
                       }
                        </tbody>
                    </Table>
                        </div>)
                }
            </Col>
        </Row>
    </Container>
  )
}

export default ViewMissingBooks