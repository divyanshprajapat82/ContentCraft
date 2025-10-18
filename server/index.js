let express = require("express");
const { default: mongoose } = require("mongoose");
let cors = require("cors");
const { craftRoute } = require("./app/routers/craftRoute");
// const { default: mongoose } = require("mongoose");
require("dotenv").config();

let app = express();
app.use(express.json());
// app.use(cors());

app.use(
  cors({
    origin: [
      "https://content-craft-psi.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// app.use("/admin", adminRoute);
app.use("/craft", craftRoute);

mongoose
  // .connect("mongodb://127.0.0.1:27017/contentCraft")
  .connect(
    "mongodb+srv://divyanshprajapat82_db_user:HZRykvnixlpNsVXy@cluster0.bxvm6qt.mongodb.net/"
  )
  .then(() =>
    app.listen(8000, () => console.log("Server running on port 8000"))
  );
//   .then(async () => {
//     // let AdminLogin = await AuthModel.find()
//     // AuthModel.insertOne({
//     //     userEmail: "d@d.com",
//     //     userPassword: "d123456",
//     //     userType: "admin"
//     // })
//     // console.log("Connected")
//     // app.listen("8000")

//     // let checkAdmin = await AuthModel.find();
//     // if (checkAdmin.length == 0) {
//     //     AuthModel.insertOne({
//     //         userEmail: "d@d.com",
//     //         userPassword: "d123456",
//     //         userType: "admin"
//     //     });
//     // }

//     // await AuthModel.create({
//     //     userEmail: "admin@gym.com",
//     //     userPassword: "d123456",
//     //     userType: "admin"
//     // });

//     const checkAdmin = await AuthModel.findOne({ userType: "admin" });
//     if (!checkAdmin) {
//       await AuthModel.create({
//         userEmail: "d@d.com",
//         userPassword: "d123456", // TODO: hash this
//         userType: "admin",
//       });
//     }

//     console.log("DB Connected");
//     // app.listen(8000);
//     app.listen(process.env.PORT, () => console.log("Server running on 8000"));

//     // console.log(process.env.TOKENKEY);
//   })
//   .catch((err) => {
//     console.error("Mongo connection error:", err);
//     process.exit(1);
//   });

// .then(async () => {
//     console.log("DB Connected");

//     // check if admin exists
//     const adminExists = await AuthModel.findOne({ userType: "admin" });

//     if (!adminExists) {
//         // const hashPassword = await bcrypt.hash("d123456", 10);

//         await AuthModel.create({
//             userEmail: "admin@gym.com",
//             userPassword: "hashPassword",
//             userType: "admin"
//         });

//         console.log("Default Admin Created ✅");
//     }

//     // start server (keep DB connected)
//     app.listen(8000, () => console.log("Server running on port 8000"));
// })
// .catch(err => console.error(err));
