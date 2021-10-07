const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose.connect("mongodb://localhost:27017/todolist", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('MongoDB CONECTADO!')
  }).catch((err) => console.log(err));
};

module.exports = connectToDb;