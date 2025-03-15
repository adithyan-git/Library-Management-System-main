import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { addtolist, changeColorState, changeIconColor, changeSearchBookColor, changeSearchBookColorReverse, deleteWishlistbook, sendBookId, sendSearchResults } from '../Redux/slice'
import { Link } from 'react-router-dom'


const SearchBooks = () => {

    const dispatch = useDispatch();
    const searchResults = useSelector((state)=>state.books.searchResults);
    const loginDetails = useSelector((state)=>state.books.loginDetails);
    const userProfileDetails = useSelector((state)=>state.books.userProfileDetails);

    const [value,setValue] = useState('')
    const searchValue = (e)=>{
        setValue(e.target.value)
    }

    const submitSearch = async ()=>{
        try {
            const res = await axios.get(`http://localhost:2000/searchbook/${value}`,{
                withCredentials:true
            })

            if(res.data.success){
                toast.success(res.data.message);
                dispatch(sendSearchResults(res.data.searchResult))
            }else{
                toast.error(res.data.message);
                dispatch(sendSearchResults(res.data.searchResult))

            }
        } catch (error) {
            toast.error(error.message);
        }
    }

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
              dispatch(addtolist(bookDetails));
              dispatch(changeIconColor(bookDetails))  
              dispatch(changeSearchBookColor(bookDetails._id))
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
                dispatch(deleteWishlistbook(book));
                dispatch(changeSearchBookColorReverse(book._id));
  
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
      },[])

  return (
    <Container fluid className='padding-top'>
        <Row>
            <Col md={12} lg={12} className='p-0'>
               <Form className='search-form'>
                    <Row> 
                        <Col lg={12} className='p-0' >
                             <Form.Group className='form-book-group'>
                                <Form.Control
                                placeholder='search books by genre,title,author'
                                type='search'
                                className='book-form-control'
                                onChange={(e)=>searchValue(e)}
                                />
                                    <span className='search-book-icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search " viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                </svg>
                                    </span>
                                <div>
                            <Button onClick={()=>submitSearch()}>Search</Button>
                            </div>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>

        <Row>
            {
                searchResults.length === 0 ? (null):(
                    searchResults.map((book)=>(
                        <Col sm={12} md={4} lg={3} key={book._id} className='search-col'>
                           <div className='search-result-top'>
                           <div className='search-img-div'>
                            <Link to='/bookdetails'>
                            <Image src={`http://localhost:2000/${book.bookimage}`} rounded   onClick={()=>dispatch(sendBookId(book.title))}/>
                            </Link>
                            </div>
                            <div className='details-search-top'>
                            <div className='search-details'>
                                <h6>{book.title}</h6>
                            </div>
                            <div className='search-icon-div'>
                                <p style={{color:book.bookstatus === 'available' ? 'green' : 'red',fontWeight:'bolder'}}>{book.bookstatus}</p>{
                                    loginDetails.role === 'user'  ? (<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16" onClick={ book.colorstatus === false ? ()=>addtoWishlist(book):()=>deleteWishlistItem(book)} style={{color:book.colorstatus === true ? '#e56f6f' :'gray'}}>
                                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                                    </svg></span>):(null)||userProfileDetails.role === 'user' ? (<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16" onClick={ book.colorstatus === false ? ()=>addtoWishlist(book):()=>deleteWishlistItem(book)} style={{color:book.colorstatus === true ? '#e56f6f' :'gray'}}>
                                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                                    </svg></span>):(null)
                                }
                            </div>
                            </div>
                           </div>
                         
                        </Col>
                    ))
                )
            }
        </Row>
    </Container>
  )
}

export default SearchBooks