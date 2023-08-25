const bcrypt = require ( "bcryptjs" )
const LocalStrategy = require ( "passport-local" ).Strategy

const User = require ( "../models/user" )

const loginCheck = passport => {
  passport.use (
    new LocalStrategy (
      { 
        usernameField: "email", 
        passReqToCallback: true, 
      }, 
      ( req, email, password, done ) => {
        User.findOne ( { email: email } )
          .then( ( user ) => {
          if ( !user ) {
            return done( null, false, req.flash( "loginMessage", "Wrong email" ) )            
          }
          
          bcrypt.compare ( password, user.password, ( error, isMatch ) => {
            if ( error ) throw error
            if ( isMatch ) {
              return done ( null, user )
            } else {
              return done ( null, false, req.flash ( "loginMessage", "Wrong password" ) )
            }
          } )
        } )
        .catch ( ( error, done ) => {
            return done ( null, false, req.flash ( "loginMessage", error ) )
        } )
    } )
  )

  passport.serializeUser ( ( user, done ) => {
    done ( null, user.id )
  } )

  passport.deserializeUser ( async ( id, done ) => {   
    try {
        const current_user = await User.findById ( id )
        if ( !current_user ) return done ( null, false )
        done ( null, current_user )
    }
    catch ( e ) {
        done( e )
    }
  } )
}

module.exports = {
  loginCheck,
}