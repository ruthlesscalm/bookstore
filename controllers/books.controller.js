import Book from "../models/book.model.js";

const addBook = async (req, res) => {
    try {
        const newBook = await Book.create(req.body);

        return res.status(201).location(`/api/books/${newBook._id}`).json({
            success: true,
            message: "Book added successfully",
            data: newBook,
        });
    } catch (error) {
        console.error(error);

        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        return res.json({
            success: true,
            message: "Book found",
            data: book,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: "Invalid book ID",
        });
    }
};

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            success: true,
            message: "Books fetched successfully",
            data: books,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export { addBook, getBookById, getAllBooks };

