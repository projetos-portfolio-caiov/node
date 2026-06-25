const express = require("express");
const router = express.Router();

const usuarioModel = require("../model/usuarioModel");

router.post("/logar", function (req, res) {
    usuarioModel.logar(req, res);
});

module.exports = router