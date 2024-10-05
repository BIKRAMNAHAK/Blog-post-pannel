const users = require('../../Modules/Authontication')
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

let myOtp = null

const transporter = nodemailer.createTransport({
  host : "blog-pannel.gmail.com",
  port : 587,
  secure : true,
  service : 'gmail',
  auth: {
    user : 'bikramnahak9714@gmail.com',
    pass: 'xlea ehha ksml mefy'
  }

})

const userLoginFormController = (req, res) => {
  res.render('login')
}

const userLogoutController = async (req, res) => {
  req.logout((err) => {
    if (err) {
      done(err)
    } else {
      res.redirect('/login')
    }
  })
}

//user Password forgot part

const forgetPasswordController = (req, res) => {
  res.render('forget_password')
}

const chackUserController =async (req, res) => {
  const { email } = req.body;
    const user = await users.findOne({ email: email });

    if(user){
        
      let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false , lowerCaseAlphabets : false});
      myOtp = otp
      console.log("otp" ,otp);

      let mailOpt = {
        form: 'bikramnahak9714@gmail.com',
        to : user.email,
        subject : 'Reset password OTP',
        text : `Your OTP is ${otp}`
      }

      transporter.sendMail(mailOpt , (err , info)=>{
        if (err) {
          console.log("error" , err);
          
        }else{
          console.log("info" , info);
          
        }
      })

      res.redirect(`/otpValidate/${user._id}`);


      
    }else{
      res.redirect('/signup')
    }

}

const getOtpValidatePage  = (req , res) =>{
  res.render('otp_validate',{id : req.params.id})
}


const otpValidateController = (req , res) => {
  const { otp } = req.body;
  const id = req.params.id
    if (otp === myOtp) {
      res.render('pass_reset', {id : id})
    }else{
      console.log("otp not matching");
    }
}

const resetPassController = (req, res) => {
  const id = req.params.id;
  const { new_pass, conf_pass } = req.body;

  if (new_pass === conf_pass) {
    bcrypt.hash(new_pass, 10, async (err, hash) => {
      if (err) {
        return res.redirect('/pass_reset'); // Ensure response is returned to prevent hanging
      } else {
        // Correct the updateOne call by passing a filter object
        const updatePass = await users.updateOne({ _id: id }, { password: hash });
        console.log("Password reset successfully...");
      }
    });
    return res.redirect('/login');
  } 
};


module.exports = {
  userLoginFormController,
  userLogoutController,
  forgetPasswordController,
  chackUserController,
  getOtpValidatePage,
  otpValidateController,
  resetPassController
}