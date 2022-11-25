CREATE DATABASE linkin;

USE linkin;

CREATE TABLE usuario(
id int primary key auto_increment,
nome varchar(45),
email varchar(45),
nomeUser varchar(45),
senha varchar(45)
);

CREATE TABLE avaliacao(
idAvaliacao int primary key auto_increment,
nota int not null,
motivo varchar(45) not null,
sugestao varchar(45) not null,
comentarios varchar(45),
fkUsuario int,
foreign key(fkUsuario) REFERENCES usuario(id)
);

ALTER TABLE avaliacao ADD CONSTRAINT chkNota check(nota between 0 and 10);

CREATE TABLE quiz(
idQuiz int primary key auto_increment,
acerto int,
fkUsuario int,
foreign key(fkUsuario) REFERENCES usuario(id)
);




    
    