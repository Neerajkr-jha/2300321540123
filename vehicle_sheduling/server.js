require ('dotenv').config
const express=require("express")
const vsShedRoutes=require('./routes/vsRouter')

const app=express();
const port=process.env.PORT || 3000

app.use(express.json());
app.use('/api',vsShedRoutes);

app.listen(port,()=>{
    console.log("Server is listening to PORT",port);
})