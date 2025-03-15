import axios from 'axios'
import {  Card, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {  deleteWishlistbook, sendBookId } from '../Redux/slice'
import { Link } from 'react-router-dom'

const ViewWishlistItems = () => {

    const dispatch = useDispatch();
    const wishlistBooks = useSelector((state)=>state.books.wishlistBooks);

    const deleteWishlistItem = async (book) =>{
        
        try {
            const res = await axios.delete( `http://localhost:2000/deletewishlistitem/${book.title}`,{
                withCredentials:true
            })
            if(res.data.success){
                toast.success(res.data.message);
                dispatch(deleteWishlistbook(book))
                // dispatch(changeSearchBookColorReverse(book._id))
                     
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
           {
            wishlistBooks.map((book)=>(
                <Col sm={12} md={4} lg={2}  key={book._id}>
                <div className='wishlist-card'>
                <Card style={{ width: '18rem' }}>
                    <Link to={'/bookdetails'}>
                    <Card.Img variant="top" src={`http://localhost:2000/${book.bookimage}`}  onClick={()=>dispatch(sendBookId(book.title))}/>
                    </Link>
                <span className='wish-delete' onClick={()=>deleteWishlistItem(book)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
</svg></span>
                <Card.Body>
                    <Card.Title><h5>{book.title}</h5></Card.Title>
                    <Card.Text>
                       <h6><p>Autor</p><span>{book.author}</span></h6>
                       <h6><p>Genre</p><span>{book.genre}</span></h6>
                    </Card.Text>
                </Card.Body>
                </Card>
                </div>
                
            </Col>
            ))
           }
        </Row>
    </Container>
  )
}

export default ViewWishlistItems