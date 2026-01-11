import Book from "../models/book.js";

export const renderHome = async (req, res) => {
    try {
        const genreNames = await Book.distinct("genre");

        const allGenres = await Promise.all(
            genreNames.map(async (genre) => {
                const books = await Book.find({ genre: genre }).limit(15);
                return {
                    name: genre,
                    books,
                };
            }),
        );
        const genres = allGenres.filter((v) => {
            return v.books.length > 0;
        });

        console.log(genres);
        res.render("index", { genres });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
};
export const renderAbout = async (req, res) => {
    res.render("about");
};
export const renderUpload = async (req, res) => {
    res.render("upload");
};

