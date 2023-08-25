const passport = require ( "passport" )
const User = require ( "../models/user" )
const bcrypt = require ( "bcryptjs" )

const registerView = ( req, res ) => {
  res.render ( "register", 
    {
      name: "",
      email: "",
      password: "",
      message: "",
    } 
  )
}

const registerUser = ( req, res ) => {
  const { name, email, password, role } = req.body
  if ( !name || !email || !password ) {
    res.render ( "register", 
      {
        name: name,
        email: email,
        password: password,
        role: role,
        message: "Fill empty fields",
      }
    )
  }
  else if ( !role ) {
    res.render("register", {
      name: name,
      email: email,
      password: password,
      role: role,
      message: "Choose role"
    } )
  }
  else {
    User.findOne ( { email: email } ).then ( ( user ) => {
      if ( user ) {
        res.render ( "register", 
          {
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
            message: "email exists",
          }
        )
      } else {
        const newUser = new User ( 
          {
            name,
            email,          
            password,
            role
          } 
        )
        bcrypt.genSalt ( 10, ( err, salt ) =>
          bcrypt.hash ( newUser.password, salt, ( err, hash ) => {
            if ( err ) throw err
            newUser.password = hash
            newUser.save ()
              .then ( res.redirect ( "/login" ) )
              .catch ( ( err ) => console.log ( err ) )
          } )
        )
      }
    } )
  }  
}

const loginView = ( req, res ) => {
  res.render ( "login", 
    {
      email: "",
      password: "",
      message: req.flash ( 'loginMessage' ) 
    } 
  )
}

const loginUser = ( req, res, next ) => {
  const { email, password } = req.body
  if ( !email || !password ) {
    res.render ( "login", 
      {
        email: email,
        password: password,
        message: "Please fill in all the fields",
      } 
    )
  } else {
    passport.authenticate ( "local", 
      {
        successRedirect: "/home",
        failureRedirect: "/login",
        failureFlash: true,
      }
    ) ( req, res, next )
  }
}

module.exports = {
  registerView,
  loginView,
  registerUser,
  loginUser,
}