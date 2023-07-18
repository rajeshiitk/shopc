const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { User } = require("./model/User");
const sanitizeUser = require("./services/common").sanitizeUser;
const isAuthenticated = require("./services/common").isAuthenticated;
const cookieExtractor = require("./services/common").cookieExtractor;
const cookieParser = require("cookie-parser");
// jwt strategy
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const SECRET_KEY = "SECRET_KEY";
const token = jwt.sign({ foo: "bar" }, SECRET_KEY);
// jwt options
var opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.jwtFromRequest = cookieExtractor; // this will extract the token from the cookie
opts.secretOrKey = SECRET_KEY; // TODO : SET IN ENV

server.use(
  session({
    secret: "keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    // store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
  })
);
server.use(passport.authenticate("session"));

const { createProduct } = require("./controller/Product");
const productsRouter = require("./routes/Products");
const categoriesRouter = require("./routes/Categories");
const brandsRouter = require("./routes/Brands");
const usersRouter = require("./routes/Users");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const ordersRouter = require("./routes/Order");



// passport local strategies
passport.use(
  "local",
  new LocalStrategy(
    {usernameField: 'email'},
    async function (email, password, done) {
    try {
      const user = await User.findOne({ email:email}).exec(); // exec() is used to execute the query if we don't use exec() then the query will be executed when we use await
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "Incorrect password" }); // null means no error and false means no user
          } else {
            console.log(user);
            const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
             // this will  return a token
             console.log(token);
            return done(null, {id:user.id, role:user.role});
          }
        }
      );
    } catch (err) {
      return done(err);
    }
    // User.findOne({ email: username }, function (err, user) {
    //   if (err) { return done(err); }
    //   if (!user) { return done(null, false); }
    //   if (!user.verifyPassword(password)) { return done(null, false); }
    //   return done(null, user);
    // });
  })
);

// passport jwt strategy
passport.use(
  "jwt",
  new JwtStrategy(
    opts,async function (jwt_payload, done) {
    console.log(jwt_payload);
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, sanitizeUser(user));
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (error) {
      return done(err, false);
    }
  })
);

// this will serialize the user id to the session
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
// this will deserialize the user id from the session and find the user
passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, sanitizeUser(user));
  });
});

//middlewares

server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use(cookieParser());
server.use(express.static("dist"));
server.use(express.json()); // to parse req.body
server.use("/products", isAuthenticated(), productsRouter.router);
server.use("/categories", isAuthenticated(), categoriesRouter.router);
server.use("/brands", isAuthenticated(), brandsRouter.router);
server.use("/users", isAuthenticated(), usersRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", isAuthenticated(), cartRouter.router);
server.use("/orders",isAuthenticated(), ordersRouter.router);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/shopc");
  console.log("database connected");
}

server.get("/", (req, res) => {
  res.json({ status: "success" });
});

server.listen(3000, () => {
  console.log("server started on localhost:3000");
});
