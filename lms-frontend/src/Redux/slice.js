import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name:'mySlice',
    initialState:{
        allBooks:[],
        editInitialValues:[],
        profileDetails:[],
        bookCategory:"",
        allUsers:[],
        editUserDetails:[],
        bookFeedBack:[],
        libraryServiceFeedback:[],
        memberShipRequests:[],
        memberDetails:[],
        borrowBookRequest:[],
        borrowRequestDetails:[],
        returnBook:[],
        allReturnedBookDetails:[],
        reservedbooksDetails:[],
        editreserveddetails:[],
        bookProblems:[],
        mostBorrowedBooks:[],
        mostReservedBooks:[],
        expiredMemberships:[],
        expiredMembershipDetails:[],
        unUsedBooks:[],
        fineDetails:[],
        totalFineAmount:'',
        missingBooks:[],
        newBookRequests:[],
        expiredBorrowedBook:[],
        sendExpiredBookDetails:[],
        libraryTime:[],
        editLibraryTime:[],
        renewalRequests:[],
        renewalEditDetails:[],
        librarianProfileDetails:[],
        userMembership:[],
        bookDetails:{},
        allborrowDetails:[],
        reservedUserBookDetails:[],
        userProfileDetails:[],
        userRenewdata:[],
        wishlistBooks:[],
        searchResults:[],
        loginDetails:[],
        reserveBook:[]
    },
    reducers:{
        displayAllbooks:(state,action)=>{
            state.allBooks = action.payload;


        },
        editBook:(state,action)=>{
            state.editInitialValues = action.payload;
            
        },
        sendProfileDetails:(state,action)=>{
            state.profileDetails = action.payload;
            

        },
        logOut:(state,action)=>{
            state.profileDetails = action.payload;
            state.loginDetails = action.payload;
            state.borrowBookRequest = [];
            state.fineDetails = []
            state.reservedbooksDetails = []
        },
        sendCategory:(state,action)=>{
            state.bookCategory = action.payload
        },
        sendAllUsers:(state,action)=>{
            state.allUsers = action.payload
        },
        sendEdituserValue:(state,action)=> {
            state.editUserDetails = action.payload
        },
        reservedBook:(state,action)=>{
            state.reserveBook = action.payload
        }
        ,
        displayBookFeedBack:(state,action)=>{
            state.bookFeedBack = action.payload
        },
        displayLibraryServiceFeedback:(state,action)=>{
            state.libraryServiceFeedback = action.payload;
        },
        sendMemberShipRequest:(state,action)=>{
            state.memberShipRequests = action.payload
        },
        sendMemberDetails:(state,action)=>{
            state.memberDetails = action.payload
        },
        sendBookBorrowRequest:(state,action)=>{
            state.borrowBookRequest = action.payload;



        },
        sendBorrowDetails:(state,action)=>{
            state.borrowRequestDetails = action.payload;
        },
        returnBook:(state,action)=>{
            state.returnBook = action.payload;
        },
        sendAllReturnBookUserDetails:(state,action)=>{
            state.allReturnedBookDetails = action.payload;
        },
        reservedBookDetail:(state,action)=>{
            state.reservedbooksDetails = action.payload;
        },
        sendReservedDetails:(state,action)=>{
            state.editreserveddetails = action.payload;
        },
        sendBookProblems:(state,action) => {
            state.bookProblems = action.payload;
            
        },
        deleteBookProblem:(state,action)=>{
            const problemArray = JSON.parse(JSON.stringify(state.bookProblems));
            const index = problemArray.findIndex((problem)=>problem._id === action.payload);
            state.bookProblems.splice(index,1);
        },
        sendMostBorrowedBooks:(state,action)=>{
            state.mostBorrowedBooks = action.payload; 
        },
        sendMostReservedBooks:(state,action)=>{
            state.mostReservedBooks = action.payload; 
        },
        memberShipExpired:(state,action)=>{
            state.expiredMemberships = action.payload;
            
        },
        sendExpiredmembership:(state,action)=>{
            state.expiredMembershipDetails = action.payload;
        },
        sendUpdatedExpireStatus:(state,action)=>{
            const expiredMemberships = JSON.parse(JSON.stringify(state.expiredMemberships));
            const index = expiredMemberships.findIndex((membership)=>membership._id === action.payload);
            state.expiredMemberships[index].expiredstatus =  'expired';
            state.expiredMemberships[index].messagestatus =  'sended'


        },
        updatedBorrowNotification:(state,action) => {
            const allBorrowedUsers = JSON.parse(JSON.stringify(state.borrowBookRequest));
            const index = allBorrowedUsers.findIndex((request)=> request._id === action.payload);
            console.log('index',index);
            
            state.borrowBookRequest[index].messagestatus = 'sended' 
        },
        deleteExpiredMemberShip:(state,action)=>{
                const allMemberships = JSON.parse(JSON.stringify(state.memberShipRequests));
                const index = allMemberships.findIndex((membership)=>membership._id === action.payload);
                state.memberShipRequests.splice(index,1);                
        },
        sendUnusedBooks:(state,action)=>{
            state.unUsedBooks = action.payload
        },
        sendFineDetails:(state,action) => {
            state.fineDetails = action.payload;

            const allFines = JSON.parse(JSON.stringify(state.fineDetails));
                let sum = 0;
            allFines.forEach(element => {
                  sum =Number( element.totalfineamount )+ sum;
            });

            state.totalFineAmount = sum;
        
            
        },
        sendMissingBook:(state,action)=>{
            state.missingBooks = action.payload;
        },
        deleteMissingBooks:(state,action)=>{
            const allMissingBooks = JSON.parse(JSON.stringify(state.missingBooks));
            const index = allMissingBooks.findIndex((missingBook)=>missingBook._id === action.payload);
            state.missingBooks.splice(index,1); 
        },
        newBookRequest:(state,action)=>{
            state.newBookRequests = action.payload;
        },
        deleteBookNewRequest:(state,action)=>{
            const allnewBookRequests = JSON.parse(JSON.stringify(state.newBookRequests));
            const index = allnewBookRequests.findIndex((newBookRequest)=>newBookRequest._id === action.payload);
            state.newBookRequests.splice(index,1); 
        },
        sendExpiredBorrowedBook:(state,action)=>{
            
            state.expiredBorrowedBook = action.payload;
            
            const tempvar = action.payload;
            const borrowBookRequest = JSON.parse(JSON.stringify( state.borrowBookRequest))
            
            if (tempvar.length === 0){
             
                 for (let i = 0; i < borrowBookRequest.length; i++) {

                     if(borrowBookRequest[i]){
 
                         let index = borrowBookRequest.findIndex((request)=>request._id === borrowBookRequest[i]._id);                            
                         state.borrowBookRequest[index].expirestatus = 'nothing';
                       
                     }
                     
                     
                 }
             }else if(tempvar.length > 0){

                 for (let i = 0; i < tempvar.length; i++) {

                     if(tempvar[i]){
 
                         let index = borrowBookRequest.findIndex((request)=>request._id === tempvar[i]._id);                            
                         state.borrowBookRequest[index].expirestatus = 'expired';
                       
                     }
                     
                     
                 }
             }

            
        },
        sendNotificationDetails:(state,action)=>{
            
            state.sendExpiredBookDetails = action.payload;
        },
        viewLibraryTime:(state,action)=>{
            state.libraryTime = action.payload
        },
        sendLibraryTime:(state,action)=>{
            state.editLibraryTime = action.payload
        },
        updateFineStatus:(state,action)=>{
            const allFineDetails = JSON.parse(JSON.stringify(state.fineDetails));
            const index = allFineDetails.findIndex((fineDetail)=>fineDetail._id === action.payload);
            state.fineDetails[index].status = "Recieved" ; 
        },
        sendRenewalRequest:(state,action)=>{
            state.renewalRequests = action.payload
        },
        renewalEdit:(state,action)=>{
            state.renewalEditDetails = action.payload;
        },
        deleteAcceptedRenewalRequest:(state,action)=>{
            const allRenewalRequests = JSON.parse(JSON.stringify(state.renewalRequests));            
            const index = allRenewalRequests.findIndex((renewalrequest)=>renewalrequest._id === action.payload);            
            state.renewalRequests.splice(index,1 )
        },
        sendLibrarianProfileDetails:(state,action)=>{
            state.librarianProfileDetails = action.payload;
        },
        logOutLibrarian:(state,action)=>{
            state.librarianProfileDetails = action.payload;
            state.loginDetails = action.payload;
        },
        sendMemberShipDetails:(state,action)=>{
            state.userMembership = action.payload
        },
        sendBookId:(state,action)=>{
            const samebook =JSON.parse(JSON.stringify(state.allBooks)).find((book)=>book.title === action.payload);
            state.bookDetails = samebook;
            
        },
        borrowDetails:(state,action)=>{
            state.allborrowDetails = action.payload;
        },
        userReservedBookDetails:(state,action)=>{
            state.reservedUserBookDetails = action.payload;
        },
        sendUserProfileDetails:(state,action)=>{
            state.userProfileDetails = action.payload;
        },
        logOutUser:(state,action)=>{
            state.userProfileDetails = action.payload;
            state.loginDetails = action.payload;
            state.allborrowDetails = []
            state.userMembership = []
            state.reservedUserBookDetails = []
            state.allBooks = []
            state.wishlistBooks = []
            state.searchResults = []
        },
        renewData:(state,action)=>{
            state.userRenewdata = action.payload 
        },
        sendWishlistItems:(state,action)=>{
            state.wishlistBooks = action.payload 
        },
        deleteWishlistbook:(state,action)=>{
            const allwishlistBooks = JSON.parse(JSON.stringify(state.wishlistBooks)); 
            
            const index = allwishlistBooks.findIndex((book)=>book._id === action.payload._id);            
            state.wishlistBooks.splice(index,1 );

            const allBooks = JSON.parse(JSON.stringify(state.allBooks)); 
            const bookIndex = allBooks.findIndex((book)=>book.title === action.payload.title);
            
            state.allBooks[bookIndex].colorstatus = false;            

        },
        changeIconColor:(state,action)=>{
            const allBooks = JSON.parse(JSON.stringify(state.allBooks));            
            const index = allBooks.findIndex((book)=>book.title === action.payload.title);            
            state.allBooks[index].colorstatus = true

            

        },
        changeTrendIconColor:(state,action)=>{
            const mostBorrowedBooks = JSON.parse(JSON.stringify(state.mostBorrowedBooks));            
            const index = mostBorrowedBooks.findIndex((book)=>book._id === action.payload);            
            state.mostBorrowedBooks[index].colorstatus = true
        },
        changebookCategoryIconColor:(state,action)=>{
            const allBooks = JSON.parse(JSON.stringify(state.allBooks));                                    
            const index = allBooks.findIndex((book)=>book._id === action.payload);                        
            state.allBooks[index].colorstatus = true
        },
        sendSearchResults:(state,action)=>{
            state.searchResults = action.payload;
        },
        changeSearchBookColor:(state,action)=>{
            const allsearchResults = JSON.parse(JSON.stringify(state.searchResults));                                    
            const index = allsearchResults.findIndex((book)=>book._id === action.payload);                                    
            state.searchResults[index].colorstatus = true
        },
        changeSearchBookColorReverse:(state,action)=>{
            const allsearchResults = JSON.parse(JSON.stringify(state.searchResults));                                    
            const index = allsearchResults.findIndex((book)=>book._id === action.payload);                                    
            state.searchResults[index].colorstatus = false
        },
        deleteBorrowRequest:(state,action)=>{
            const allborrowBookRequests = JSON.parse(JSON.stringify(state.borrowBookRequest));            
            const index = allborrowBookRequests.findIndex((request)=>request._id === action.payload);            
            state.borrowBookRequest.splice(index,1 )
        },
        deleteReturnUserDetails:(state,action)=>{
            const allReturnedBookDetails = JSON.parse(JSON.stringify(state.allReturnedBookDetails));            
            const index = allReturnedBookDetails.findIndex((request)=>request._id === action.payload);            
            state.allReturnedBookDetails.splice(index,1 )
        },
        deleteReservedUserDetails:(state,action)=>{
            const reservedbooksDetails = JSON.parse(JSON.stringify(state.reservedbooksDetails));            
            const index = reservedbooksDetails.findIndex((request)=>request._id === action.payload);            
            state.reservedbooksDetails.splice(index,1 );
        },
        deleteRegisterdUser:(state,action)=>{
            const allUsers = JSON.parse(JSON.stringify(state.allUsers));            
            const index = allUsers.findIndex((user)=>user._id === action.payload);            
            state.allUsers.splice(index,1 );
        },
        deleteBookFeebacks:(state,action)=>{
            const allBookFeedBack = JSON.parse(JSON.stringify(state.bookFeedBack));            
            const index = allBookFeedBack.findIndex((feedback)=>feedback._id === action.payload);            
            state.bookFeedBack.splice(index,1 );
        },
        deleteBookFeedbacks:(state,action)=>{
            const alllibraryServiceFeedback = JSON.parse(JSON.stringify(state.libraryServiceFeedback));            
            const index = alllibraryServiceFeedback.findIndex((feedback)=>feedback._id === action.payload);            
            state.libraryServiceFeedback.splice(index,1);
        },
        sendLoginDetails:(state,action)=>{
            state.loginDetails = action.payload;
            console.log('action',action.payload);
            
        },
        sendAddedBook:(state,action)=>{
            const book = action.payload;
            state.allBooks = [...state.allBooks,book];
        },
        deleteAddedBook:(state,action)=>{
            const allBooks = JSON.parse(JSON.stringify(state.allBooks));            
            const index = allBooks.findIndex((book)=>book._id === action.payload);            
            state.allBooks.splice(index,1);
        },
        feedbackSend:(state,action)=>{
            const feedback = action.payload;
            state.bookFeedBack=[...state.bookFeedBack,feedback]
        },
        membershipSend:(state,action)=>{

            const tempvar = action.payload;
            state.userMembership = [...state.userMembership,tempvar]
        },
        sendAddedUser:(state,action)=>{
            const user = action.payload
            state.allUsers = [...state.allUsers,user]
        },
        memberShipUpdate:(state,action)=>{
            const memberShipRequests = JSON.parse(JSON.stringify(state.memberShipRequests));            
            const index = memberShipRequests.findIndex((membership)=>membership._id === action.payload.id);            
            state.memberShipRequests[index].registernumber = action.payload.registernumber;


    
        },
        borrowRequestUpdation:(state,action)=>{
            const borrowBookRequest = JSON.parse(JSON.stringify(state.borrowBookRequest));            
            const index = borrowBookRequest.findIndex((request)=>request._id === action.payload.id); 
                       console.log(action.payload);
                       
            state.borrowBookRequest[index].request = action.payload.request;
            state.borrowBookRequest[index].duedate = action.payload.duedate;
            state.borrowBookRequest[index].borroweddate = action.payload.borroweddate;
            state.borrowBookRequest[index].borrowstatus= action.payload.borrowstatus;

            if(action.payload.request === 'pending'){
                state.borrowBookRequest[index].return = 'nothing'
            }else if(action.payload.request === 'approved'){
                state.borrowBookRequest[index].return = 'pending'
            }
            
                
        },
        sendUpdatedRenewalRequest:(state,action) => {
            
            const renewalRequests = JSON.parse(JSON.stringify(state.renewalRequests));            
            const index = renewalRequests.findIndex((request)=>request._id === action.payload.id); 
            state.renewalRequests[index].status = action.payload.status    
                    
            const borrowBookRequest = JSON.parse(JSON.stringify(state.borrowBookRequest));             
            const bookIndex = borrowBookRequest.findIndex((request)=>request._id === action.payload.renewalEditDetails.bookid);
           
            

            if(action.payload.data.status === 'approved'){
                state.borrowBookRequest[bookIndex].expirestatus = 'nothing'
                state.borrowBookRequest[bookIndex].duedate = action.payload.data.extendingdate
                state.borrowBookRequest[bookIndex].renewstatus = action.payload.data.status         
            }else if(action.payload.data.status === 'rejected'){
                
                state.borrowBookRequest[bookIndex].renewstatus = action.payload.data.status         
            }
             
        },
        addtolist:(state,action) => {
            const book = action.payload
            state.wishlistBooks = [...state.wishlistBooks,book] 
        },
        updatedUserprofile:(state,action)=>{

            state.userProfileDetails.fullname = action.payload.fullname
            state.userProfileDetails.email = action.payload.email
            state.userProfileDetails.dateofbirth = action.payload.dateofbirth
            state.userProfileDetails.place = action.payload.place
            state.userProfileDetails.address = action.payload.address
            state.userProfileDetails.gender = action.payload.gender
            state.userProfileDetails.phonenumber = action.payload.phonenumber
        },
        changeUserProfileImage:(state,action)=>{
            state.userProfileDetails.image = action.payload.profileimage
        },
        adminEditedValue:(state,action)=>{
            state.profileDetails.fullname = action.payload.fullname
            state.profileDetails.email = action.payload.email
            state.profileDetails.address = action.payload.address
            state.profileDetails.gender = action.payload.gender
            state.profileDetails.phonenumber = action.payload.phonenumber
            state.profileDetails.place = action.payload.place

        },
        sendUpdatedAdminProfileImage:(state,action) => {
            state.profileDetails.profileimage = action.payload.profileimage
        },
        sendUpdatedLibrarianDetail:(state,action)=>{
            state.librarianProfileDetails.fullname = action.payload.fullname
            state.librarianProfileDetails.email = action.payload.email
            state.librarianProfileDetails.address = action.payload.address
            state.librarianProfileDetails.gender = action.payload.gender
            state.librarianProfileDetails.place = action.payload.place
            state.librarianProfileDetails.dateofbirth = action.payload.dateofbirth
            state.librarianProfileDetails.phonenumber = action.payload.phonenumber
        },
        sendUpdatedLibrarianProfileImage:(state,action) => {
            state.librarianProfileDetails.profileimage = action.payload.image

        },
        sendUpdatedBookValue:(state,action)=>{

            const allBooks = JSON.parse(JSON.stringify(state.allBooks));            
            const index = allBooks.findIndex((book)=>book._id === action.payload._id);

               state.allBooks[index].title = action.payload.title
               state.allBooks[index].author = action.payload.author
               state.allBooks[index].genre = action.payload.genre
               state.allBooks[index].publisher = action.payload.publisher
               state.allBooks[index].publicationyear = action.payload.publicationyear
               state.allBooks[index].totalcopies = action.payload.totalcopies
               state.allBooks[index].shelflocationnumber = action.payload.shelflocationnumber
               state.allBooks[index].bookstatus = action.payload.bookstatus
               state.allBooks[index].category = action.payload.category
               state.allBooks[index].price = action.payload.price
               state.allBooks[index].summary = action.payload.summary            
        },
        sendUpdatedBookImage:(state,action) => {
            const allBooks = JSON.parse(JSON.stringify(state.allBooks));            
            const index = allBooks.findIndex((book)=>book._id === action.payload._id);

            state.allBooks[index].bookimage = action.payload.bookimage

        },
        changeColorState:(state,action)=>{

           const wishlistBooks = JSON.parse(JSON.stringify(state.wishlistBooks));           
           const booknames = wishlistBooks.map((book)=>book.title);             
           const allBook = JSON.parse(JSON.stringify(state.allBooks));
           
  
           if(booknames.length === 0 ){
            for ( let i = 0 ; i<=allBook.length; i++) {
                
                 if(allBook[i]){
                        const Index = allBook.findIndex((book)=>book.title === allBook[i].title)
                        state.allBooks[Index].colorstatus = false;                                              
                 }
            }
            
    
            
        }else if (booknames.length > 0){
            
            for ( let i = 0 ; i<=booknames.length;i++) {
                if(booknames[i]){
                  let tempvar =  allBook.find((book)=>book.title === booknames[i]) ;
                  const Index = allBook.findIndex((book)=>book.title === tempvar.title);
                    state.allBooks[Index].colorstatus = true
                }
                    
            }
        }
        },
        sendApprovedReturn:(state,action) => {
            const allborrowBookRequest = JSON.parse(JSON.stringify(state.borrowBookRequest));
            console.log(action.payload);
            
            const index  = allborrowBookRequest.findIndex((bookRequest) => bookRequest._id === action.payload);
            console.log('index=',index);
            
            state.borrowBookRequest[index].return = 'approved'
        },
        deleteLibraryTime:(state,action)=>{
            const libraryTime = JSON.parse(JSON.stringify(state.libraryTime));
            const index = libraryTime.findIndex((time)=>time._id === action.payload.id);
            state.libraryTime.splice(index,1)
        },
        updateReserveStatus:(state,action)=>{
            const reservedUserBookDetails = JSON.parse(JSON.stringify(state.reservedUserBookDetails));
            const sameRegisterNumberRequest = reservedUserBookDetails.filter((request)=>request.registernumber === action.payload.registernumber);
            const sameBook = sameRegisterNumberRequest.find((request)=>request.bookname === action.payload.bookname);
            const sameBookIndex = reservedUserBookDetails.findIndex((request)=>request.bookname === sameBook.bookname ) ;            
            state.reservedUserBookDetails[sameBookIndex].reservemessage = 'sended' 
        }
    }
});

 export const {
               displayAllbooks,editBook,sendProfileDetails,logOut,sendCategory,sendAllUsers,
               sendEdituserValue,displayBookFeedBack,displayLibraryServiceFeedback,
               sendMemberShipRequest,sendMemberDetails,sendBookBorrowRequest,sendBorrowDetails,
               returnBook,sendAllReturnBookUserDetails,reservedBookDetail,sendReservedDetails,
               sendBookProblems,deleteBookProblem,sendMostBorrowedBooks,sendMostReservedBooks,
               memberShipExpired,sendExpiredmembership,deleteExpiredMemberShip,sendUnusedBooks,
               sendFineDetails,sendMissingBook,deleteMissingBooks,sendTime,sendLibraryDetails,
               newBookRequest,deleteBookNewRequest,sendExpiredBorrowedBook,sendNotificationDetails,
               viewLibraryTime,sendLibraryTime,updateFineStatus,sendRenewalRequest,renewalEdit,
               deleteAcceptedRenewalRequest,sendLibrarianProfileDetails,logOutLibrarian,sendMemberShipDetails,
               sendBookId,borrowDetails,userReservedBookDetails,sendUserProfileDetails,logOutUser,
               renewData,sendWishlistItems,deleteWishlistbook,changeIconColor,changeTrendIconColor,
               changebookCategoryIconColor,sendSearchResults,changeSearchBookColor,deleteBorrowRequest,
               deleteReturnUserDetails,deleteReservedUserDetails,deleteRegisterdUser,deleteBookFeebacks,
               deleteBookFeedbacks,sendLoginDetails,sendAddedBook,deleteAddedBook,feedbackSend,membershipSend,
               sendAddedUser,memberShipUpdate,borrowRequestUpdation,sendUpdatedRenewalRequest,addtolist,changeSearchBookColorReverse,
               updatedUserprofile,changeUserProfileImage,adminEditedValue,sendUpdatedAdminProfileImage,sendUpdatedLibrarianDetail,
               sendUpdatedLibrarianProfileImage,sendUpdatedBookValue,sendUpdatedBookImage,reservedBook,
               changeColorState,sendUpdatedExpireStatus,sendApprovedReturn,updatedBorrowNotification,deleteLibraryTime,
               updateReserveStatus
            }  =  slice.actions;

export default slice.reducer;