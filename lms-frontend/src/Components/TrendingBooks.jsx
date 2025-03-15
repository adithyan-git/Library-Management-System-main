import {  Container, Row,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import {  sendBookId, sendMostBorrowedBooks } from '../Redux/slice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const TrendingBooks = () => {

    const mostBorrowedBooks = useSelector((state)=>state.books.mostBorrowedBooks);
    const dispatch = useDispatch();
    

    useEffect(()=>{
        const mostBorrowedBooks = async () => {
            try {
                const res = await axios.get('http://localhost:2000/mostborrowedbook')

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
    },[])

   
  return (
    <Container fluid>
        <Row>
            <Col sm={12} md={12} lg={12}>
                {
                    mostBorrowedBooks.length === 0 ? (null):(
                        <div className='treanding-head'>
                <h3>Trending Books</h3>
                </div>
                    )
                }
            </Col>
        </Row>
        <Row>
           {
            mostBorrowedBooks.map((book,index)=>(
                index <=5 ? (<Col sm={12}  md={6} lg={2} key={book._id}>
                    <div className='trend-img'>
                      <Link to={'/bookdetails'}>
                      <img src={`http://localhost:2000/${book.bookimage}`} alt=""  onClick={()=>dispatch(sendBookId(book.title))}/>
                      </Link>
                            <h6 >{book.title}</h6>
                    </div>
                </Col>):(null)
            ))
           }
        </Row>
    </Container>
  )
}

export default TrendingBooks