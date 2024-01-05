const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//todouser Registaion model

const userauthenticationModel = require("../Model/UserAuthontication");

// registration

const userRegistraion = async (req, res) => {
  const { username, password, gmail, phoneNumber } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const existingUser = await userauthenticationModel.findOne({
      username: username,
    });
    if (existingUser) {
      res.status(400).send("already Registered please login ");
    } else {
      const newUser = {
        username: username,
        password: hashedPassword,
        gmail: gmail,
        phoneNumber: phoneNumber,
      };
      const createUser = await userauthenticationModel.insertMany(newUser);
      res.status(200).send(createUser);
    }
  } catch (error) {
    res.send(error);
  }
};

//Authontication

const authenticateToken = (req, res, next) => {
  let token;
  const AuthorizationHeaders = req.header("Authorization");
  if (AuthorizationHeaders !== undefined) {
    token = AuthorizationHeaders.split(" ")[1];
  }
  // console.log(token);
  if (!token) return res.sendStatus(401);

  jwt.verify(token, "my jwt token", (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

//auth login

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const Dbuser = await userauthenticationModel.findOne({
      username: username,
    });
    if (Dbuser === null) {
      res.send("Please register");
    } else {
      const isPasswordMatch = await bcrypt.compare(password, Dbuser.password);
      // console.log(isPasswordMatch)
      if (isPasswordMatch) {
        const payload = {
          username: username,
        };
        const jwtToken = jwt.sign(payload, "my jwt token");
        // console.log(jwtToken)
        res.send(jwtToken);
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { userRegistraion, authenticateToken, userLogin };
