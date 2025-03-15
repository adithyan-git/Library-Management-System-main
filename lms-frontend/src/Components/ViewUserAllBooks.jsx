import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addtolist, changeColorState, changeIconColor, deleteWishlistbook, displayAllbooks, sendBookId } from '../Redux/slice';
import axios from 'axios';
import { toast } from 'react-toastify';

const ViewUserAllBooks = () => {

    const allBooks = useSelector((state)=>state.books.allBooks);
    const loginDetails = useSelector((state)=>state.books.loginDetails);


    const dispatch = useDispatch();

    const addtoWishlist = async (bookDetails)=>{

      try {
        const res = await axios.post('http://localhost:2000/wishlist',{
          bookname:bookDetails.title,
          bookimage:bookDetails.bookimage,
          author:bookDetails.author,
          genre:bookDetails.genre,
          publisher:bookDetails.publisher,
          bookstatus:bookDetails.bookstatus,
          price:bookDetails.price,
          summary:bookDetails.summary
        },{
          withCredentials:true
        })

        if(res.data.success){
            toast.success(res.data.message);
            dispatch(addtolist(bookDetails))
            dispatch(changeIconColor(bookDetails))
        }else{
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

    const deleteWishlistItem = async (book) =>{
        
      try {
          const res = await axios.delete( `http://localhost:2000/deletewishlistitem/${book.title}`,{
              withCredentials:true
          })
          if(res.data.success){
              toast.success(res.data.message);
              dispatch(deleteWishlistbook(book))
              
          }else{
              toast.error(res.data.message);
          }
      } catch (error) {
          toast.error(error.message);
      }
  }

  useEffect(()=>{
    const changeHeartIconColor = async () => {
        try {
          const res = await axios.put('http://localhost:2000/changehearticoncolor',{
            colorStatus:true,
          },{
            withCredentials:true
          });
  
          if(res.data.successs){
            toast.success(res.data.message);
          }else{
            toast.error(res.data.message);
          }
        } catch (error) {
          // toast.error(error.message);
        }
  
    }
    changeHeartIconColor();
  },[])

  useEffect (()=>{
    const state = () =>{
      dispatch(changeColorState())
    }
    state()
  },[dispatch])
 
  useEffect(()=>{
    const displayAllBooks = async  () =>{
      const res = await  axios.get("http://localhost:2000/viewallbooks")

      try {
        if(res.data.success){
          // toast.success(res.data.message);
          dispatch(displayAllbooks(res.data.allBooks))
        }else{
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error(error.message)
      }
  }
  displayAllBooks()
  },[dispatch])
  
  return (
    <Container fluid className='padding-top' >
        <Row>
           {
            allBooks.map((book)=>(
                <Col sm={12}   md={4} lg={2} key={book._id}>
                <div className='userallbook-div'>
                    <div className='userbook-img'>
                        <Link to={'/bookdetails'}>  
                          <div className='book-div'>
                          <img src={`http://localhost:2000/${book.bookimage}`} alt=""  onClick={()=>dispatch(sendBookId(book.title))}  />

                          </div>
                        </Link>
                    </div>

                    <div className='userbook-details-top'>
                    <div className='userbook-details'>
                        <p>{book.title}</p>
                        {
                          loginDetails.role === 'user' ? (<span ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16" onClick={ book.colorstatus === false ? ()=>addtoWishlist(book):()=>deleteWishlistItem(book)} style={{color:book.colorstatus === true ? '#e56f6f' :'white'}}>
                          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                        </svg></span>):(null) 
                        }
                    </div>
                    </div>
                </div>
            </Col>
            ))
           }
        </Row>
    </Container>
  )
}

export default ViewUserAllBooks