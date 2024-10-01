const authModule = require('../../Modules/Authontication')



const userLoginFormController = (req , res) =>{
    res.render('login')
}

const userLogoutController =async (req , res) =>{
  req.logout((err)=>{
    if(err){
      done(err)
    }else{
      res.redirect('/login')
    }
  })
}

const forgetPasswordController =(req , res) =>{
  res.render('forget_password')
}



module.exports = {userLoginFormController  , userLogoutController , forgetPasswordController }