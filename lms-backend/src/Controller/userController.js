const memberShip = require("../Models/MemberShipSchema");
const bcrypt = require("bcrypt");
const borrowBook = require("../Models/borrowBooksSchema");
const reserveBook = require("../Models/reserveBooksSchema");
const books = require("../Models/bookSchema");
const userFeedback = require("../Models/feedbackSchema");
const userRegister = require("../Models/userSchema");
const { tokenGenerate } = require("../Util/generateToken");
const libraryServiceFeedback = require("../Models/libraryServiceFeedbackSchema");
const fs = require('fs');
const wishlistSchema = require("../Models/wishlistSchema");
const renewRequests = require("../Models/renewBookRequests");
const registrationDetails = require("../Models/registrationsSchema");

exports.membership = async (req,res,next)=>{

    const {fullname,email,phonenumber,address,gender,date,dateofbirth,membershiptype,place} = req.body;
   
    if(! fullname || !email ||  !phonenumber || !address || !gender|| !date || !dateofbirth || !membershiptype ||!place){
        return res.status(400).json({
            success:false,
            message:'must fill all fields correctly'
        });
    }

    try {
        const findPerson = await registrationDetails.findOne({email});
        
    if(!findPerson){
        
        return res.status(404).json({
            success:false,
            message:' invalid email,user not found '
        });
    }


   

    const path = req.files.file.map(element => {
        return element.path  
    });

    const filepath = path.toString();

    const imagepath = req.files.imageproof.map(element => {
         return element.path  
     });

    const imageproofpath = imagepath.toString();
   
    const membershipPerson = await memberShip.create ({
        membershipid:findPerson._id,
        fullname,
        email,
        phonenumber,
        address,
        gender,
        date,
        dateofbirth,
        membershiptype,
        place,
        file:filepath,
        imageproof:imageproofpath
    });

   return res.status(201).json({
        success:true,
        message:'membership process completed',
    });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
exports.viewMembershipCard = async (req,res)=>{

    const registerId = req.Id;
    
    if(!registerId){
        return res.status(400).json({
            success:false,
            message:'no register id'
        });
    }

   try {
    const allperson = await memberShip.find();
    
    const findPerson = allperson.find((person)=>person.membershipid === registerId);

    if(!findPerson){
        return res.status(404).json({
            success:false,
            message:'user not found'
        });
    }

    const memberCard = {
        fullname : findPerson.fullname,
        email : findPerson.email,
        username : findPerson.username,
        phonenumber : findPerson.phonenumber,
        gender : findPerson.gender,
        registernumber : findPerson.registrationnumber,
        place : findPerson.place,
        image : findPerson.file,
        status:findPerson.status,
        expiredstatus:findPerson.expiredstatus,
        address:findPerson.address,
        duedate:findPerson.duedate,
        type:findPerson.membershiptype
    }

    return res.status(200).json({
        success:true,
        message:'memberShipcard displayed',
        memberCard
    });
   } catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message
    });
   }
}
exports.borrowBook = async (req,res)=>{

    const {fullname,email,address,place,registernumber,bookname ,requestsendeddate} = req.body;

    if(!fullname || !email ||!address || !place || !registernumber || !bookname || !requestsendeddate){
        return res.status(400).json({
            success:false,
            message:'must fill all fields'
        });
    }

    try {
        const allmember = await memberShip.find();
        const membershiper =  allmember.find((member)=>member.registrationnumber === registernumber);
        

    if(!membershiper){
        return res.status(404).json({
            success:false,
            message:'invalid register number'
        });
    }

    if(membershiper.expiredstatus === 'expired'){
        return res.status(200).json({
            success:false,
            message:'your membership expired'
        }); 
    }
    
    const allBooks = await books.find()
    const findedBook = allBooks.find((book)=>book.title.toLowerCase() === bookname.toLowerCase());
    
    if(!findedBook){
        return res.status(404).json({
            success:false,
            message:'book not found,please enter the correct bookname'
        });
    }

    findedBook.borrowcount  = Number(findedBook.borrowcount) + 1;
    findedBook.save()
    const Book = await borrowBook.create({
        registerid:membershiper.membershipid,
        fullname,
        email,
        address,
        place,
        registernumber,
        bookname,
        image:findedBook.bookimage,
        requestsendeddate
    });



    return res.status(201).json({
        success:true,
        message:'book borrowing request sended successfully'
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
exports.viewBorrowingDetails = async (req,res) => {
    const registerId = req.Id;

    if(!registerId){
        return res.status(400).json({
            success:false,
            message:'no id'
        });
    }

    try {
        const allperson = await borrowBook.find();
        const findPerson = allperson.filter((person)=>person.registerid === registerId);
        
        if(!findPerson){
            return res.status(404).json({
                success:false,
                message:'user not found'
            });
        }

        return res.status(200).json({
            success:true,
            message:'borrowing details displayed',
            findPerson
        });
       } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
       }

}
exports.reserveBook = async (req,res)=>{

    const {fullname,email,address,place,registernumber,bookname,reserveddate} = req.body;

    if(!fullname || !email ||!address || !place || !registernumber || !bookname || !reserveddate){
        return res.status(400).json({
            success:false,
            message:'must fill all fields'
        });
    }

    try {
        const allmember = await memberShip.find();
        const membershiper =  allmember.find((member)=>member.registrationnumber === registernumber);
        
        const allBooks = await books.find();
        const sameBook = allBooks.find((book)=>book.title.toLowerCase() === bookname.toLowerCase() || book.title === bookname);
        
        if(sameBook){
            sameBook.reservedcount = Number(sameBook.reservedcount)+1 ;
        }
        sameBook.save();

        
    if(!membershiper){
        return res.status(404).json({
            success:false,
            message:'invalid register number'
        });
    }

    if(membershiper.expiredstatus === 'expired'){
        return res.status(200).json({
            success:false,
            message:'your membership expired'
        }); 
    }

    const Book = await reserveBook.create({
        registerid:membershiper.membershipid,
        fullname,
        email,
        address,
        place,
        registernumber,
        bookname,
        bookimage:sameBook.bookimage,
        reserveddate
    });
   
   
    
    return res.status(201).json({
        success:true,
        message:'book reserved request sended successfully'
    });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
exports.viewReservedDetails = async (req,res) => {

    const registerId = req.Id;

    if(!registerId){
        return res.status().json({
            success:false,
            message:'no id'
        });
    }
      try {
        const allRervedUsers = await reserveBook.find();
    const reservedUser = allRervedUsers.filter((user)=>user.registerid === registerId);

    if(!reservedUser){
        return res.status(404).json({
            success:false,
            message:'user not found'
        });
    }

   

    return res.status(200).json({
        success:true,
        message:'reserved details displayed successfully',
        reservedUser
    });
      } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
      });
    }
}
exports.sendBookFeedback = async (req,res,next) =>{

    const {bookname,fullname,address,email,feedback,date} = req.body;

    if(!bookname || !fullname || !address || !email || !feedback || !date){
        return res.status(400).json({
            success:false,
            message:'must fill all fields'
        });
    }

    try {

        const findPerson = await memberShip.findOne({email});


    if(!findPerson){
        return res.status(404).json({
            success:false,
            message:'invalid email,please take a membership for sending feedback'
        });
    }

    if(findPerson.expiredstatus === 'expired'){
        return res.status(200).json({
            success:false,
            message:'membership expired you can not send feedback'
        })
    }


    const userFeedbackDetails = await userFeedback.create({
        bookname,
        fullname,
        email,
        address,
        feedback,
        date
    });

    return res.status(201).json({
        success:true,
        message:'you are successfully send feedback',
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
exports.userRegister = async (req,res,next)=>{

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
            message:'upload a image'
        });
    }

    const profileImage = req.file.path;
    
    const userDetails = await registrationDetails.create({
        fullname,
        email,
        password:hashedPassword,
        dateofbirth,
        place,
        address,
        gender,
        phonenumber,
        profileimage:profileImage
    });

    return res.status(201).json({
        success:true,
        message:'your registration successfully completed',
        userDetails
    })

   } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
   }
}
exports.userLogin = async (req,res,next) =>{
   
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:'must fill all fields correctly'
        });
    }

    const findedUser = await registrationDetails.findOne({email});

    if(!findedUser){
        return res.status(404).json({
            success:false,
            message:'invlaid email,user not found'
        });
    }

    const matchPassword = await bcrypt.compare(password,findedUser.password);

    if(!matchPassword){
        return res.status(400).json({
            success:false,
            message:'invalid password , user not found'
        });
    }

    
    const loggedinPerson = {
        id:findedUser._id,
        fullname:findedUser.fullname,
        email:findedUser.email,
        gender:findedUser.gender,
        address:findedUser.address,
        phonenumber:findedUser.phonenumber,
        dateofbirth:findedUser.dateofbirth,
        place:findedUser.place,
        image:findedUser.profileimage,
        role:findedUser.role
    }

    req.person = loggedinPerson;
    tokenGenerate(req,res)
}
exports.viewUserProfile = async (req,res,next) => {

    const userId = req.Id;

    if(!userId){
        return res.status(400).json({
            success:false,
            message:'no user id'
        });
    }

    try {
        const findedUser = await registrationDetails.findById(userId);

    if(!findedUser){
        return res.status(404).json({
            success:false,
            message:'user not found'
        });
    }

    const userProfile = {
        id:findedUser._id,
        fullname:findedUser.fullname,
        email:findedUser.email,
        dateofbirth:findedUser.dateofbirth,
        place:findedUser.place,
        address:findedUser.address,
        gender:findedUser.gender,
        image:findedUser.profileimage,
        role:findedUser.role,
        phonenumber:findedUser.phonenumber
    }

    return res.status(200).json({
        success:true,
        message:'user profile displayed successfully',
        userProfile
    });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
exports.editUserProfile = async (req,res) => {
    
    const userId = req.Id;

    if(!userId){
        return res.status(400).json({
            success:false,
            message:'no user id'
        });
    }

   try {


    const findedUser = await registrationDetails.findById(userId);

    if(!findedUser){
        return res.staus(404).json({
            success:false,
            message:'user not found'
        });
    }

    const {fullname,email,dateofbirth,place,address,gender,phonenumber} = req.body;

    if(!fullname ||  !email || !dateofbirth || !place || !address || !gender || !phonenumber){
        return res.status(400).json({
            success:false,
            message:'must fill all fields correctly'
        });
    }

  

        findedUser.fullname = fullname;
        findedUser.email = email;
        findedUser.dateofbirth = dateofbirth;
        findedUser.place = place;
        findedUser.address = address;
        findedUser.gender = gender;
        findedUser.phonenumber = phonenumber;
    
        findedUser.save();

        return res.status(200).json({
            success:true,
            message:'profile updation successfully completed'
        });
    
   } catch (error) {
      return res.status(500).json({
        success:false,
        message:error.message
      });
   }

}
exports.editUserProfileImage = async (req,res) => {

    const userId = req.Id;
    

    if(!userId){
        return res.status(400).json({
            success:false,
            message:'no user id'
        });
    }

    const findUser = await registrationDetails.findById(userId);


    if(!findUser){
        return res.status(404).json({
            success:false,
            message:'user not found'
        })
    }

    const imagePath = findUser.profileimage;

    if(req.file){
        if(fs.existsSync(imagePath)){
            fs.unlinkSync(imagePath)
        }
        findUser.profileimage = req.file.path;
        findUser.save()
    }
    return res.status(200).json({
        success:true,
        message:' profile image updation completed',
        findUser
    });
}
exports.renewBorrowingDueDate = async (req,res) =>{

    const {fullname,email,bookname,borrowdate,duedate,extendingdate,registernumber} = req.body;
    
    if(!fullname || !email || !bookname || !borrowdate || !duedate || !extendingdate || !registernumber){
        return res.status(400).json({
            success:false,
            message:'must fill all fields correctly'
        });
    }

    try {

        const allborrowedUser = await borrowBook.find();
        const sameEmailUserBooks = allborrowedUser.filter((user)=>user.email === email);
        const sameBook = sameEmailUserBooks.find((user)=>user.bookname === bookname)
        
        
        if(sameBook){
            
           await renewRequests.create({
                bookid:sameBook._id,
                registerid:sameBook.registerid,
                fullname,
                email,
                bookname,
                registernumber,
                borrowdate,
                duedate,
                extendingdate
            })

            sameBook.renewstatus = 'pending'
            sameBook.save()
            
             return res.status(201).json({
                success:true,
                message:'your renew request sended successfully'
            });
        }

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        }); 
    }


}
exports.logOutUser = async (req,res) => {

    const token = req.cookies.token;
    const userId = req.Id;

    if(!userId){
        return res.status(401).json({
            success:false,
            message:'un authonticated person'
        })
    }

    if(!token){
        return res.status(401).json({
            success:false,
            message:'un authenticated person'
        });
    }

   


    return res.status(200).clearCookie('token',token).json({
        success:true,
        message:'Logout Successfully Completed',
    });
   


}
exports.searchBook = async (req,res) => {

    const searchWord = req.params.val;
    
    if(!searchWord){
        return res.status(400).json({
            success:false,
            message:'searching field is empty'
        });
    }

   try {
    const allBooks = await books.find(); 
    const searchResult = allBooks.filter((book)=> book.title.toLowerCase().includes(searchWord.toLowerCase()) || book.author.toLowerCase().includes(searchWord.toLowerCase()) || book.genre.toLowerCase().includes(searchWord.toLowerCase()));
    
    if(searchResult.length === 0){
        return res.status(200).json({
            success:false,
            message:'result not found',
            searchResult
        });
    }

    return res.status(200).json({
        success:true,
        message:'searching result displayed',
        searchResult
    });
   } catch (error) {
    return res.status(500).json({
        success:true,
        message:error.message
    });
   }
}
exports.sendLibraryFeedback = async (req,res) => {

    const {fullname,email,registernumber,message} = req.body;

    if(!fullname || !email || !registernumber || !message){
        return res.status(400).json({
            success:false,
            message:'must fill all fields'
        });
    }

   try {

    const findedUser = await memberShip.findOne({email});

    if(!findedUser){
        return res.status(404).json({
            success:false,
            messsage:'invalid email,please enter your correct email'
        });
    }



    if(findedUser.registrationnumber !== registernumber){
        return res.status(400).json({
            success:false,
            message:'your register number is incorrect'
        })
    }

    
    if(findedUser.expiredstatus === 'expired'){
        return res.status(200).json({
            success:false,
            message:'membership expired you can not send feedback'
        })
    }

    const seviceFeedbackDetails = await libraryServiceFeedback.create({
        fullname,
        email,
        registernumber,
        message
    });

    return res.status(201).json({
        success:true,
        message:'you are successfully send libraryservicefeedback'
    });

   } catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message
    });
   }
}
exports.addBookstowishlist = async (req,res)=>{

    const userId = req.Id;
    
    if(!userId){

        return res.status(403).json({
            success:false,
            message:'unauthorized person'
        });
    }

    const {bookname,bookimage,author,genre,publisher,bookstatus,price,summary} = req.body

    if (!bookname || !bookimage ||!author || !genre|| !publisher|| !bookstatus|| !price|| !summary){
        return res.status(400).json({
            success:false,
            message:'no book details'
        });
    } 

    try {
        const allbook = await books.find();
    const samebook = allbook.find((book)=>book.title === bookname );
    
    if(samebook){
        samebook.colorstatus = true
        samebook.save()
    }

    const sameUser = await wishlistSchema.findOne({userId});
    
    if(sameUser){
        const sameBook = await wishlistSchema.findOne({bookname});
        
        if(sameBook){
            return res.status(200).json({
                success:false,
                message:'book already exist in your wishlist'
            }); 
        }
        
    }

    const bookDetail = await wishlistSchema.create({
        userId,
        bookId:samebook._id,
        title:bookname,
        bookimage,
        author,
        genre,
        publisher,
        bookstatus,
        price,
        summary
    })

    return res.status(201).json({
        success:true,
        message:'book added to wishlist'
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
    

}
exports.viewWishlistItems = async (req,res) => {

        const userId = req.Id;

        if(!userId){
            return res.status(403).json({
                success:false,
                message:'you are not an authorized person'
            })
        }

       try {
        const allItems = await wishlistSchema.find();

        const userAddedItems = allItems.filter((item)=>item.userId === userId);

        if(!userAddedItems){
            return res.status(404).json({
                success:false,
                message:'items did not found'
            });
        }

        return res.status(200).json({
            success:true,
            message:'wishlistitems displayed',
            userAddedItems
        });
       } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
       }


}
exports.deleteWishlistItem = async (req,res)=>{

    const userId = req.Id;    
    const name = req.params.name
        
       try {

        const allListitems = await wishlistSchema.find();        
        const sameUserIdBooks = allListitems.filter((book)=>book.userId === userId);        
        const sameBook = sameUserIdBooks.find((book)=>book.title === name);        
        const sameBookId = sameBook._id;
        const allBooks = await books.find();
        const findSameBook = allBooks.find((book)=>book.title === sameBook.title);
        
        if(findSameBook){
            findSameBook.colorstatus = false;
            findSameBook.save()
        }

        await wishlistSchema.findByIdAndDelete(sameBookId);

        return res.status(200).json({
            success:true,
            message:'item deletion completed'
        });
       } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
       }
        
        
}
exports.changeHeartIconColor = async (req,res) => {

    const userId = req.Id;
    const iconStatus = req.body.colorStatus  ;

    if(!userId){
        return res.status(401).json({
            success:false,
            message:'you are not an authenticated person'
        });
    }

    try {
        const allWishlistBook = await wishlistSchema.find();
    const sameUserBooks = allWishlistBook.filter((book)=> book.userId === userId);

    
    const booknames = sameUserBooks.map((book)=>book.title);    
    let allBooks = await books.find();
    
    if(booknames.length === 0 ){
         
        for ( let i = 0 ; i<=allBooks.length; i++) {
            
             if(allBooks[i]){
              let temp = allBooks[i];
                    temp.colorstatus = false
                    temp.save()
             }
              
        }
        
    }else if (booknames.length > 0){
        
        for ( let i = 0 ; i<=booknames.length;i++) {
            if(booknames[i]){
              let tempvar =  allBooks.find((book)=>book.title === booknames[i]) ;
              tempvar.colorstatus = iconStatus;
              tempvar.save()
            }
                
        }
    }

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
   

    
    
    
    
    
    
    
  
} 
exports.getLoginDetail = async (req,res,next) =>{
    
    const personId = req.Id;
    console.log('personid==',personId);
    
    const findPerson = await registrationDetails.findById(personId)
    console.log('findPerson',findPerson);
    
    if(!findPerson){
        return res.status(404).json({
            success:false,
            message:'user not found'
        });
    }

    return res.status(200).json({
        success:true,
        findPerson
    });
}
