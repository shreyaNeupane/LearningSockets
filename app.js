const express = require("express");
const app = express();
const { Server } = require("socket.io");
const connectToDatabase = require(".");
const Book = require("./model/bookModel");

connectToDatabase();

const server = app.listen(4000, () => {
  console.log("Server has started at 4000");
});

// creating a Socket.IO server , we should only once instance throughout project
const io = new Server(server);

//crud operation using web sockets
io.on("connection", (socket) => {
  console.log("Someone has connected");
  //addBook
  socket.on("addBook", async (data) => {
    try {
      if (data) {
        const { bookName, bookPrice } = data;
        const newBook = await Books.create({
          bookName,
          bookPrice,
        });
        socket.emit("response", {
          status: 200,
          message: "Book created sucessfully ",
          data: newBook,
        });
      }
    } catch (error) {
      console.error(error);
      socket.emit("response", { status: 500, message: "somethng went wrong" });
    }
  });

  ///get book
  socket.on("getBook", async (data) => {
    if (data) {
      const books = await Book.find();
      socket.emit("response", {
        status: 200,
        message: "Book fetched ",
        data: books,
      });
    }
  });
  //update book
  socket.on("updateBook", async (data) => {
    try {
      if (data) {
        const { bookName, bookPrice, bookId } = data;
        const updatedBook = await Book.findByIdAndUpdate(
          bookId,
          {
            bookName,
            bookPrice,
          },
          {
            new: true,
          }
        );
        socket.emit("response", {
          status: 200,
          message: "Book updated",
          data: updatedBook,
        });
      }
    } catch (error) {
      console.error(error);
      socket.emit("response", { status: 500, message: "somethng went wrong" });
    }
  });
  //delete book
  socket.on("deleteBook", async (data) => {
    if (data) {
      const books = await Book.findByIdAndDelete();
      socket.emit("response", {
        status: 200,
        message: "Book deleted ",
        data: books,
      });
    }
  });
});
