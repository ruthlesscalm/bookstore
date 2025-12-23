import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: [true, "Title should not be blank"],
            minlength: [2, "Title should be at least 2 characters"],
            maxlength: [150, "Title should not exceed 150 characters"]
        },

        author: {
            type: String,
            trim: true,
            required: [true, "Author name is required"],
            minlength: [2, "Author name should be at least 2 characters"],
            maxlength: [100, "Author name should not exceed 100 characters"]
        },

        description: {
            type: String,
            trim: true,
            maxlength: [2000, "Description should not exceed 2000 characters"],
            default: "No description available"
        },

        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [1, "Price must be at least 1"],
            max: [100000, "Price must not exceed 100000"],
            validate: {
                validator: v =>
                    typeof v === "number" && Number.isInteger(v * 100),
                message: "Price must have at most 2 decimal places (e.g. 123.65)"
            }
        },

        rating: {
            type: Number,
            required: [true, "Rating is required"],
            min: [1, "Rating must be at least 1"],
            max: [10, "Rating must not exceed 10"],
            validate: {
                validator: v =>
                    typeof v === "number" && Number.isInteger(v * 10),
                message: "Rating must have at most 1 decimal place (e.g. 9.7)"
            }
        },

        genre: {
            type: String,
            trim: true,
            required: [true, "Genre is required"],
            enum: {
                values: [
                    "fiction",
                    "non-fiction",
                    "mystery",
                    "romance",
                    "sci-fi",
                    "fantasy",
                    "thriller",
                    "biography",
                    "self-help",
                    "other"
                ],
                message: "Genre `{VALUE}` is not supported"
            }
        }
    },

    { timestamps: true }
);


const Book = mongoose.model('Book', bookSchema);
export default Book;