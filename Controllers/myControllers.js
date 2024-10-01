const username = require('../Modules/Authontication')
const blog_Models = require('../Modules/BlogModels')
const bcrypt = require('bcrypt')


const defaultController = async (req, res) => {
        const blogs = await blog_Models.find({});
        const bloggers = await username.find({});
    
        const loggedInUser = req.user; 

    res.render('index', { allBlogs: blogs, bloggers: bloggers, loggedInUser: loggedInUser });

};

const userProfileController = ( req , res) => {
    const loggedInUser = req.user;
    
    res.render('userProfile' , {userDetails : loggedInUser})
}

const changePassowrdController = ( req , res) => {
    res.render('changPassword')
}

const updatePassController =(req , res) =>{
    const {password} = req.user;
    const {old_pass , new_pass , conf_pass} = req.body;

    bcrypt.compare(old_pass , password , (err , result)=>{
        if(result){
            if(new_pass == conf_pass){
                bcrypt.hash(new_pass , 10 , async (err , hash)=>{

                    if(err) {
                        res.redirect('/changPassword')
                    }else{
                        const updatepass = await username.updateOne({_id : req.user._id} , {password: hash })
                    }
                   
                })
                res.redirect('/')
            }
        }else{
            res.redirect('/changPassword')
        }
    } )
}

module.exports = { defaultController , userProfileController  , changePassowrdController , updatePassController};
