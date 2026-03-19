const express = require("express")
const cors = require("cors")
const postRouter = require("./Router/postRouter")
const userRouter = require("./Router/userRoute")
const CommentRouter = require("./Router/commentRouter")
const connectDB = require("./config/dbconnection")
const authRouter = require("./Router/authRouter")

require('dotenv').config()

connectDB()


const port = process.env.PORT || 3000

const server = express()
// const port = 3000


//Middleware
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({extended:true}))


server.use('/api', postRouter)
server.use('/api', userRouter)
server.use('/api', CommentRouter)
server.use('/api',authRouter)




 server.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})

