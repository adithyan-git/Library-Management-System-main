const bcrypt = require("bcrypt"); 
const registerdLibrarian = require("../Models/librarianSchema");
const { tokenGenerate } = require("../Util/generateToken");
const borrowBook = require("../Models/borrowBooksSchema");
const fineDetails = require("../Models/fineSchema");
const fs = require('fs');
const renewRequests = require("../Models/renewBookRequests");



exports.vewRenewalRequest = async (req,res)=>{

    const renewalRequests = await renewRequests.find();

    if(!renewalRequests){
        return res.status(404).json({
            success:false,
            message:'renewal requests are empty'
        });
    }

    return res.status(200).json({
        success:true,
        message:'renewal requests  displayed',
        renewalRequests
    })
}
exports.acceptRenewRequestandUpdateBorrowingDetails = async (req,res)=>{

    const userId = req.params.id;
    
    const {email,registernumber,duedate,extendingdate,status} = req.body;

    if(!email || !registernumber || !duedate || !extendingdate || !status){
        return res.status(400).json({
            status:false,
            message:'must fill all fields'
        });
    }

    if(!userId){
        return res.status(400).json({
            success:false,
            message:'no user id'
        });
    }

  

    try {
        const findedUser = await renewRequests.findById(userId);
        
        
    if(!findedUser){
        return res.status(404).json({
            success:false,
            message:'user not found'
        });
    }

   if(findedUser.registernumber !== registernumber){
        return res.status(400).json({
            success:false,
            message:'invalid register number,please check the register number'
        });
    }

    const borrowedUsers = await borrowBook.find();
    
    const sameEmailUser = borrowedUsers.filter((user)=>user.registerid === findedUser.registerid); 
       
    const sameBookname = sameEmailUser.find((user)=>user.bookname === findedUser.bookname);
  
    
    
    if(sameBookname){
        if(status === 'approved'){

            sameBookname.expirestatus = 'nothing'
            sameBookname.duedate = extendingdate
            sameBookname.renewstatus = status
            sameBookname.save()

        }else if(status === 'rejected'){            
            sameBookname.renewstatus = status
            sameBookname.save()
        }

        findedUser.status = status
        findedUser.save()
    }

   

    return res.status(200).json({
            success:true,
            message:'renewBorrowing request accept and update borrowing request  successfully completed'
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
exports.sendNewBookRequest = async (req,res)=>{

    const {librarianName,bookName,author,howmanyCopies,date} = req.body;

    if(!librarianName || !bookName || !author || !howmanyCopies || !date){
        return res.status(400).json({
            success:false,
            message:'must fill all fields'
        });
    }

    try {
        const newBookDetails = await newBookRequest.create({
            librarianName,
            bookName,
            author,
            howmanyCopies,
            date
        });
    
        return res.status(201).json({
            success:true,
            message:'you are successfully send newbook'
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
exports.deleteAcceptedRenewalRequests = async (req,res)=>{

    const renewalId = req.params.id;

    if(!renewalId){
        return res.status(400).json({
            success:false,
            message:'no renewal id'
        });
    }

    const deletedRenewalRequest = await renewRequests.findByIdAndDelete(renewalId) 

    if(!deletedRenewalRequest){
        return res.status(404).json({
            success:false,
            message:'user not found deletion faild'
        })
    }

    return res.status(200).json({
        success:true,
        message:'deletion successfully completed '
    })
}

exports.fineRecieved = async (req,res)=>{

    const userFineId = req.params.id;

    if(!userFineId){
        return res.status(400).json({
            success:false,
            message:'no userfine id'
        });
    }

    try {

        const findedUser = await fineDetails.findById(userFineId);

    if(!findedUser){
        return res.status(404).json({
            success:false,
            message:'user not found'
        });
    }

    findedUser.status = "Recieved" ;
    findedUser.save();

    return res.status(200).json({
        success:true,
        message:'you are successfully recieved fine amount'
    }); 
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }  
}
exports.librarianProfile = async (req,res) => {
    const registerId = req.Id;

    if(!registerId){
        return res.status(401).json({
            success:false,
            message:'unauthorized person '
        });
    }

    const findRegisterduser = await registerdLibrarian.findById(registerId);

    if(!findRegisterduser){
        return res.status(404).json({
            success:false,
            message:'user not found'
        });
    }

    const profileDetails = {
        id:findRegisterduser._id,
        fullname:findRegisterduser.fullname,
        email:findRegisterduser.email,
        gender:findRegisterduser.gender,
        phonenumber:findRegisterduser.phonenumber,
        place:findRegisterduser.place,
        address:findRegisterduser.address,
        profileimage:findRegisterduser.image,
        dateofbirth:findRegisterduser.dateofbirth,
        role:findRegisterduser.role
    }

    return res.status(200).json({
        success:true,
        profileDetails
    });
}
exports.librarianProfileUpdate = async (req,res) => {
    const personId = req.Id;    
    const {fullname,email,phonenumber,gender,address,place,dateofbirth} = req.body;

    if(!personId){
        return res.status(400).json({
            success:false,
            message:'no person id'
        });
    }

    if(!fullname || !email || !phonenumber || !gender || !address || !place || !dateofbirth){
       return res.status(400).json({
        success:false,
        message:'must fill all fields correctly'
       });
    }

    try {
        const findPerson = await registerdLibrarian.findById(personId);

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
    findPerson.dateofbirth = dateofbirth;

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
exports.updateLibrarianProfileImage = async (req,res)=>{

    const librarianId = req.Id;
    
    if(!librarianId){
        return res.status(401).json({
            success:false,
            message:'unauthorized person '
        });
    }

    try {
        const findedLibrarian = await registerdLibrarian.findById(librarianId);

    const profilePath = findedLibrarian.image
    
    if(!req.file){
        return res.status(400).json({
            success:false,
            message:'please upload a file'
        })
    }

    if(fs.existsSync(profilePath)){
        fs.unlinkSync(profilePath)
    }

    findedLibrarian.image = req.file.path;
    findedLibrarian.save();

    return res.status(200).json({
        success:true,
        message:'profile image updation completed',
        findedLibrarian
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        }) 
    }


}




//addUser() --> admin cntlr
//memberShip() --> user cntlr
//manageinventory () -->admin cntlr
//viewMemberSip()--> admin cntlr
//viewExpiredmembership --> admin cntlr
//sendmembershipexpiringnotification --> admin cntlr
//viewexpiredborrowbook - admin cntlr
//updateMembership() --> admin cntlr
//borrowBook() --> user cntlr
//approveBorrowingRequest() --> user cntlr
//approveReturn() --> admin cntlr
//editBook() --> admin cntlr
//viewReservedBooks () --> admin cntlr
//approveReservedRequest() --> admin cntlr
//cancelReservation () --> admin cntlr
//viewAllBooks () --> admin cntlr
//addMissingBook () --> admin cntlr
//viewReturnedBookUserDetails ()--> admin cntlr
//sendReturnDateExpiringNotification () --> admin cntlr
//notificationReservedBook () --> admin cntlr
//view both service and book Feedback () --> admin cntlr
//viewTotalFineammount () admin cntlr
//viewBorrowedBooks () ---> admin cntlr
//viewMostBorrowedBooks ()--> admin cntlr
//viewMostReservedDemandedBook ()--> admin cntlr
//viewUnusedBooks ()--> admin cntlr