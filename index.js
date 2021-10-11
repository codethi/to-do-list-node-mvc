const express = require("express");
const path = require("path");
const connectToDb = require("./database/db");
const Tarefa = require("./models/Tarefa");
require('dotenv').config()
const moment = require('moment');

connectToDb();

const app = express();
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
let message = "";
let type = "";

app.get("/", async (req, res) => {
  let newDate

  try {
    setTimeout(() => {
      message = "";
    }, 1000);
    const listaTarefas = await Tarefa.find();

    listaTarefas.forEach(item => {
      item.dataCriacao = moment.utc(item.dataCriacao).local().format();
    })
    
    return res.render("index", {
      listaTarefas,
      tarefa: null,
      modal: false,
      message,
      type
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.post("/add", async (req, res) => {
  const tarefa = req.body;

  if (!tarefa.tarefa) {
    message = "Insira um texto, antes de adicionar a tarefa!";
    type = "danger"
    return res.redirect("/");
  }

  try {
    await Tarefa.create(tarefa);
    message = "Tarefa criada com sucesso!";
    type = "success"
    return res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.get("/:id", async (req, res) => {
  const tarefa = await Tarefa.findOne({ _id: req.params.id });
  const listaTarefas = await Tarefa.find();
  res.render("index", { listaTarefas, tarefa, modal: false, message, type });
});

app.post("/update/:id", async (req, res) => {
  try {
    const novaTarefa = req.body;
    await Tarefa.updateOne({ _id: req.params.id }, novaTarefa);
    message = "Tarefa alterada com sucesso!";
    type = "success"
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.get("/confirm/:id", async (req, res) => {
  const tarefaDel = await Tarefa.findOne({ _id: req.params.id });
  const listaTarefas = await Tarefa.find();
  res.render("index", { listaTarefas, tarefaDel, tarefa: null, modal: true, message, type });
});

app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await Tarefa.deleteOne({ _id: id });
    message = "Tarefa excluida com sucesso!";
    type = "success"
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.get("/feito/:id", async (req, res) => {
  try {
    const tarefa = await Tarefa.findOne({ _id: req.params.id });

    tarefa.feito ? tarefa.feito = false : tarefa.feito = true;
    
    await Tarefa.updateOne({ _id: req.params.id }, tarefa);
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
})

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
