const mysql = require("mysql2");

const mySqlConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
}

function logar(req, res) {
    const email = req.body.emailVar;
    const senha = req.body.senhaVar;

    enviarResposta(email, senha)
    .then(function (resposta) {
        console.log(resposta);
        res.json ({
            lista: resposta
        });
    }).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    )
}

function enviarResposta(email, senha) {
    
    let instrucaoSql = `
    SELECT id AS 'idUsuario', email AS 'Email' FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    
    return executarInstrucao(instrucaoSql);
}

function executarInstrucao(instrucao) {
    
    return new Promise(function (resolve, reject) {
        var conexao = mysql.createConnection(mySqlConfig);
        conexao.connect();
        conexao.query(instrucao, function (erro, resultados) {
            conexao.end();
            if (erro) {
                reject(erro);
            }
            console.log(resultados);
            resolve(resultados);
        });
        conexao.on('error', function (erro) {
            return ("ERRO NO MySQL SERVER: ", erro.sqlMessage);
        });
    });
}

module.exports = {
    logar,
    enviarResposta,
    executarInstrucao
}