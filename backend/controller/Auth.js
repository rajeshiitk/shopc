const  sanitizeUser  = require("../services/common").sanitizeUser;
const { User } = require("../model/User");
const crypto = require("crypto");
const jwt = require("jsonwebtoken")
const SECRET_KEY = "SECRET_KEY"

exports.createUser = async (req, res) => {
  try {
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = new User({ ...req.body, password: hashedPassword, salt });
        // console.log(user);
        const doc = await user.save();
        // create session just after signup
        req.login(sanitizeUser(doc),(err)=>{ // this will also call serializeUser and deserializeUser and add sanitized user to session
            if(err){
              res.status(400).json(err);
            }
            else{
             const token = jwt.sign(sanitizeUser(doc),SECRET_KEY);
             res.cookie('jwt', token, { expires: new Date(Date.now() + 3600000), httpOnly: true }).status(201).json({id:doc.id, role:doc.role});
            }
        })
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.loginUser = async (req, res) => {
  console.log(req.user);
  res.cookie('jwt', req.user.token , { expires: new Date(Date.now() + 3600000), httpOnly: true }).status(200).json(req.user.token); // req.user is set by passport
  // res.json({status:"success"});

  // try {
  //   const user = await User.findOne(
  //     { email: req.body.email },
  //   ).exec();
  //   // TODO: this is just temporary, we will use strong password auth
  //   console.log({user})
  //   if (!user) {
  //     res.status(401).json({ message: 'no such user email' });
  //   } else if (user.password === req.body.password) {
  //       // TODO: We will make addresses independent of login
  //     res.status(200).json({id:user.id, role:user.role});
  //   } else {
  //     res.status(401).json({ message: 'invalid credentials' });
  //   }
  // } catch (err) {
  //   res.status(400).json(err);
  // }
};

// exports.checkUser = async (req, res) => {
//   res.json({ status:"success",user:req.user}); // req.user is set by passport
// };

exports.checkAuth = async (req, res) => {
  if(req.user){
    res.json(req.user);
  }else{
    res.sendStatus(401);
  }
}
