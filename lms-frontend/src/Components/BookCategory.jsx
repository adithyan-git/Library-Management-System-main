import React, { useEffect } from 'react'
import {  Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addtolist, changebookCategoryIconColor, changeColorState, deleteWishlistbook, sendBookId } from '../Redux/slice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const BookCategory = () => {

  const bookCategory = useSelector((state)=>state.books.bookCategory);
  const allBooks = useSelector((state)=>state.books.allBooks);
  const categoryBooks = allBooks.filter((book)=>book.category.includes(`${bookCategory}`));
  const userProfileDetails = useSelector((state)=>state.books.userProfileDetails);
  const loginDetails = useSelector((state)=>state.books.loginDetails);


  const dispatch = useDispatch()
  
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
          dispatch(changebookCategoryIconColor(bookDetails._id));
          // dispatch(changeSearchBookColorReverse(bookDetails._id));
          
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

 useEffect (()=>{
    const state = () =>{
      dispatch(changeColorState())
    }
    state()
  },[dispatch])

  return (
    <Container fluid className='padding-top'>
        <Row>
            {categoryBooks.map((book)=>(
                <Col sm={12} md={4} lg={2}>
                    <div className='category-main-div'>
                        <div className='category-img'> <Link to='/bookdetails'>
                            <img src={`http://localhost:2000/${book.bookimage}`} alt="" onClick={()=>dispatch(sendBookId(book.title))} />
                            </Link>
                        </div>
                        <div className='category-head'>
                            <h4>{book.title}</h4>
                            {
                        loginDetails.role === 'user' ? ( <div className='category-head2'>
                          <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16" onClick={ book.colorstatus === false ? ()=>addtoWishlist(book):()=>deleteWishlistItem(book)}  style={{color:book.colorstatus === true ? '#e56f6f' :'white'}}> 
                                  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                                  </svg></span>
                              </div>):(null) || userProfileDetails.role === 'user' ? ( <div className='category-head2'>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16" onClick={ book.colorstatus === false ? ()=>addtoWishlist(book):()=>deleteWishlistItem(book)}  style={{color:book.colorstatus === true ? '#e56f6f' :'white'}}> 
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                            </svg></span>
                        </div>):(null)
                       }
                        </div>
                       
                    </div>
                </Col>
            ))}
        </Row>
    </Container>
  )
}

export default BookCategory