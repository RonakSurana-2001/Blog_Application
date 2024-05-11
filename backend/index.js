const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')
const { connect } = require('mongoose')
const connectToDb = require('./db')
const PORT=process.env.PORT || 4000

dotenv.config()

const app=express()

connectToDb()

app.use(express.json())
app.use(cors())


// app.get('/',(req,res)=>{
//     res.status(200).send({"message":"Node Server"})
// })

app.use('/user',require('./routes/user'))
app.use('/blog',require('./routes/blogRoute'))

app.listen(PORT,()=>{
    console.log("Backend Running on ",PORT)
})