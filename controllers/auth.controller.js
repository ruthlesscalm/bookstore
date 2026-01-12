import mongoose from "mongoose";
import user from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function userRegister(req, res) {
    const { email, password } = req.body ?? {};
    const role = "user";
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password cannot be empty",
        });
    }
    const usr = await user.findOne({ email: email });
    if (usr) {
        return res.status(409).json({
            success: false,
            message: "User already exists , please Login",
        });
    }
    try {
        const newUser = new user({
            email,
            password,
            role,
        });
        await newUser.validate();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        newUser.password = hashedPassword;
        newUser.save();
        res.status(201).json({
            success: true,
            message: "Register successful",
            user: {
                email,
                role,
            },
        });
    } catch (error) {
        if (error.code === "11000") {
            return res.status(409).json({
                success: false,
                message: "User already exists, please Login",
            });
        }
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        console.error("Authorization Error: ", {
            name: error.name,
            message: error.message,
        });
        res.status(500).json({
            success: false,
            message: "Internal Server error",
        });
    }
}
async function userLogin(req, res) {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password should not be empty",
        });
    }
    const usr = await user.findOne({ email: email });
    if (!usr) {
        return res.status(400).json({
            success: false,
            message: "User not found, please register first",
        });
    }
    try {
        const isPassword = await bcrypt.compare(password, usr.password);
        if (!isPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        const accessToken = jwt.sign(
            { id: usr._id, role: usr.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1m" },
        );
        res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
export { userRegister, userLogin };
