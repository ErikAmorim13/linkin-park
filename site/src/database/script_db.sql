CREATE DATABASE linkin;

USE linkin;

CREATE TABLE usuario(
idUsuario int primary key auto_increment,
nome varchar(45),
email varchar(45),
nomeUser varchar(45),
senha varchar(45)
);

CREATE TABLE avaliacao(
idAvaliacao int,
nota int,
motivo varchar(45),
sugestao varchar(45),
comentarios varchar(45),
fkUsuario int,
primary key(fkUsuario, idAvaliacao),
foreign key(fkUsuario) REFERENCES usuario(idUsuario)
);

ALTER TABLE avaliacao ADD CONSTRAINT chkNota check(nota between 0 and 10);

CREATE TABLE quiz(
idQuiz int primary key,
acerto int,
fkUsuario int,
foreign key(fkUsuario) REFERENCES usuario(idUsuario)
);
