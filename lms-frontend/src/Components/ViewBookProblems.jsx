import axios from 'axios'
import React, { useEffect } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { deleteBookProblem, sendBookProblems } from '../Redux/slice'

const ViewBookProblems = () => {
    
    const dispatch = useDispatch();
    const bookProblems = useSelector((state)=> state.books.bookProblems);

    useEffect(()=>{
        const viewBookProblems = async ()=>{
            try {
                const res = await axios.get('http://localhost:2000/viewbooksproblems',{
                    withCredentials:true
                })
    
                if(res.data.success){
                    toast.success(res.data.message);
                    dispatch(sendBookProblems(res.data.allBookproblems))
                }else{
                    toast.error(res.data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
        viewBookProblems()
    },[dispatch])

    const deleteProblem = async (problemId) =>{
        
        
        try {
            const res = await axios.delete(`http://localhost:2000/deleteproblem/${problemId}`,{
                withCredentials:true
            })

            if(res.data.success){
                toast.success(res.data.message);
                dispatch(deleteBookProblem(problemId))
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
            <Col lg={12} className='p-0'>
               {
                bookProblems.length === 0 ? (<div className='no-msg-div'><h1>No Book Problems....</h1></div>):( <div className='bookproblems-table-div'>
                    <Table  className='bookproblems-table'>
                <thead>
                    <tr>
                    <th>No</th>
                    <th>Bookname</th>
                    <th>Publisher</th>
                    <th>Price</th>
                    <th>Problem</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookProblems.map((bookproblem,index)=>(
                            <tr key={bookproblem._id}>
                                <td>{index + 1}</td>
                                <td>{bookproblem.booktitle}</td>
                                <td>{bookproblem.publisher}</td>
                                <td>{bookproblem.price}</td>
                                <td>{bookproblem.problem}</td>
                                <td><Button className='book-prblm-btn' onClick={()=>deleteProblem(bookproblem._id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                </svg></Button>
                                </td>
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

export default ViewBookProblems