const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const {mongoose} = require("mongoose");
const cookieParser = require("cookie-parser");

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("db connected");
}).catch((e) => {console.log(e);})

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Expose-Headers', 'Authorization'); // Optional
    next();
  });
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

app.use("/",require("./routes/authRoute"));

const port = 8000;

app.listen(port , () => {
    console.log(`server running on port ${port}`);
})
