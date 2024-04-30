const express = require("express");
// Const router = express.Router();
const mongoose = require("mongoose");
var cors = require("cors");

//letting express framework above node
let AutoMystiq = express();
AutoMystiq.use(express.json());

AutoMystiq.use(cors());

//npm run start to turn on nodemon
//connect Server to MongoDB server
async function connect() {
  let connection = await mongoose.connect("mongodb://127.0.0.1:27017/project3");
  if (!connection) {
    console.log("Server isnt working");
  } else {
    console.log("Server is Working good !");
  }
}
connect();

const SignUpSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

//convert User to Model
let SignUpModel = mongoose.model("signup", SignUpSchema);

//-----------------------------------------------Get---------------------------------------------

AutoMystiq.get("/users", async (req, res) => {
  let allUsers = await SignUpModel.find();
  res.status(200);
  // Remove this 2 Comments Below to Open the Counter (The Users Counter is Open)
  console.log("Users Counter..");
  console.log(allUsers.length);
  res.json(allUsers);
});

//-----------------------------------------------Post---------------------------------------------
AutoMystiq.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await SignUpModel.findOne({ email: email });
    if (user) {
      res.json("Already have an account");
    } else {
      user = await SignUpModel.create({
        name: name,
        email: email,
        password: password,
      });
      res.json("Account Created");
    }
  } catch (error) {
    res.send("An Error occurred return to a developer");
  }
});

// AutoMystiq.post("/users", (req, res) => {
//   const { name, email, password } = req.body;
//   SignUpModel.findOne({ email: email })
//     .then((user) => {
//       if (user) {
//         res.json("Already have an account");
//       } else {
//         SignUpModel.create({ name: name, email: email, password: password })
//           .then((result) => res.json("Account Created"))
//           .catch((err) => res.json("Error"));
//       }
//     })
//     .catch((err) => res.json(err));
// });

//Add New User Via post (Appear In Postman Only)
// AutoMystiq.post("/Users", async (req, res) => {
//   let newUser = await SignUp({
//     name: "Michale Anas",
//     email: "Moon12345@gmail.com",
//     password: "moon123@@",
//   }).save();

//   res.status(200);
//   res.json("User Has Been Added successfully!!");
// }).save;

//Regular end point return welcome to AutoMystiq
AutoMystiq.get("/", async (req, res) => {
  res.send("Welcome To AutoMystiq Backend Server");
});

AutoMystiq.listen(3001, () => {
  console.log("AutoMystiq Server Now Is Ready");
});
