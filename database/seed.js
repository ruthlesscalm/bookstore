import "dotenv/config";
import mongoose from "mongoose";
import Book from "../models/book.js";
import books from "../data/books.data.js";

const MONGO_URI = process.env.MONGO_URI;

async function seedDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected");

        await Book.deleteMany();
        await Book.insertMany(books);

        console.log("Database seeded successfully 🌱");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seedDB();
