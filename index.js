const bodyParser = require("body-parser");
const express = require("express");

const app = express();

const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

connection
  .authenticate()
  .then(() => {
    console.log("conexao feita com banco de dados");
  })
  .catch((erros) => {
    console.log(erro);
  });

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  Pergunta.findAll({
    raw: true,
    order: [["id", "desc"]],
  }).then((perguntas) => {
    res.render("index", { perguntas: perguntas });
  });
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;

  Pergunta.create({
    titulo: titulo,
    descricao: descricao,
  }).then(() => {
    res.redirect("/");
  });
});

app.get("/pergunta/:id", (req, res) => {
  var id = req.params.id;

  Pergunta.findOne({
    where: { id: id },
  }).then((pergunta) => {
    if (pergunta != undefined) {
      res.render("pergunta", { pergunta: pergunta });
    } else {
      res.redirect("/");
    }
  });
});

app.listen("8085", () => {
  console.log("App rodando");
});
