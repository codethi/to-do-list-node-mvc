const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose.connect("mongodb+srv://root:OCof8ZSceHsAbyZN@to-do-list.wtxf9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('MongoDB CONECTADO!')
  }).catch((err) => console.log(err));
};

module.exports = connectToDb;