const bcrypt = require("bcrypt");
const { tokenGenerate } = require("../Util/generateToken");
const memberShip = require("../Models/MemberShipSchema");
const books = require("../Models/bookSchema");
const fs = require('fs');
const borrowBook = require("../Models/borrowBooksSchema");
const reserveBook = require("../Models/reserveBooksSchema");
const inventoryManage = require("../Models/inventoryManagementSchema");
const sendEmail = require("../Util/mail");
const returnDetail = require("../Models/returnPersonSchema");
const fineDetails = require("../Models/fineSchema");
const missingDetails = require("../Models/missingBookSchema");
const timeDetails = require("../Models/libraryTimeSchema");
const userFeedback = require("../Models/feedbackSchema");
const adminRegister = require("../Models/adminSchema");
const userRegister = require("../Models/userSchema");
const newBookRequest = require("../Models/newBookRequestSchema");
const sendNotification = require("../Util/reservedBookAvailableMail");
const MembershipExpiringNotification = require("../Util/memberShipExpirinigMail");
const sendReturnExpiringNotification = require("../Util/returnDateExpiringMail");
const libraryServiceFeedback = require("../Models/libraryServiceFeedbackSchema");
const registerdLibrarian = require("../Models/librarianSchema");
const registrationDetails = require("../Models/registrationsSchema");


exports.addUser = async (req,res,next)=>{

    const {fullname,email,password,dateofbirth,place,address,gender,phonenumber} = req.body;

    if(!fullname || !email || !password || !dateofbirth || !place || !address || !gender || !phonenumber){
        return res.status(400).json({
            success:false,
            message:'must fill all fields'
        });
    }
    
    try {
        const hashedPassword = await bcrypt.hash(password,10);
        
        if(!req.file){
            return res.status(400).json({
                success:false,
                message:'please upload a image'
            });
        }


   const registrationData =  await registrationDetails.create({
    fullname,
    email,
    password:hashedPassword,
    dateofbirth,
    place,
    address,
    gender,
    phonenumber,
    profileimage:req.file.path
   });


   return res.status(201).json({
        success:true,
        message:'Registration Completed',
        registrationData
    });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
} 
exports.displayProfile = async (req,res,next)=>{

    const personId = req.Id;
    
    if(!personId){
       return res.status(400).json({
          success:false,
          message:'No PersonID'
       });
    }
    
    try {
        const findPerson = await adminRegister.findById(personId);

        if(!findPerson){
            return res.status(404).json({
                success:false,
                message:'user not found'
            });
        }

        const personProfileData = {
            id:findPerson._id,
            fullname:findPerson.fullname,
            email:findPerson.email,
            address:findPerson.address,
            phonenumber:findPerson.phonenumber,
            profileimage:findPerson.profileimage,
            place:findPerson.place,
            gender:findPerson.gender,
            role:findPerson.role
        } 

        return res.status(200).json({
            success:true,
            message:'profile displayed',
            personProfileData
        });
    } catch (error) {
     return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
exports.updateAdminProfile = async (req,res,next)=>{

    const personId = req.Id;    
    const {fullname,email,phonenumber,gender,address,place} = req.body;

    if(!personId){
        return res.status(400).json({
            success:false,
            message:'no person id'
        });
    }

    if(!fullname || !email || !phonenumber || !gender || !address || !place){
       return res.status(400).json({
        success:false,
        message:'must fill all fields correctly'
       });
    }

    try {
        const findPerson = await adminRegister.findById(personId);

    if(!findPerson){
        return res.status(404).json({
            success:false,
            message:'user not found'
        });
    }

 

    findPerson.fullname = fullname;
    findPerson.email = email;
    findPerson.phonenumber = phonenumber;
    findPerson.gender = gender;
    findPerson.address = address;
    findPerson.place = place;

    findPerson.save();

    return res.status(200).json({
        success:true,
        message:'profile upadation completed',
        
    });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }

}
exports.updateAdminProfileImage = async (req,res)=>{

    const adminId = req.Id;
    
    if(!adminId){
        return res.status(401).json({
            success:false,
            message:'unauthorized person '
        });
    }

   try {
    const findedadmin = await adminRegister.findById(adminId);

    const profilePath = findedadmin.profileimage
    
    if(!req.file){  
        return res.status(400).json({
            success:false,
            message:'please upload a file'
        })
    }

    if(fs.existsSync(profilePath)){
        fs.unlinkSync(profilePath)
    }

    findedadmin.profileimage = req.file.path;
    findedadmin.save();

    return res.status(200).json({
        success:true,
        message:'profile image updation completed',
        findedadmin
    })
   } catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message
    })
   }
}
exports.deletePerson = async (req,res,next)=>{

    const  personId = req.params.id;

    if(!personId){
        return res.status(400).json({
            success:false,
            message:' no person id'
        });
    }

   try {
    const findedUser = await userRegister.findById(personId);
    
    if(!findedUser){
        return res.status(404).json({
            success:false,
            message:'user not found'
        });
    }

    const profileImage = findedUser.profileimage;

    if(fs.existsSync(profileImage)){
        fs.unlinkSync(profileImage)
    }

    const findPerson = await userRegister.findByIdAndDelete(personId);

    if(!findPerson){
        return res.status(404).json({
            success:false,
            message:'user no found'
        });
    }
    return res.status(200).json({
        success:true,
        message:'you did delete user successfully'
    });
   } catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message
    });
   }
}
exports.viewAllMemberShipRequest = async (req,res) =>{

    try {
        const allMemberShipRequest = await memberShip.find();

    if(!allMemberShipRequest){
        return res.status(404).json({
            success:false,
            message:'no membership found'
        });
    }

    if(allMemberShipRequest.length>0){
        return res.status(200).json({
            success:true,
            message:'memberShip request displayed',
            allMemberShipRequest
        });
    }
    
    } catch (error) {
        return res.status(500).json({
            success:flase,
            message:error.message,
        });
    }
}
exports.updateMemberShip = async (req,res,next)=>{

    const personId = req.params.id;
    const {membershipstatus,email,registernumber,duedate} = req.body;

    if(!personId){
        return res.status(400).json({
            success:false,
            message:'no recipe id'
        });
    }

    if(!membershipstatus||!email||!registernumber||!duedate){
        return res.status(400).json({
            success:false,
            message:'must fill all fields'
        });
    }
        
    try {

        const findPerson = await memberShip.findById(personId);        
        const checkRegisterdPerson = await registrationDetails.findOne({email});

        if(!checkRegisterdPerson){
            return res.status(404).json({
                success:false,
                message:'invalid email,user not found'
            });
        }
        
    if(!findPerson){
        return res.status(404).json({
            success:false,
            message:'user not found'
        });
    }

    if(!membershipstatus){
        return res.status(400).json({
            success:false,
            message:'please fill status field'
        });
    }

    findPerson.status = membershipstatus;
    findPerson.registrationnumber = registernumber;
    findPerson.duedate = duedate;
    findPerson.save();

    return res.status(200).json({
        success:true,
        message:'membership status updated successfully'
    });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
exports.addbook = async (req,res,next)=>{

    const {title,author,genre,publisher,publicationyear,totalcopies,shelflocationnumber,bookstatus,category,price,summary} = req.body;

    if(!title||!author||!genre||!publisher||!publicationyear||!totalcopies||!shelflocationnumber||!bookstatus||!category||!price || !summary){
        return res.status(400).json({
            success:false,
            message:"please fill all fileds correctly"
        });
    }
            if(!req.file){
                return res.status(400).json({
                    success:false,
                    message:'please upload a image'
                })
            }

            const image = req.file.path
    try {
        const book = await books.create({
            title,
            author,
            genre,
            publisher,
            publicationyear,
            totalcopies,
            shelflocationnumber,
            bookstatus,
            category,
            bookimage:image,
            price,
            summary
        });
    
       return res.status(201).json({
            success:true,
            message:'book added successfully',
            book
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
exports.editBook = async (req,res,next)=>{

    const bookId = req.params.id;
    const {title,author,genre,publisher,publicationyear,totalcopies,shelflocationnumber,bookstatus,category} = req.body;

    if(!bookId){
        return res.status(400).json({
            message:'no recipe id'
        });
    }

    try {
        const findedBook = await books.findById(bookId); 

    if(!findedBook){
        return res.status(404).json({
            success:false,
            message:'book not found'
        });
    }   

    findedBook.title  = title;
    findedBook.author = author;
    findedBook.genre = genre;
    findedBook.publisher = publisher;
    findedBook.publicationyear = publicationyear;
    findedBook.totalcopies = totalcopies;
    findedBook.shelflocationnumber = shelflocationnumber;
    findedBook.bookstatus = bookstatus;
    findedBook.category = category;

    findedBook.save();

    return res.status(200).json({
        success:true,
        message:'book updation completed',
        findedBook
    });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
exports.editBookImage = async (req,res,next) => {

    const bookId = req.params.id;
    
    if(!bookId){
        return res.status(400).json({
            success:false,
            message:'no book id'
    })
    }

   try {
    const checkBook = await books.findById(bookId);

    if(!checkBook){
        return res.status(404).json({
            success:false,
            message:'book not found'
    })
    }

    const oldPath = checkBook.bookimage

    if(!req.file){
        return res.status(400).json({
            success:false,
            message:'please upload a image'
    }) 
    }

    if(req.file){
        if(fs.existsSync(oldPath)){
            fs.unlinkSync(oldPath)
        }

        checkBook.bookimage = req.file.path;
        checkBook.save();

        return res.status(200).json({
            success:true,
            message:'book image updation completed',
            checkBook
        });
    }
   } catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message
    })
   }


}
exports.deleteBook = async (req,res,next)=>{

    const bookId = req.params.id;

    if(!bookId){
        return res.status(400).json({
            success:false,
            message:'no recipe id'
        });
    }

    try {
        const findedBook = await books.findById(bookId);

    if(!findedBook){
        return res.status(400).json({
            success:false,
            message:'book is not found'
        })
    }

    const oldPath = findedBook.bookimage;

    if(fs.existsSync(oldPath)){
        fs.unlinkSync(oldPath);
    }

    await books.findByIdAndDelete(bookId);
    
    return res.status(200).json({
        success:true,
        message:'book deleted successfully'
    });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
exports.viewAllBooks = async (req,res,next)=>{

    try {
        const allBooks = await books.find();

    if(!allBooks){
        return res.status(404).json({
            success:false,
            message:'books not found'
        });
    }

    return res.status(200).json({
        success:true,
        message:'books displayed',
        allBooks
    });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
            
        });
    }

}
exports.viewBorrowedBooks = async (req,res,next)=>{

    const allBorrowedBooks = await borrowBook.find();

    if(!allBorrowedBooks){
        return res.status(404).json({
            success:false,
            message:'no books found'
        });
    }

    return res.status(200).json({
        success:true,
        message:'books displayed successfully',
        allBorrowedBooks
    });
}
exports.approveBorrowingRequest = async (req,res,next)=>{

    const borrowerId = req.params.id;
    const {fullname,email,request,borroweddate,duedate,borrowstatus} = req.body;

    if(!borrowerId){
        return res.status(400).json({
            success:false,
            message:'no borrowerid'
        });
    }

    if(!fullname || !email || !request || !borroweddate|| !duedate || !borrowstatus){
        return res.status(400).json({
            success:false,
            message:'must fill all fields'
        });
    }

    try {
        const findedPerson = await borrowBook.findById(borrowerId);

    if(!findedPerson){
        return res.status(404).json({
            success:false,
            message:'user not found'
        });
    }

    const matchEmail = await borrowBook.findOne({email});
    
    if(!matchEmail){
        return res.status(404).json({
            success:false,
            message:'invalid email , user not found'
        });
    }
    
    if(borroweddate === "yyyy-mm-dd"){
        findedPerson.return = "nothing"
    }else {
        findedPerson.return = "pending"
    }


    findedPerson.fullname = fullname;
    findedPerson.email = email;
    findedPerson.request = request;
    findedPerson.borroweddate = borroweddate;
    findedPerson.duedate = duedate;
    findedPerson.borrowstatus = borrowstatus;
    findedPerson.save();

    const checkReservedUser = await reserveBook.findOne({email});
    
    
    if(checkReservedUser){
        if(checkReservedUser.bookname === findedPerson.bookname){
            checkReservedUser.borrowstatus = borrowstatus
            checkReservedUser.save();
        }
    }

    return res.status(200).json({
        success:true,
        message:'request updation completed successfully'
    });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
exports.approveReturn = async (req,res,next) => {

    const borrowerId = req.params.id;    
    const {fullname,email,bookname,registernumber,address,borroweddate,returndate,duedate,returnstatus,numberofoverduedays,fineperday,totalfineamount} = req.body;
    
    if(!borrowerId){
        return res.status(400).json({
            success:false,
            message:'no borrower id'
        })
    }

    if(!fullname || !email || !bookname || !registernumber || !address || !borroweddate ||!returndate || !duedate || !returnstatus || !numberofoverduedays || !fineperday || !totalfineamount){
        return res.status(400).json({
            success:false,
            message:'must fill all fields'
        });
    }

    const findedBorrower = await borrowBook.findById(borrowerId);
    
    if(!findedBorrower){
        return res.status(404).json({
            success:false,
            message:'user not found'
        });
    }

    if( email !== findedBorrower.email){
       return res.status(404).json({
            success:false,
            message:'invalid email , user not found'
        });
    }else if(registernumber !== findedBorrower.registernumber){
        return res.status(404).json({
            success:false,
            message:'invalid register number , user not found'
        });
    }else if(bookname !== findedBorrower.bookname){
        return res.status(404).json({
            success:false,
            message:'invalid bookname , user not found'
        });
    }
    
    findedBorrower.return = returnstatus;
    findedBorrower.save();

    const returnPersonDetail = await returnDetail.create({
        fullname,
        email,
        bookname,
        registernumber,
        address,
        returndate,
        duedate
    })

     const fineRecord = await fineDetails.create({
        fullname,
        email,
        bookname,
        borroweddate,
        duedate,
        numberofoverduedays,
        fineperday,
        totalfineamount
    });



    return res.status(201).json({
        success:true,
        message:'approvel completed',
    });
}
exports.deleteApprovedReturns = async (req,res) =>{

    const borrowId = req.params.id;

    if(!borrowId){
        return res.status(400).json({
            success:false,
            message:'no borrow id'
        });
    }

   try {
    const deletedBorrowedDetails = await borrowBook.findByIdAndDelete(borrowId);

    return res.status(200).json({
        success:true,
        message:'deletion successfully completed'
    })
   } catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message
    });
   }

}
exports.viewReturnedBookUserDetails = async (req,res)=>{

    const allReturnedUsers = await returnDetail.find();
    

    if(!allReturnedUsers){
        return res.status(404).json({
            success:false,
            message:'returned users details not found'
        });
    }

    return res.status(200).json({
        success:true,
        message:'returned user details displayed',
        allReturnedUsers
    });

}
exports.deleteReturnedBookDetails = async (req,res) => {

    const returnId = req.params.id;
    
    if(!returnId){
        return res.status(400).json({
            success:false,
            message:'no return id'
        })
    }

    try {
        const deletedReturnDetail = await returnDetail.findByIdAndDelete(returnId);

    return res.status(200).json({
        success:true,
        message:'deletion completed'
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
exports.viewReservedBooks = async (req,res,next)=>{

    const allreservedBooks = await reserveBook.find();

    if(!allreservedBooks){
        return res.status(404).json({
            success:false,
            message:'no books found'
        });
    }

    return res.status(200).json({
        success:true,
        message:'books displayed successfully',
        allreservedBooks
    });
}
exports.approveReservedRequest = async (req,res,next)=>{

    const reservedId = req.params.id;
    
    
    const {fullname,email,request,deadline,message} = req.body;
    
    if(!reservedId){
        return res.status(400).json({
            success:false,
            message:'no reserved id'
        });

    }

    if(!fullname || !email || !request ||!deadline || !message){
        return res.status(400).json({
            success:false,
            message:'must fill all fields'
        });
    }

   try {

    const findedPerson = await reserveBook.findById(reservedId);
    
    if(!findedPerson){
        return res.status(404).json({
            success:false,
            message:'user not found'
        });
    }
    
    const matchEmail = await reserveBook.findOne({email});
     
    if(!matchEmail){
        return res.status(404).json({
            success:false,
            message:'invalid email,user not found'
        });
    }

    findedPerson.request = request;
    findedPerson.deadline = deadline;
    findedPerson.save();


    const reservedUser= {   
        email,
        message,
        deadline
    }

    req.notificationDetails = reservedUser;
    sendNotification(req,res);

   } catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message
    });
   }
}
exports.manageInventory = async (req,res,next) => {

    const { booktitle , publisher , price ,problem } = req.body;

    if(!booktitle ||!publisher ||!price ||!problem){
        return res.status(400).json({
            success:false,
            message:'must fill all fields'
        });
    }

   try {
    const inventoryManageBooks = inventoryManage.create({
        booktitle,
        publisher,
        price,
        problem
    });

    return res.status(201).json({
        success:true,
        message:'you are add book problem successfully'
    });

   } catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message
    });
   }
}
exports.viewBooksProblems = async (req,res)=>{

    const allBookproblems = await inventoryManage.find();

    if(!allBookproblems){
        return res.status(404).json({
            success:false,
            message:'no books probles found'
        });
    }

    return res.status(200).json({
        success:true,
        message:'books problems  displayed successfully',
        allBookproblems
    })
}
exports.deleteBookProblem = async (req,res)=>{

    const problemId = req.params.id;

    if(!problemId){
        return res.status(400).json({
            success:false,
            message:"no problem id"
        });
    }

    try {
        const deletedProblem = await inventoryManage.findByIdAndDelete(problemId);

    if(!deletedProblem){
        return res.status(404),json({
            success:false,
            message:'problem not found , deletion faild '
        })
    }

    return res.status(200).json({
        success:true,
        message:'deletion completed'
    });

    } catch (error) {
        return res.status(500).json({
        success:false,
        message:'deletion completed'
    });
  }
}
exports.orderNewBooks = async(req,res,next)=>{

    const {email,libraryname ,fullname,address,place,phonenumber,bookname,subject} = req.body;

    if( !email ||!libraryname || !fullname || !address || !place ||!phonenumber || !bookname || !subject){
        return res.status(400).json({
            success:false,
            message:'must fill all fields !'
        });
    }

    const orderDetails = {
        libraryname,
        phonenumber,
        address,
        place,
        bookname,
        email,
        subject
    }
    
    req.orderBook = orderDetails;
    try {
        sendEmail(req,res)
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
exports.cancelReservation = async (req,res)=>{

    const reservedId = req.params.id;

    if(!reservedId){
        return res.status(400).json({
            success:false,
            message:'no reserved id'
        });
    }

    try {
        const checkReservedPerson = await reserveBook.findById(reservedId);

    if(!checkReservedPerson){
        return res.status(404).json({
            success:false,
            message:'user not found'
        });
    }

    await reserveBook.findByIdAndDelete(checkReservedPerson._id);

    return res.status(200).json({
        success:true,
        message:'reservation canceled successfully'
    });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}  

exports.showExpiredMemberships = async (req,res)=>{

    const allMembershipUsers  = await memberShip.find();
    
    const currentDate = new Date().getDate();
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const numbers = [1,2,3,4,5,6,7,8,9];
    
    if(numbers.includes(currentMonth) && numbers.includes(currentDate)){
        
        const date = `${currentYear}-${'0'+ currentMonth}-${'0' + currentDate}`                                
        const membershipExpiredUsers = allMembershipUsers.filter((membershipUser)=> membershipUser.duedate === '0000-00-00' ? (null): membershipUser.duedate <= date);
        const allMemberships = await memberShip.find()

        
        if(membershipExpiredUsers.length === 0){
            for (let i = 0; i < allMemberships.length; i++) {

                if(allMemberships[i]){

                    let index = allMemberships.findIndex((request)=>request._id.toString() === allMemberships[i]._id.toString());                            
                    const item = allMemberships[index]
                    item.expiredstatus = 'nothing'
                    item.save()                      
                }
                
                
            }
        }
        else if (membershipExpiredUsers.length > 0){
            for(let i = 0 ; i<membershipExpiredUsers.length ; i++ ){
                if(membershipExpiredUsers[i]){                    
                    const index = allMembershipUsers.findIndex((request)=>request._id.toString() === membershipExpiredUsers[i]._id.toString());
                        const item = allMembershipUsers[index]
                        item.expiredstatus = 'expired'
                        item.save()                     
                }
            }
        }

       return res.status(200).json({
            success:true,
            membershipExpiredUsers
        });

        } else if(numbers.includes(currentMonth) &&  !numbers.includes(currentDate)){
            const date = `${currentYear}-${'0'+ currentMonth}-${currentDate}` 
            const membershipExpiredUsers = allMembershipUsers.filter((membershipUser)=> membershipUser.duedate === '0000-00-00' ? (null): membershipUser.duedate <= date);               
            const allMemberships = await memberShip.find()

             
        if(membershipExpiredUsers.length === 0){
            for (let i = 0; i < allMemberships.length; i++) {

                if(allMemberships[i]){

                    let index = allMemberships.findIndex((request)=>request._id.toString() === allMemberships[i]._id.toString());                            
                    const item = allMemberships[index]
                    item.expiredstatus = 'nothing'
                    item.save()                      
                }
                
                
            }
        }
        else if (membershipExpiredUsers.length > 0){
            for(let i = 0 ; i<membershipExpiredUsers.length ; i++ ){
                if(membershipExpiredUsers[i]){                    
                    const index = allMembershipUsers.findIndex((request)=>request._id.toString() === membershipExpiredUsers[i]._id.toString());
                        const item = allMembershipUsers[index]
                        item.expiredstatus = 'expired'
                        item.save()                     
                }
            }
        }

            return res.status(200).json({
                 success:true,
                 membershipExpiredUsers,
     
             })
        }else if(!numbers.includes(currentMonth) && numbers.includes(currentDate) ){

            const date = `${currentYear}-${ currentMonth}-${'0' + currentDate}` 
            const membershipExpiredUsers = allMembershipUsers.filter((membershipUser)=>  membershipUser.duedate === '0000-00-00' ? (null): membershipUser.duedate <= date);
            const allMemberships = await memberShip.find()

             
        if(membershipExpiredUsers.length === 0){
            for (let i = 0; i < allMemberships.length; i++) {

                if(allMemberships[i]){

                    let index = allMemberships.findIndex((request)=>request._id.toString() === allMemberships[i]._id.toString());                            
                    const item = allMemberships[index]
                    item.expiredstatus = 'nothing'
                    item.save()                      
                }
                
                
            }
        }
        else if (membershipExpiredUsers.length > 0){
            for(let i = 0 ; i<membershipExpiredUsers.length ; i++ ){
                if(membershipExpiredUsers[i]){                    
                    const index = allMembershipUsers.findIndex((request)=>request._id.toString() === membershipExpiredUsers[i]._id.toString());
                        const item = allMembershipUsers[index]
                        item.expiredstatus = 'expired'
                        item.save()                     
                }
            }
        }
            return res.status(200).json({
                 success:true,
                 membershipExpiredUsers,
     
             })
        }else{
            const date = `${currentYear}-${ currentMonth}-${ currentDate}`             
            const membershipExpiredUsers = allMembershipUsers.filter((membershipUser)=>membershipUser.duedate <= date);
            const allMemberships = await memberShip.find()

             
        if(membershipExpiredUsers.length === 0){
            for (let i = 0; i < allMemberships.length; i++) {

                if(allMemberships[i]){

                    let index = allMemberships.findIndex((request)=>request._id.toString() === allMemberships[i]._id.toString());                            
                    const item = allMemberships[index]
                    item.expiredstatus = 'nothing'
                    item.save()                      
                }
                
                
            }
        }
        else if (membershipExpiredUsers.length > 0){
            for(let i = 0 ; i<membershipExpiredUsers.length ; i++ ){
                if(membershipExpiredUsers[i]){                    
                    const index = allMembershipUsers.findIndex((request)=>request._id.toString() === membershipExpiredUsers[i]._id.toString());
                        const item = allMembershipUsers[index]
                        item.expiredstatus = 'expired'
                        item.save()                     
                }
            }
        }
       
            return res.status(200).json({
                 success:true,
                 membershipExpiredUsers,
     
             })
        }
      
}
exports.sendMembershipExpiringNotification = async (req,res,next) => {
    const membershipId = req.params.id;
    const {fullname,email,message} = req.body;

    if(!fullname || !email || !message){
        return res.status(400).json({
            success:false,
            message:'must fill all fileds'
        });
    }

    const memberDetails = {
        fullname,
        email,
        message
    }

    if(!membershipId){
        return res.status(400).json({
            success:false,
            message:'np membershipid'
        });
    }

    const findmembershipUser = await memberShip.findById(membershipId);

    if(!findmembershipUser){
        return res.status(404).json({
            success:false,
            message:'membership user not found'
        });
    }

    findmembershipUser.expiredstatus = 'expired'
    findmembershipUser.messagestatus = 'sended'
    findmembershipUser.save();

   req.expiringDetails =  memberDetails;
   MembershipExpiringNotification(req,res);
} 
exports.deleteExpiredMembership = async (req,res) =>{

    const membershipId = req.params.id;

    if(!membershipId){
        return res.status(400).json({
            successs:false,
            message:'no member ship id'
        });
    }

    try {
        const findmembership = await memberShip.findById(membershipId);

    if(!findmembership){
        return res.status(404).json({
            success:false,
            message:' membership not found'
        });
    }

    const imagePath = findmembership.file;
    const proofPath = findmembership.imageproof;

    if(fs.existsSync(imagePath)){
        fs.unlinkSync(proofPath);
    }

    if(fs.existsSync(proofPath)){
        fs.unlinkSync(proofPath)
    }

    await memberShip.findByIdAndDelete(membershipId);

    return res.status(200).json({
        success:true,
        message:'deletion completed'
    });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }

}
exports.viewMostBorrowedBooks = async (req,res,next) => {

            const allBooks = await books.find();
            
            if(!allBooks){
                return res.status(404).json({
                    success:false,
                    message:'books are not found'
                });
            }

            const mostBorrowedBooks = allBooks.filter((book)=>book.borrowcount >0);

            return res.status(200).json({
                success:true,  
                message:'most borrowed books are displayed',
                mostBorrowedBooks
            });


}
exports.viewMostReservedDemandedBook = async (req,res,next) =>{

    const allbooks = await books.find();

    if(!allbooks){
        return res.status(404).json({
            success:false,
            message:'books not found'
        });
    }

    const mostReservedBook = allbooks.filter((book)=>book.reservedcount > 0);

    if(!mostReservedBook){
        return res.status(404).json({
            success:false,
            message:'no most reserved books '
        });
    }

    return res.status(200).json({
        success:200,
        message:'most reserved books are displayed',
        mostReservedBook
    });
}

exports.viewUnusedBooks = async (req,res,next) =>{

    const allbooks = await books.find();

    if(!allbooks){
        return res.status(404).json({
            success:false,
            message:'books not found'
        });
    }

    const unusedBook = allbooks.filter((book)=>book.borrowcount === '0');

    if(!unusedBook){
        return res.status(404).json({
            success:false,
            message:'no unused books '
        });
    }

    return res.status(200).json({
        success:true,
        message:'unused displayed',
        unusedBook
    });
}
exports.viewTotalFineammount = async (req,res,next)=>{
    const allFine = await fineDetails.find();

    let sum = 0;
    allFine.forEach((data)=>{
       sum = sum + Number(data.totalfineamount);
    });

  
    return res.status(200).json({
        success:true,
        message:'total fine ammount is  calculated',
        allFine
    });
}
exports.addMissingBook = async (req,res,next)=>{

    const {bookname,author,price,numberofmissingcopies} = req.body;

    if(!bookname||!author||!price||!numberofmissingcopies){
        return res.status(400).json({
            success:false,
            message:'must fill all fields'
        });
    }  

    const missingBook = await missingDetails.create ({
        bookname,
        author,
        price,
        numberofmissingcopies
    });

    return res.status(201).json({
        success:true,
        message:'you are successfully added missing book'
    });
} 
exports.viewMissingBook = async (req,res,next) => {

    const allMissingBook = await missingDetails.find();

    if(!allMissingBook){
        return res.status(404).json({
            success:false,
            message:'no missing books are displayed'
        });
    }

    return res.status(200).json({
        success:true,
        message:'missing book displayed',
        allMissingBook
    });

}
exports.deleteMissingBook = async (req,res)=>{

    const bookId = req.params.id;

    if(!bookId){
        return res.status(400).json({
            success:false,
            message:'no book id'
        });
    }

    const findBook = await missingDetails.findByIdAndDelete(bookId);
    
    if(!findBook){
        return res.status(404).json({
            success:false,
            message:'book not found'
        });
    }

    return res.status(200).json({
        success:true,
        message:'deletion completed'
    });

}
exports.libraryTime = async (req,res,next) => {

    const {openingtime,closingtime,workingdays} = req.body;
    
    if(!openingtime || !closingtime || !workingdays){
        return res.status(400).json({
            success:false,
            message:'must fill allfields'
        });
    }
    const days = workingdays.map((day)=>day);

    try {
        const time = await timeDetails.find();
    const length = time.length

    if(length === 0){
        const libraryTiming = await timeDetails.create({
            openingtime,
            closingtime,
            workingdays:days
        });
    
        return res.status(200).json({
            success:true,
            message:'time added completed'
        })
    }else{
        return res.status(200).json({
            success:false,
            message:'time details already mentioned,you can not add time'
        })
    }

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        }) 
    }
    
}
exports.viewNewBookRequest = async (req,res) => {

    const allNewBookRequest = await newBookRequest.find();

    if(!allNewBookRequest){
        return res.status(404).json({
            success:false,
            message:'no new book requests are available'
        });
    }

    return res.status(200).json({
        success:true,
        message:'newBookRequest displayed successfully',
        allNewBookRequest
    })
}
exports.deleteNewBookRequestDetails = async (req,res) =>{

    const newBookId = req.params.id;

    if(!newBookId){
        return res.status(400).json({
            success:false,
            message:'no new book id'
        });
    }

   try {
    const findedNewBook = await newBookRequest.findByIdAndDelete(newBookId);

    if(!findedNewBook){
        return res.status(404).json({
            success:false,
            message:'incorrect book id , deletion faild'
        });
    }
    return res.status(200).json({
        success:true,
        message:' new book request deleted successfully'
    });
   } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
   }
}
exports.viewBookFeedback = async (req,res,next)=>{

   try {
    const allFeedback = await userFeedback.find();

   if(!allFeedback){
    return res.status(404).json({
        success:false,
        message:'no feedback found'
    });
   }

   return res.status(200).json({
    success:true,
    message:'feedback displayed successfully',
    allFeedback
   });
   } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
   }
}
exports.deleteBookFeedback = async (req,res)=>{
    const feedbackId = req.params.id;   
    
    if(!feedbackId){
        return res.status(400).json({
            success:false,
            message:'no feedback id'
        });
    }

   try {
    const checkFeedback = await userFeedback.findByIdAndDelete(feedbackId);
    
    return res.status(200).json({
        success:true,
        message:'feedback did delete successfully'
    });
   } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
   }
}
exports.viewAllUsers = async (req,res,next)=>{
    
    const allUsers = await userRegister.find();

    if(!allUsers){
        return res.status(404).json({
            success:false,
            message:'no user found'
        });
    }

    return res.status(200).json({
        success:true,
        allUsers
    })
}
exports.editUserDetails = async (req,res)=>{

    const userId = req.params.id;
    const {fullname,username,email,dateofbirth,place,address,gender,phonenumber} = req.body;

    if(!userId){
        return res.status(400).json({
            success:false,
            message:'no user id'
        })
    }
    
    if(!fullname || !username || !email || !dateofbirth || !place || !address || !gender || !phonenumber){
        return res.status(400).json({
            success:false,
            message:'must fill all fields correctly'
        });
    }

   try {

    const findedUser = await userRegister.findById(userId);

    if(!findedUser){
        return res.status(404).json({
            success:false,
            message:'user not found'
        });
    }



    const alluser = await userRegister.find();
    const checkUsername = alluser.find((user)=>user.username === username);

    if(findedUser.username === username){

        findedUser.fullname = fullname;
        findedUser.username = username;
        findedUser.email = email;
        findedUser.dateofbirth = dateofbirth;
        findedUser.place = place;
        findedUser.address = address;
        findedUser.gender = gender;
        findedUser.phonenumber = phonenumber;

        findedUser.save();
        return res.status(200).json({
            success:true,
            message:'user updation successfully completed'
           });
    }else if(checkUsername){
        return res.status(400).json({
            success:false,
            message:'username already exist'
        })
        
    }else{
        findedUser.fullname = fullname;
        findedUser.username = username;
        findedUser.email = email;
        findedUser.dateofbirth = dateofbirth;
        findedUser.place = place;
        findedUser.address = address;
        findedUser.gender = gender;
        findedUser.phonenumber = phonenumber;

        findedUser.save();

        return res.status(200).json({
              success:true,
              message:'user updation successfully completed'
             });
    }
   
   } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
   }

}
exports.adminEditUserProfileImage = async (req,res) => {

    const userId = req.params.id;
    
    if(!userId){
        return res.status(400).json({
            success:false,
            message:'no user id'
        });
    }

    try {
        const findedUser = await userRegister.findById(userId);

    if(!findedUser){
        return res.status(404).json({
            success:false,
            message:'user not found'
        })
    }

    if(!req.file){
        return res.status(400).json({
            success:false,
            message:'please upload a image'
        })
    }

    const oldPath = findedUser.profileimage 

    if(fs.existsSync(oldPath)){
        fs.unlinkSync(oldPath)
    }

    findedUser.profileimage = req.file.path;
    findedUser.save()

    return res.status(200).json({
        success:true,
        message:'image updation completed'
    });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }


}

exports.viewLibraryServiceFeedback = async (req,res) => {

   try {
    const allFeedback = await libraryServiceFeedback.find();

    if(!allFeedback){
        return res.status(404).json({
            success:false,
            message:'no feedback found'
        });
    }

    return res.status(200).json({
        success:true,
        message:'all feedback successfully displayed',
        allFeedback
    });

   } catch (error) {
     return res.status(500).json({
        success:false,
        message:error.message,
        
     });
   }
}
exports.deleteLibraryServiceFeedback = async (req,res)=>{
    const feedbackId = req.params.id;   
    
    if(!feedbackId){
        return res.status(400).json({
            success:false,
            message:'no feedback id'
        });
    }

   try {
    await libraryServiceFeedback.findByIdAndDelete(feedbackId);
    
    return res.status(200).json({
        success:true,
        message:'feedback did delete successfully'
    });
   } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
   }
}
exports.automaticBookReturnExpiringNotification = async (req,res) => {

    const allBorrowedUsers  = await borrowBook.find();
    
    const currentDate = new Date().getDate();
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const numbers = [1,2,3,4,5,6,7,8,9];
    
    if(numbers.includes(currentMonth) && numbers.includes(currentDate)){
        
        const date = `${currentYear}-${'0'+ currentMonth}-${'0' + currentDate}`    
        const borrowedExpiredUsers = allBorrowedUsers.filter((borrowedUser)=>borrowedUser.duedate <= date );
        const borrowBookRequest = await borrowBook.find()

        
        if(borrowedExpiredUsers.length === 0){
            for (let i = 0; i < borrowBookRequest.length; i++) {

                if(borrowBookRequest[i]){

                    let index = borrowBookRequest.findIndex((request)=>request._id.toString() === borrowBookRequest[i]._id.toString());                            
                    const item = borrowBookRequest[index]
                    item.expirestatus = 'nothing'
                    item.save()                      
                }
                
                
            }
        }
        else if (borrowedExpiredUsers.length > 0){
            for(let i = 0 ; i<borrowedExpiredUsers.length ; i++ ){
                if(borrowedExpiredUsers[i]){                    
                    const index = borrowBookRequest.findIndex((request)=>request._id.toString() === borrowedExpiredUsers[i]._id.toString());
                        const item = borrowBookRequest[index]
                        item.expirestatus = 'expired'
                        item.save()                     
                }
            }
        }

        

       return res.status(200).json({
            success:true,
            borrowedExpiredUsers
        });

        } else if(numbers.includes(currentMonth) &&  !numbers.includes(currentDate)){
            const date = `${currentYear}-${'0'+ currentMonth}-${currentDate}` 

            const borrowedExpiredUsers = allBorrowedUsers.filter((borrowedUser)=>borrowedUser.duedate <= date);

            const borrowBookRequest = await borrowBook.find()


            if(borrowedExpiredUsers.length === 0){
                for (let i = 0; i < borrowBookRequest.length; i++) {

                    if(borrowBookRequest[i]){

                        let index = borrowBookRequest.findIndex((request)=>request._id.toString() === borrowBookRequest[i]._id.toString());                            
                        const item = borrowBookRequest[index]
                        item.expirestatus = 'nothing'
                        item.save()                      
                    }
                    
                    
                }
            }
            else if (borrowedExpiredUsers.length > 0){
                for(let i = 0 ; i<borrowedExpiredUsers.length ; i++ ){
                    if(borrowedExpiredUsers[i]){                    
                        const index = borrowBookRequest.findIndex((request)=>request._id.toString() === borrowedExpiredUsers[i]._id.toString());
                            const item = borrowBookRequest[index]
                            item.expirestatus = 'expired'
                            item.save()                     
                    }
                }
            }
            

            return res.status(200).json({
                 success:true,
                 borrowedExpiredUsers,
     
             })

        }else if(!numbers.includes(currentMonth) && numbers.includes(currentDate) ){

            const date = `${currentYear}-${ currentMonth}-${'0' + currentDate}` 
            const borrowedExpiredUsers = allBorrowedUsers.filter((borrowedUser)=>borrowedUser.duedate <= date);
            const borrowBookRequest = await borrowBook.find()

            
            
            if(borrowedExpiredUsers.length === 0){
                for (let i = 0; i < borrowBookRequest.length; i++) {

                    if(borrowBookRequest[i]){

                        let index = borrowBookRequest.findIndex((request)=>request._id.toString() === borrowBookRequest[i]._id.toString());                            
                        const item = borrowBookRequest[index]
                        item.expirestatus = 'nothing'
                        item.save()                      
                    }
                    
                    
                }
            }
            else if (borrowedExpiredUsers.length > 0){
                for(let i = 0 ; i<borrowedExpiredUsers.length ; i++ ){
                    if(borrowedExpiredUsers[i]){                    
                        const index = borrowBookRequest.findIndex((request)=>request._id.toString() === borrowedExpiredUsers[i]._id.toString());
                            const item = borrowBookRequest[index]
                            item.expirestatus = 'expired'
                            item.save()                     
                    }
                }
            }

            return res.status(200).json({
                 success:true,
                 borrowedExpiredUsers,
     
             })
        }else{
            const date = `${currentYear}-${ currentMonth}-${ currentDate}`  
           
            const borrowedExpiredUsers = allBorrowedUsers.filter((borrowedUser)=>borrowedUser.duedate <= date);
            const borrowBookRequest = await borrowBook.find()
           
            
            if(borrowedExpiredUsers.length === 0){
                for (let i = 0; i < borrowBookRequest.length; i++) {

                    if(borrowBookRequest[i]){

                        let index = borrowBookRequest.findIndex((request)=>request._id.toString() === borrowBookRequest[i]._id.toString());                            
                        const item = borrowBookRequest[index]
                        item.expirestatus = 'nothing'
                        item.save()                      
                    }
                    
                    
                }
            }
            else if (borrowedExpiredUsers.length > 0){
                for(let i = 0 ; i<borrowedExpiredUsers.length ; i++ ){
                    if(borrowedExpiredUsers[i]){                    
                        const index = borrowBookRequest.findIndex((request)=>request._id.toString() === borrowedExpiredUsers[i]._id.toString());
                            const item = borrowBookRequest[index]
                            item.expirestatus = 'expired'
                            item.save()                     
                    }
                }
            }

            return res.status(200).json({
                 success:true,
                 borrowedExpiredUsers,
     
             })
    }
}
exports.viewTime = async (req,res) => {

    const time = await timeDetails.find();

    if(!time){
        return res.status(404).json({
            success:false,
            message:'no time found'
        });
    }

    return res.status(200).json({
        success:true,
        message:'time displayed',
        time
    });
}
exports.updateLibraryTime = async (req,res,next) =>{

    const timeId = req.params.id;
    
    const {openingtime,closingtime,workingdays} = req.body;

    if(!openingtime || !closingtime || !workingdays){
        return res.status(400).json({
            success:false,
            message:'must fill all fileds'
        });
    }

    if(!timeId){
        return res.status(400).json({
            success:false,
            message:'no timing id'
        });
    }

    const findedTime = await timeDetails.findById(timeId);

    if(!findedTime){
        return res.status(404).json({
            success:false,
            message:'not found time'
        });
    }

    findedTime.openingtime = openingtime;
    findedTime.closingtime = closingtime;
    findedTime.workingdays = workingdays;

    findedTime.save();

    return res.status(200).json({
        success:true,
        message:'you are successfully updated time'
    });

}
exports.sendReturnDateExpiringNotification = async(req,res,next)=>{

    const borrowId = req.params.id;

    const {fullname,email,message,duedate,bookname,borroweddate} = req.body;

    if(!fullname || !email || !message || !duedate  || !bookname || !borroweddate){
        return res.status(400).json({
            success:false,
            message:'must fill all fileds'
        });
    }
 
        if(!borrowId){
            return res.status(400).json({
                    success:false,
                    message:'no borrower id'
            });
        }

        const findBorrower = await borrowBook.findById(borrowId);

        if(!findBorrower){
            return res.status(404).json({
                success:false,
                message:'borrower not found'
            });
        }

        findBorrower.expirestatus = 'expired'
        findBorrower.messagestatus = 'sended'
        findBorrower.save();
        
   
 
    const returnDetails = {
        fullname,
        email,
        message,
        duedate,
     
    }

   req.returnExpiringDetails =  returnDetails;
   sendReturnExpiringNotification(req,res)
}
exports.viewRegisterdLibrarians = async (req,res)=>{

    try {
        const allRegisterdLibrarians = await registerdLibrarian.find()

    return res.status(200).json({
        success:true,
        allRegisterdLibrarians
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })  
    }
}
exports.deleteLibraryTime = async (req,res) => {
    const timeId = req.params.id;

    if(!timeId){
        return res.status(400).json({
            success:false,
            message:'no time id'
        })
    }

    const findTime = await timeDetails.findById(timeId);

    if(!findTime){
        return res.status(404).json({
            success:false,
            message:'time details not found'
        })
    }

    await timeDetails.findByIdAndDelete(timeId)

    return res.status(200).json({
        success:true,
        message:'deletion completed'
    });
}
