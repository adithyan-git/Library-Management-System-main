import 'bootstrap/dist/css/bootstrap.min.css';

import "./All.css"
import { BrowserRouter as Router , Routes,Route } from "react-router-dom"
import Header from "./Components/Header"
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { displayAllbooks, memberShipExpired, sendBookBorrowRequest, sendExpiredBorrowedBook,sendLoginDetails, sendMemberShipDetails, sendMostBorrowedBooks,  sendRenewalRequest, sendWishlistItems } from './Redux/slice';
import AllBooks from './Components/AllBooks';
import AddBook from './Components/AddBook';
import { toast, ToastContainer } from 'react-toastify';
import EditBook from './Components/EditBook';
import AdminLogin from './Components/AdminLogin';
import Registrations from './Components/Registrations';
import BookCategory from './Components/BookCategory';
import ViewAllUsers from './Components/ViewAllUsers';
import AdminUserEdit from './Components/AdminUserEdit';
import ViewBookFeedBack from './Components/ViewBookFeedBack';
import LibraryServiceFeedBack from './Components/LibraryServiceFeedBack';
import AddUser from './Components/AddUser';
import ViiewMemberShipRequest from './Components/ViiewMemberShipRequest';
import UpdateMemberShip from './Components/UpdateMemberShip';
import ViewBooksBorrowRequest from './Components/ViewBooksBorrowRequest';
import UpdateBorrowRequest from './Components/UpdateBorrowRequest';
import ApproveReturn from './Components/ApproveReturn';
import ViewReturnedBooksUserDetails from './Components/ViewReturnedBooksUserDetails';
import ViewReservedBooks from './Components/ViewReservedBooks';
import UpdateReservedDetails from './Components/UpdateReservedDetails';
import ManageInventory from './Components/ManageInventory';
import ViewBookProblems from './Components/ViewBookProblems';
import OrderNewBooks from './Components/OrderNewBooks';
import MostBorrowedBooks from './Components/MostBorrowedBooks';
import ViewMostReservedBook from './Components/ViewMostReservedBook';
import ExpiredMemberShips from './Components/ExpiredMemberShips';
import SendMemberShipExpiredNotification from './Components/SendMemberShipExpiredNotification';
import ViewUnusedBooks from './Components/ViewUnusedBooks';
import ViewTotalFineAmount from './Components/ViewTotalFineAmount';
import AddMissingBook from './Components/AddMissingBook';
import ViewMissingBooks from './Components/ViewMissingBooks';
import AddLibraryTime from './Components/AddLibraryTime';
import ViewNewBookRequests from './Components/ViewNewBookRequests';
import BorrowedDateExpiredUsers from './Components/BorrowedDateExpiredUsers';
import SendExpiredBookBorrowedNotification from './Components/SendExpiredBookBorrowedNotification';
import UpdateLibraryTime from './Components/UpdateLibraryTime';
import SendNewBookRequest from './Components/SendNewBookRequest';
import ViewRenewalRequest from './Components/ViewRenewalRequest';
import AcceptAndUpdateRenewalborrowRequest from './Components/AcceptAndUpdateRenewalborrowRequest';
import UserMemberShip from './Components/UserMemberShip';
import ViewMemberShipCard from './Components/ViewMemberShipCard';
import BorrowBooks from './Components/BorrowBooks';
import ViewUserAllBooks from './Components/ViewUserAllBooks';
import DetailsOfSingleBook from './Components/DetailsOfSingleBook';
import ViewBorrowingDetails from './Components/ViewBorrowingDetails';
import SendBookFeedback from './Components/SendBookFeedback';
import SendLibraryServiceFeedback from './Components/SendLibraryServiceFeedback';
import SearchBooks from './Components/SearchBooks';
import ReserveBooks from './Components/ReserveBooks';
import ViewReservedDetails from './Components/ViewReservedDetails';
import EditUserProfileDetails from './Components/EditUserProfileDetails';
import EditUserProfileImage from './Components/EditUserProfileImage';
import RenewBorrowingDate from './Components/RenewBorrowingDate';
import ViewWishlistItems from './Components/ViewWishlistItems';
import UpdateUserProfileImage from './Components/UpdateUserProfileImage';
import LibraryTime from './Components/LibraryTime';
import AiPowerdRecommentation from './Components/AiPowerdRecommentation';
import BarcodeScanning from './Components/BarcodeScanning';
import CloudBasedSystem from './Components/CloudBasedSystem';
import MobileFriendlyInterface from './Components/MobileFriendlyInterface';
import EditBookImage from './Components/EditBookImage';
import About from './Components/About';
import UserProfile from './Components/UserProfile';
import Home from './PAGES/Home';


function App() {

  const dispatch = useDispatch();
  const loginDetails = useSelector((state)=>state.books.loginDetails);
  
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
  },[loginDetails])

  useEffect(()=>{
    const expiredMembers = async () =>{

        try {
         const res = await axios.get('http://localhost:2000/membershipexpiredmembers',{
          withCredentials:true
         }
         )
 
         if(res.data.success){
             toast.success(res.data.message);
             dispatch(memberShipExpired(res.data.membershipExpiredUsers));
         }else{
             toast.error(res.data.message);
         }
        } catch (error) {
            toast.error(error.message)
        }
 
     }
     expiredMembers()
   },[loginDetails]);

   useEffect(()=>{
    const bookReturnExpired = async () =>{
        try {
            const res = await axios.get('http://localhost:2000/automaticbookreturnexpiringnotification')

            if(res.data.success){
                toast.success(res.data.message);
                dispatch(sendExpiredBorrowedBook(res.data.borrowedExpiredUsers))
            }else{
                toast.success(res.data.message);
            }
        } catch (error) {
            // toast.error(error.message)
        }
    } 
    bookReturnExpired()
   },[loginDetails]);
 

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

   useEffect(()=>{
      const viewRenewalRequests = async ()=>{

        try {
          const res = await axios.get('http://localhost:2000/viewrenewalbookrequests')

        if(res.data.success){
          // toast.success(res.data.message);
          dispatch(sendRenewalRequest(res.data.renewalRequests))
        }else{
          toast.success(res.data.message);
        }
        } catch (error) {
          // toast.error(error.message);
        }
      }
      viewRenewalRequests()
   },[loginDetails])

   useEffect(()=>{
    const wishlistItems = async ()=>{
        try {
            const res = await axios.get('http://localhost:2000/viewwishlistitems',{
                withCredentials:true
            })

            if(res.data.success){
                // toast.success(res.data.message);
                dispatch(sendWishlistItems(res.data.userAddedItems))
            }else{
                toast.error(res.data.message);
            }
        } catch (error) {
            // toast.error(error.message);
        }
    }
    wishlistItems() 
},[loginDetails])

useEffect(()=>{
  const MembershipCardView = async ()=>{
 
      try {
          const res = await axios.get('http://localhost:2000/viewmembershipcard',{
              withCredentials:true
          })

          if(res.data.success){
              // toast.success(res.data.message);
              dispatch(sendMemberShipDetails(res.data.memberCard))
          }else{
              toast.error(res.data.message);
          }
      } catch (error) {
          // toast.error(error.message);
      }
  }

  MembershipCardView();
},[loginDetails])

useEffect(()=>{
  const viewBorrowBookRequest = async ()=>{
      try {
          const res = await axios.get('http://localhost:2000/viewborrowbooks',{
            withCredentials:true
          })
      
      if(res.data.success){
          toast.success(res.data.message);
          dispatch(sendBookBorrowRequest(res.data.allBorrowedBooks))
      }else{
          toast.error(res.data.message)
      }
      } catch (error) {
          // toast.error(error.message)
      }
  }

  viewBorrowBookRequest()
},[loginDetails])

useEffect(()=>{
      const getLoginDetails = async ()=>{
        try {
          const res = await axios.get('http://localhost:2000/getlogindetails',{
            withCredentials:true
          })
          if(res.data.success){
            toast.success(res.data.message);
            dispatch(sendLoginDetails(res.data.findPerson))
        }else{
            toast.error(res.data.message)
        }
        } catch (error) {
          toast.error(error.message)
        }
      }
      getLoginDetails()
},[dispatch])


  return (
    <Router>
      <ToastContainer
position="top-right"
autoClose={3000}

/>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/allbooks" element={<AllBooks/>}/>
        <Route path="/addbook" element={<AddBook/>}/>
        <Route path="/editbook" element={<EditBook/>}/>
        <Route path="/registrations" element={<Registrations/>}/>
        <Route path="/adminlogin" element={<AdminLogin/>}/>
        <Route path='/category' element={<BookCategory/>}/>
        <Route path='/allusers' element={<ViewAllUsers/>}/>
        <Route path='/adminedituser' element={<AdminUserEdit/>}/>
        <Route path='/bookfeedback' element={<ViewBookFeedBack/>}/>
        <Route path='/libraryservicefeedback' element={<LibraryServiceFeedBack/>}/>
        <Route path='/adduser' element={<AddUser/>}/>
        <Route path='/membershiprequest' element={<ViiewMemberShipRequest/>}/>
        <Route path='/updatemembership' element={<UpdateMemberShip/>}/>
        <Route path='/viewborrowbooksrequest' element={<ViewBooksBorrowRequest/>}/>
        <Route path='/updateborrowrequest' element={<UpdateBorrowRequest/>}/>
        <Route path='/approvereturn' element={<ApproveReturn/>}/>
        <Route path='/viewreturnedbookusers' element={<ViewReturnedBooksUserDetails/>}/>
        <Route path='/viewreserveddetails' element={<ViewReservedBooks/>}/>
        <Route path='/updatereserveddetails' element={<UpdateReservedDetails/>}/>
        <Route path='/manageinventory' element={<ManageInventory/>}/>
        <Route path='/viewbookproblems' element={<ViewBookProblems/>}/>
        <Route path='/ordernewbook' element={<OrderNewBooks/>}/>
        <Route path='/viewmostborrowedbooks' element={<MostBorrowedBooks/>}/>
        <Route path='/viewmostreservedbooks' element={<ViewMostReservedBook/>}/>
        <Route path='/expiredmemberships' element={<ExpiredMemberShips/>}/>
        <Route path='/sendnotificationofexpiredmemberships' element={<SendMemberShipExpiredNotification/>}/>
        <Route path='/viewunusedbooks' element={<ViewUnusedBooks/>}/>
        <Route path='/viewtotalfineamount' element={<ViewTotalFineAmount/>}/>
        <Route path='/addmissingbook' element={<AddMissingBook/>}/>
        <Route path='/viewmissingbook' element={<ViewMissingBooks/>}/>
        <Route path='/addlibrarytime' element={<AddLibraryTime/>}/>
        <Route path='/viewnewbookrequests' element={<ViewNewBookRequests/>}/>
        <Route path='/bookborrowedexpiredusers' element={<BorrowedDateExpiredUsers/>}/>
        <Route path='/sendexpiredbookborrowednotification' element={<SendExpiredBookBorrowedNotification/>}/>
        <Route path='/updatelibrarytime' element={<UpdateLibraryTime/>}/>
        <Route path='/sendnewbookRequest' element={<SendNewBookRequest/>}/>
        <Route path='/viewrenewalrequests' element={<ViewRenewalRequest/>}/>
        <Route path='/updaterenewal' element={<AcceptAndUpdateRenewalborrowRequest/>}/>
        <Route path='/usermembership' element={<UserMemberShip/>}/>
        <Route path='/viewmembershipcard' element={<ViewMemberShipCard/>}/>
        <Route path='/borrowbooks' element={<BorrowBooks/>}/>
        <Route path='/userallbooks' element={<ViewUserAllBooks/>}/>
        <Route path='/bookdetails' element={<DetailsOfSingleBook/>}/>
        <Route path='/borrowingdetails' element={<ViewBorrowingDetails/>}/>
        <Route path='/sendbookfeedback' element={<SendBookFeedback/>}/>
        <Route path='/sendlibraryfeedback' element={<SendLibraryServiceFeedback/>}/>
        <Route path='/searchbook' element={<SearchBooks/>}/>
        <Route path='/rervebook' element={<ReserveBooks/>}/>
        <Route path='/reservebooksdetails' element={<ViewReservedDetails/>}/>
        <Route path='/edituserprofile' element={<EditUserProfileDetails/>}/>
        <Route path='/edituserprofileimage' element={<EditUserProfileImage/>}/>
        <Route path='/renewbookborrowingdate' element={<RenewBorrowingDate/>}/>
        <Route path='/viewwishlistitems' element={<ViewWishlistItems/>}/>
        <Route path='/adminedituserprofileimage' element={<UpdateUserProfileImage/>}/>
        <Route path='/librarytime' element={<LibraryTime/>}/>
        <Route path='/airecommentation' element={<AiPowerdRecommentation/>}/>
        <Route path='/barcode' element={<BarcodeScanning/>}/>
        <Route path='/cloud' element={<CloudBasedSystem/>}/>
        <Route path='/mobilefriendlyinterface' element={<MobileFriendlyInterface/>}/>
        <Route path='/editbookimage' element={<EditBookImage/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/userprofile' element={<UserProfile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
