const mongoose = require('mongoose')

async function connectToDatabase() {

    await mongoose.connect(
      "mongodb+srv://shreyaneupane49:shreya@cluster0.wip3vfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Database connected")
}

module.exports = connectToDatabase