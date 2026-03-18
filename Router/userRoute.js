const {Router} = require("express")
const auth = require("../middleware/authMiddleware")
const role = require("../middleware/roleMiddleware")
const { getProfile, updateProfile, getAllUsers } = require("../Controllers/userController")


const userRouter = Router()


userRouter.get("/profile", auth, getProfile)
userRouter.put("/profile", auth, updateProfile)
userRouter.get("/users", auth, role("admin"), getAllUsers);

module.exports = userRouter
