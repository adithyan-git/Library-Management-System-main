import axios from 'axios';
import React, { useState } from 'react'
import { Button, Container, Form, ListGroup, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {  logOutUser, sendCategory } from '../Redux/slice';

const Header = () => {

  const [clickValue,setClickValue] = useState(false);
  const dispatch = useDispatch()
  const expiredMembershipsCount = useSelector((state)=>state.books.expiredMemberships.length); 
  const expiredBorrowedBook = useSelector((state)=>state.books.expiredBorrowedBook.length); 
  const renewalRequests = useSelector((state)=>state.books.renewalRequests.length);
  const countSum = expiredMembershipsCount + expiredBorrowedBook + renewalRequests
  const wishlistBooks = useSelector((state)=>state.books.wishlistBooks.length);
  const loginDetails = useSelector((state)=>state.books.loginDetails);
  
  const navigate = useNavigate()
  
  
  
  const updateClickValue = ()=>{
    setClickValue(true)
  }
  
  const closeMore = ()=>{
      setClickValue(false);
  }
  setTimeout(closeMore,30000);





 const userLogOut = async () => {

  try {
    const res = await axios.delete("http://localhost:2000/logoutuser",{
      withCredentials:true
    })
    if(res.data.success){
      toast.success(res.data.message);
      dispatch(logOutUser(false));
      navigate('/')

    }else{
      toast.error(res.data.message)
    }
  } catch (error) {
    toast.error(error.message);
  }
 }
 




 
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#"><img src="/L-M-S-Logo/l-m-s-logo.webp" alt="" />BookSphere</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <li>            
              <Nav.Link as={Link} to="/">Home</Nav.Link>
            </li>
            <li>            
              <Nav.Link as={Link} to="/about">About</Nav.Link>
            </li>
            <li>           
               {
                ['admin','librarian'].includes(loginDetails.role) ? (<Nav.Link as={Link} to="/allbooks">Books</Nav.Link> ):(null)
                 }
            </li>
            <li>      
            {
              loginDetails.role === 'user' ? (<Nav.Link as={Link} to="/userallbooks">Books</Nav.Link>):(null)
      
            }
           </li>
           
            <NavDropdown title="Categories" id="navbarScrollingDropdown" >
              <NavDropdown.Item as={Link} to ='/category' onClick={()=>dispatch(sendCategory("fiction"))}>
                Fiction
                </NavDropdown.Item>
                <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to ='/category' onClick={()=>dispatch(sendCategory("non-fiction"))}>
                Non-Fiction
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to ='/category' onClick={()=>dispatch(sendCategory("children's books"))}>
                Children's Books
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to ='/category' onClick={()=>dispatch(sendCategory("young adult"))}>
                Young Adult
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to ='/category' onClick={()=>dispatch(sendCategory("academic and educational"))}>
                Academic and Educational
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to ='/category' onClick={()=>dispatch(sendCategory("science and technology"))}>
                Science and Technology
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to ='/category' onClick={()=>dispatch(sendCategory("history and culture"))}>
                History and Culture
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to ='/category' onClick={()=>dispatch(sendCategory("relegion and spirituality"))}>
               Relegion and spirituality
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to ='/category' onClick={()=>dispatch(sendCategory("travel and adventure"))}>
                Travel and Adventure
              </NavDropdown.Item>
            </NavDropdown>
          
           {
            ['admin','librarian'].includes(loginDetails.role)?
             (
            <NavDropdown title="FeedBack">
              <NavDropdown.Item as={Link} to="/bookfeedback">Book FeedBack</NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item as={Link} to="/libraryservicefeedback">LibraryFeedback</NavDropdown.Item>
          </NavDropdown>):(null) 
           }
           {
            ['admin','user','librarian'].includes(loginDetails.role) ? ( 
            <NavDropdown title={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-boxes first" viewBox="0 0 16 16">
              <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434zM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567zM7.5 9.933l-2.75 1.571v3.134l2.75-1.571zm1 3.134 2.75 1.571v-3.134L8.5 9.933zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567zm2.242-2.433V3.504L8.5 5.076V8.21zM7.5 8.21V5.076L4.75 3.504v3.134zM5.258 2.643 8 4.21l2.742-1.567L8 1.076zM15 9.933l-2.75 1.571v3.134L15 13.067zM3.75 14.638v-3.134L1 9.933v3.134z"/>
              </svg>}>
              {
                ['admin','librarian'].includes(loginDetails.role) ? (<NavDropdown.Item as={Link} to="/adduser">Add User</NavDropdown.Item>):(null)
              }
              {
              ['admin','librarian'].includes(loginDetails.role) ? (<NavDropdown.Divider/>):(null)
              }
              {
                   loginDetails.role === 'user' ?  (<NavDropdown.Item as={Link} to="/borrowingdetails">BorrowBooksDetails</NavDropdown.Item>
                   ):(null)
              }
              {
                 loginDetails.role === 'user' ? (<NavDropdown.Divider/>
                 ):(null)
              }
              {
                ['admin','librarian'].includes(loginDetails.role) ?  (
                <NavDropdown.Item as={Link} to='/membershiprequest'>View Membership Details</NavDropdown.Item>
                ):(null)
              }
              {
                ['admin','librarian'].includes(loginDetails.role) ? (<NavDropdown.Divider/>
                ):(null) 
              }
              {
              ['admin','librarian'].includes(loginDetails.role)? (<NavDropdown.Item as={Link} to='/viewborrowbooksrequest'>Borrowed Books Requests</NavDropdown.Item>
                ):(null)
              }
              {
                ['admin','librarian'].includes(loginDetails.role) ? (<NavDropdown.Divider/>):(null) 
              }
              {
                loginDetails.role  === 'user' ? (<NavDropdown.Item as={Link} to='/reservebooksdetails'>Reserved Books Details </NavDropdown.Item>
                ):(null)
              }
              {
                loginDetails.role === 'user' ? ( <NavDropdown.Divider/>
                ):(null)
              }
                 {
                  ['admin','librarian'].includes(loginDetails.role) ? (<NavDropdown.Item as={Link} to='/viewreturnedbookusers'>View Returned Book Users</NavDropdown.Item>
                  ) : (null)
                 }
                 {
                  ['admin','librarian'].includes(loginDetails.role) ? (<NavDropdown.Divider/>
                  ) : (null)
                 }
                 {
                   ['admin','librarian'].includes(loginDetails.role)? (<NavDropdown.Item as={Link} to={'/viewreserveddetails'}>Reserved Book Users</NavDropdown.Item>
                   ) : (null)
                 }
                 {
                 ['admin','librarian'].includes(loginDetails.role) ? (<NavDropdown.Divider/>
                  ) : (null) 
                 }
                 {
                    loginDetails.role  === 'user' ? (<NavDropdown.Item as={Link} to={'/sendlibraryfeedback'}>Send Library Feedback</NavDropdown.Item>
                    ) : (null)
                 }
                 {
                    loginDetails.role === 'user' ? (<NavDropdown.Divider/>) : (null) 
                 }
                 {
                  loginDetails.role === 'admin' ? (<NavDropdown.Item as={Link} to='/allusers'>View All Users</NavDropdown.Item>):(null)
                 }
                 {
                  loginDetails.role === 'admin' ? (<NavDropdown.Divider/>) : (null) 
                 }
                 {
                  ['admin','librarian'].includes(loginDetails.role) ? (<NavDropdown.Item as={Link} to='/viewmostborrowedbooks'>View Most Borrowed Books</NavDropdown.Item>
                  ) : (null)
                 }
                 {
                  ['admin','librarian'].includes(loginDetails.role)? (<NavDropdown.Divider/>) : (null)
                 }
                 {
                  ['admin','librarian'].includes(loginDetails.role) ? (<NavDropdown.Item as={Link} to='/viewmostreservedbooks'>View Most Reserved Books</NavDropdown.Item>
                  ) : (null) 
                 }
                 {
                  ['admin','librarian'].includes(loginDetails.role)? (<NavDropdown.Divider/>
                  ) : (null)
                 }
                 {
                  ['admin','librarian'].includes(loginDetails.role) ? (<NavDropdown.Item as={Link} to='/viewunusedbooks' >View Unused Books</NavDropdown.Item>
                  ) : (null) 
                 }
                  {
                  ['admin','librarian'].includes(loginDetails.role) ? (<NavDropdown.Divider/>) : (null)
                 }
                  {
                  ['admin','librarian'].includes(loginDetails.role) ? (<NavDropdown.Item  as={Link} to='/viewtotalfineamount'>  View Total Fine Amount</NavDropdown.Item>
                  ) : (null) 
                 }
                 {
                  ['admin','librarian'].includes(loginDetails.role) ? (<NavDropdown.Divider/>) : (null) 
                 }
                 {
                    loginDetails.role  === 'user' ? (<NavDropdown.Item  as={Link} to='/viewmembershipcard'>Membership Card</NavDropdown.Item>
                    ) : (null)
                 }
                 {
                    loginDetails.role === 'user' ? (<NavDropdown.Divider/>) : (null) 
                 }
                 {
                  ['admin','librarian'].includes(loginDetails.role) ? (<NavDropdown.Item  as={Link} to='/addmissingbook'  >Add Missing Book </NavDropdown.Item>
                  ) : (null)
                 }
                 {
                  ['admin','librarian'].includes(loginDetails.role) ? (<NavDropdown.Divider/>) : (null)
                 }
                 {
                  ['user','librarian'].includes(loginDetails.role) ? (<NavDropdown.Item  as={Link} to='/usermembership'  >User MemberShip</NavDropdown.Item>
                  ) : (null) 
                 }
                 {
                  loginDetails.role === 'librarian'  ? (<NavDropdown.Divider/>) : (null) 
                 }
                 {
                  ['admin','librarian'].includes(loginDetails.role) ? (<NavDropdown.Item  className='more-item' onMouseEnter={()=>updateClickValue()}>More <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-square-fill square-arrow" viewBox="0 0 16 16" >
                  <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1"/>
                </svg>
                </NavDropdown.Item>):(null)
                 }
                
                  
                 {clickValue ? ( <ListGroup className='lists-group'>
                  {
                  loginDetails.role === 'admin' ? (<ListGroup.Item as={Link} to='/viewmissingbook'>View Missing Books</ListGroup.Item>
                  ) : (null) 
                 }
                 {
                  loginDetails.role  === 'admin' ? (<ListGroup.Item as={Link} to='/addlibrarytime'>Add Library Time</ListGroup.Item>
                  ) : (null) 
                 }
                 {
                  loginDetails.role === 'admin'  ? (<ListGroup.Item as={Link} to='/ordernewbook'>Order New Book</ListGroup.Item>) : (null) 
                 }
                 {
                  loginDetails.role === 'admin'   ? (<ListGroup.Item as={Link} to='/viewnewbookrequests'>View New Book Request</ListGroup.Item>
                  ) : (null) 
                 }
                 {
                  ['admin','librarian'].includes(loginDetails.role) ? (<ListGroup.Item as={Link} to='/manageinventory'>AddBookProblem</ListGroup.Item>) : (null)
                 }
                 {
                  loginDetails.role === 'admin' ? (<ListGroup.Item as={Link} to='/viewbookproblems'>View Book Problems</ListGroup.Item>
                  ) : (null)
                 }
                 {
                  loginDetails.role  === 'librarian'  ? (<ListGroup.Item as={Link} to='/sendnewbookRequest'>Send New Book Request</ListGroup.Item>) : (null) 
                 }
                  </ListGroup>):(null)}
                  </NavDropdown>):(null) 
           }
          </Nav>
          <Form className="d-flex">
           {
            loginDetails.role === 'user' ? ( <Nav.Link as={Link} to={'/viewwishlistitems'}>
              <span className='wish-count'>{wishlistBooks}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-open-heart wishlisticon" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8.47 1.318a1 1 0 0 0-.94 0l-6 3.2A1 1 0 0 0 1 5.4v.817l3.235 1.94a2.8 2.8 0 0 0-.233 1.027L1 7.384v5.733l3.479-2.087q.224.414.558.83l-4.002 2.402A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738l-4.002-2.401q.334-.418.558-.831L15 13.117V7.383l-3.002 1.801a2.8 2.8 0 0 0-.233-1.026L15 6.217V5.4a1 1 0 0 0-.53-.882zM7.06.435a2 2 0 0 1 1.882 0l6 3.2A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765zM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
              </svg>
              </Nav.Link>):(null) 
           }
            <Nav.Link as={Link} to={'/librarytime'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-alarm-fill alarm" viewBox="0 0 16 16">
              <path d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5m2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.04 8.04 0 0 0 .86 5.387M11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.04 8.04 0 0 0-3.527-3.527"/>
            </svg>
            </Nav.Link>
          <Nav.Link as={Link} to='/userprofile'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-lines-fill profile-icon" viewBox="0 0 16 16">
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
            </svg>
            </Nav.Link>
           {
            ['admin','librarian'].includes(loginDetails.role)? (
               <div className='notification-div'>
              <span>{countSum}</span>
              <NavDropdown className=' bell-icon' title={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"/>
              </svg>}  id="navbarScrollingDropdown" > 
                {
                  loginDetails.role === ('admin' )||( 'librarian') ? ( <NavDropdown.Item as={Link} to ='/expiredmemberships'>
                    Expired Memberships <span className='expiredMembershipsCount'>{expiredMembershipsCount}</span>
                    </NavDropdown.Item>):(null) 
                }
                {
                  loginDetails.role === ('admin' )||( 'librarian') ? (<NavDropdown.Divider/>
                  ):(null) 
                }
                {
                  loginDetails.role === ('admin')||('librarian') ? (  <NavDropdown.Item as={Link} to ='/bookborrowedexpiredusers'>
                    Expired Borrowed Books  <span className='expired-count-book'>{expiredBorrowedBook}</span>
                  </NavDropdown.Item>):(null)
                }
                 {
                  loginDetails.role === ('admin')||('librarian') ? (<NavDropdown.Divider/>
                  ):(null) 
                }
                {
                  loginDetails.role === ('librarian')||('admin') ? (  <NavDropdown.Item as={Link} to ='/viewrenewalrequests'>
                    Borrowed Book Renewal Request  <span>{renewalRequests}</span>
                  </NavDropdown.Item>):(null) 
                }
                  
              </NavDropdown>
              </div>):(null)
           }
          
            <Link to='/searchbook' className='search-link'><span className='search-bar' > <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search search-icon" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>Search</span></Link>
           { ['admin','librarian','user'].includes(loginDetails.role)  ? (<Button className='login-btn1'  onClick={()=>userLogOut()}>Sign Out</Button>):( <Link to="/registrations"><Button className='login-btn1'>Sign Up</Button></Link>)}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    </>
  )
}



export default Header

