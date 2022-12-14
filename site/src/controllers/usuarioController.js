var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {
    var senha = req.body.senhaServer;
    var user = req.body.nomeUserServer;

    if (user == undefined) {
        res.status(400).send("Seu usuário está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        
        usuarioModel.entrar(user, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("User e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var user = req.body.nomeUserServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if(user == undefined){
        res.status(400).send("Seu user está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, user, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function enviar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nota = req.body.notaServer;
    var motivo = req.body.motivoServer;
    var sugestao= req.body.sugestaoServer;
    var comentarios = req.body.comentariosServer;
    var fkUsuario = req.body.fkUsuarioServer

    // Faça as validações dos valores
    if (nota == undefined) {
        res.status(400).send("Sua nota está undefined!");
    } else if (motivo == undefined) {
        res.status(400).send("Seu motivo está undefined!");
    } else if (sugestao == undefined) {
        res.status(400).send("Sua sugestão está undefined!");
    } else if(comentarios == undefined){
        res.status(400).send("Seu comentário está undefined!");
    }else if(fkUsuario == undefined){
        res.status(400).send("Seu fkUser está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.enviar(nota, motivo, sugestao, comentarios, fkUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o envio! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function quiz(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var acerto =  req.body.certoServer;
    var fkUsuario =  req.body.fkUsuarioServer;

    // Faça as validações dos valores
    if (acerto == undefined) {
        res.status(400).send("acerto está undefined!");
    }else if(fkUsuario == undefined){
        res.status(400).send("Seu fkUser está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.quiz(acerto, fkUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o quiz! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}



module.exports = {
    entrar,
    cadastrar,
    listar,
    testar,
    enviar,
    quiz
}