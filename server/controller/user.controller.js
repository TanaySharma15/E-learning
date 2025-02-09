import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }
    try {
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            name, email, password: hashedPassword
        })
        return res.status(200).json({
            success: true,
            message: "Account created successfully"
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Failed to register"
        })

    }
}
export const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not registered"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Password not matched"
            })
        }
        generateToken(res, user, `Welcome back `)
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Failed to login"
        })
    }

}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Failed to logout"
        })
    }

}

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.id
        const user = await User.findById(userId).select("-password")
        if (!user) {
            return res.status(401).json({
                message: "User not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Profile fetched successfully",
            user,
            success: true

        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to get profile"
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { name } = req.body
        const profilePhoto = req.file
        const userId = req.id

        const user = await User.findById(userId)
        if (!user) {
            return res.status(401).json({
                message: "User does not exists"
            })
        }
        if (user.photoUrl) {
            const publicId = user.photoUrl.split("/").pop().split(".")[0];
            deleteMediaFromCloudinary(publicId)
        }
        const cloudResponse = await uploadMedia(profilePhoto.path)
        const photoUrl = cloudResponse.secure_url;
        const updatedData = { name, photoUrl }
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select("-password")
        return res.status(200).json({
            message: "User updated",
            success: true,
            updatedUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update profile"
        })
    }
}