const passport = require("passport")

exports.isAuthenticated = (req, res, done)=>{
  return passport.authenticate('jwt');
  // if(req.user){
  //   done();
  // }else{
  //   res.status(401).json({message: 'unauthorized'});
  // }
}


exports.sanitizeUser = (user)=>{
    return {
        id: user.id,
        role: user.role
    }
}

exports.cookieExtractor = function(req) {
  let token = null;
  if (req && req.cookies) {
      token = req.cookies['jwt'];
  }
  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjY0NGRkMjdhZjc5YjAwNjc1MWFmOSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg5NjgwNDY0fQ.QoNvZO5pQkCS2DmI5cXji713BogYRhSH0MoZJ7NMd7M"
  // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjY3Y2Y1ODdiYWMxN2IwN2JlYjQzNyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4OTY4MTM5N30.trgfsYDiP2UF8qA9I2tKeeIwab6s2tO4JGNnCPdrUbo"
  return token;

};

