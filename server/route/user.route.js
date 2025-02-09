import express, { Router } from "express"
import { getUserProfile, login, logout, register, updateProfile } from "../controller/user.controller.js"
import isAuthenticated from "../middleware/isAuthenticated.js"
import upload from "../utils/multer.js"
const router = Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/profile").get(isAuthenticated, getUserProfile)
router.route("/profile/update").put(isAuthenticated, upload.single("profilePhoto"), updateProfile)

export default router