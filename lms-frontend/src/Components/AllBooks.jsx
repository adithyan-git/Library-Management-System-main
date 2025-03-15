import axios from 'axios';
import React from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteAddedBook, editBook } from '../Redux/slice';

const AllBooks = () => {

    const allBooks = useSelector((state)=>state.books.allBooks);
    const dispatch = useDispatch()
    
    async function  deleteBook (bookId){
      try {
        const res = await axios.delete(`http://localhost:2000/deletebook/${bookId}`,{
          withCredentials:true
        })

      if(res.data.success){
        toast.success(res.data.message)
        dispatch(deleteAddedBook(bookId))
      }else{
        toast.error(res.data.message)
      }
      } catch (error) {
        toast.error(error.message)
      }
    }
    
  return (
    <Container fluid className='padding-top'>
        <Row>
              <Col lg={12}>
                <div className='allbook-add'>
                  <Link to='/addbook'><Button ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
</svg><p>Add-Book</p></Button></Link>

                </div>
              </Col>
             <Col  lg={12} >
              <div className='library-all-books'>
              <Table className='allbook-table' responsive >
             <thead>
        <tr>
          <th>No</th>
          <th>Book-Name</th>
          <th>Book-Image</th>
          <th>Genre</th>
          <th>Author</th>
          <th>Publisher</th>
          <th>Publication-Year</th>
          <th>Total-Copies</th>
          <th>Shelf-Number</th>
          <th>Book-Status</th>
          <th>Category</th>
          <th>Price</th>
          <th>Summary</th>
          <th></th>
          <th></th>

        </tr>
      </thead>
     <tbody>
     {allBooks.map((book,index)=>(
          <tr key={book._id} className='allbook-tr'>
            <td>{index+1}</td>
            <td>{book.title}</td>
            <td className='allbook-img'><img src={`http://localhost:2000/${book.bookimage}`} alt="" /><Link to='/editbookimage'> <span className='edit-book-icon' onClick={()=>dispatch(editBook(book))}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg></span></Link></td>
            <td>{book.genre}</td>
            <td>{book.author}</td>
            <td>{book.publisher}</td>
            <td>{book.publicationyear}</td>
            <td>{book.totalcopies}</td>
            <td>{book.shelflocationnumber}</td>
            <td style={{ color: book.bookstatus === "available" ? 'green' : 'red'  }}>{book.bookstatus}</td>
            <td>{book.category}</td>
            <td>{book.price}</td>
            <td>{book.summary}</td>
            <td><Link to="/editbook"><Button className='allbook-edit' onClick={()=>dispatch(editBook(book))}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
</svg></Button></Link></td>
            <td><Button className='allbook-delete' onClick={()=>deleteBook(book._id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
</svg></Button></td>

          </tr>
        ))}
     </tbody>
                
             </Table>
              </div>
            </Col>
        </Row>
    </Container>
  )
}

export default AllBooks