var caminho_env = '.env';

require("dotenv").config({ path: caminho_env });

const express = require('express');
const cors = require('cors');
const path = require('path');

const port = process.env.APP_PORT;
const host = process.env.APP_HOST;

const app = express();

const indexRouter = require("./src/routes/index");
const usuarioRouter = require("./src/routes/usuario");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + "/public")))
app.use(cors());

app.use("/", indexRouter)
app.use("/usuarios", usuarioRouter);

app.listen(port, function () {
    console.log(`Inicializado em: http://${host}:${port}`);
});