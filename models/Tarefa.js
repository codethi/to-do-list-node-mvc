const mongoose = require("mongoose");

const tarefaSchema = new mongoose.Schema({
  tarefa: {
    type: String,
    require: true,
  },
  feito: {
    type: Boolean,
    default: false,
  },
  dataCriacao: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Tarefa", tarefaSchema);
