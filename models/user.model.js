import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: 5,
        maxlength: 254,
        lowercase: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 72,
    },
    role: {
        type: String,
        enum: ["user", "superuser", "admin"],
        default: "user",
    },
});

const user = mongoose.model("Users", userSchema);

export default user;
