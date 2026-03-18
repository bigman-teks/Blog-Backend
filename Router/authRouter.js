const {Router} = require("express")
const { register, login} = require("../Controllers/authController")
const auth = require("../middleware/authMiddleware")
const role = require("../middleware/roleMiddleware")


const authRouter = Router()


authRouter.post("/register", register)
authRouter.post("/login", login)

module.exports = authRouter
