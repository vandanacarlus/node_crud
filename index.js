const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
//var bodyParser = require("body-parser")




//const cors=require('cors')



const app = express();
const dbUrl = process.env.DB_URL;
//const dbUrl = "mongodb://0.0.0.0:27017/admin";


//app.use(cors({origin:true}))


mongoose.connect(dbUrl, { useNewUrlParser: true });

const con = mongoose.connection; //to get the connection status


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// app.use(bodyParser.urlencoded({extended:false}))
// app.use(bodyParser.json())

try {
  con.on("open", () => {
    console.log("MongoDB connected!!!!");
  });
} catch (error) {
  console.log("Error: " + error);
}
//const port = 3000
const port = process.env.PORT;

 const studentRouter = require("./routes/student");
 app.use("/students", studentRouter);

const gradeRouter = require("./routes/grade");
app.use("/grade", gradeRouter);

app.listen(port, () => {
  console.log("This Node application is running on port " + port);
});