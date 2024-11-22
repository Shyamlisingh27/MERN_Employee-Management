const express=require("express");
const cors=require("cors");

const dotenv=require("dotenv")
const { connectdb }=require("./connect");
const UserRoute=require("./routes/user")
const EmployeeRoute=require("./routes/employee")
dotenv.config();

const app=express();
const port=process.env.port;

//middlewares
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true, // Allow cookies and other credentials
}))
app.use('/uploads', express.static('uploads'));     //for local storage

//routes
app.use("/api",UserRoute);
app.use("/api",EmployeeRoute);
  

app.listen(port,()=>{
    console.log(`server started on port: ${port}`);
    connectdb();
    }
)
