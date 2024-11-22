const mongoose=require("mongoose");

const connectdb=async()=>{
    try{
        mongoose.connect(`${process.env.db}`);
        console.log("database connected");        
    }
    catch(error){
        console.log(error);
        
    }
}

module.exports={connectdb};