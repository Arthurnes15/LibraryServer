CREATE DATABASE biblioteca;
USE biblioteca;

CREATE TABLE autores (
	id_autor INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome_autor VARCHAR(150)
);

CREATE TABLE generos (
	id_genero INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    genero VARCHAR(150)
);

CREATE TABLE editoras(
	id_editora INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    editora VARCHAR(100)
);

CREATE TABLE livros (
	id_livro INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	ISBN VARCHAR(30) UNIQUE,
	nome_livro VARCHAR(150) NOT NULL,
    volume_livro INT,
    CDD VARCHAR(7),
    n_exemplares INT,
    data_publicacao DATE,
    url_imagem VARCHAR(300),
	autor_id INT NOT NULL,
    genero_id INT NOT NULL,
    editora_id INT NOT NULL,
    FOREIGN KEY (autor_id) REFERENCES autores(id_autor),
    FOREIGN KEY (genero_id) REFERENCES generos(id_genero),
    FOREIGN KEY (editora_id) REFERENCES editoras(id_editora)
);

CREATE TABLE usuarios (
	id_usuario INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome_usuario VARCHAR(100),
    email_usuario VARCHAR(150),
    senha_usuaio VARCHAR(50)
);

CREATE TABLE turmas (
	id_turma INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome_turma VARCHAR(30)
);

CREATE TABLE alunos(
	id_aluno INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome_aluno VARCHAR(150),
    email_aluno VARCHAR(150),
    turma_id INT NOT NULL, 
    FOREIGN KEY (turma_id) REFERENCES turmas (id_turma)
);

CREATE TABLE status(
	id INT PRIMARY KEY auto_increment NOT NULL,
    tipo VARCHAR(30)
);

CREATE TABLE alugueis (
	id_aluguel INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    data_aluguel TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    responsavel_aluguel VARCHAR(50),
    livro_id INT NOT NULL,
    aluno_id INT NOT NULL,
    status_id INT NOT NULL,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id_aluno),
    FOREIGN KEY (livro_id) REFERENCES livros(id_livro),
    FOREIGN KEY (status_id) REFERENCES status(id)
);


INSERT INTO status(id, tipo) VALUES
(1, 'Alugado'),
(2, 'Atrasado'),
(3, 'Entregue');

INSERT INTO turmas (nome_turma) 
VALUES ("Contabilidade 1"),
("Contabilidade 2"),
("Contabilidade 3"),
("Desenvolvimento de Sistemas 1"),
("Desenvolvimento de Sistemas 2"),
("Multimídia 1"),
("Multimídia 2"),
("Multimídia 3"),
("Redes de Computadores"),
("Informática 3");


INSERT INTO autores (nome_autor)
values ('J.R.R Tolkien'),
('C.S Lewis'),
('J.K Rowling'),
('Rodrigo Bilbo');

INSERT INTO generos (genero)
VALUES ('Aventura'),
('Literatura Infanto-Juvenil'),
('Cristianismo');

INSERT INTO editoras(editora) VALUES 
('Harper Collins'),
('Martins Fontes'),
('Rocco'),
('Thomas Nelson');

INSERT INTO livros(ISBN, nome_livro, volume_livro, CDD, n_exemplares, data_publicao, autor_id, genero_id, editora_id)
VALUES('978-85-7827-488-7', 'Silmarillion', 1, '823', 1, '1999-01-01', 1, 1, 2);

SELECT l.id_livro, 
l.ISBN,
l.CDD,
l.nome_livro,
a.nome_autor,
e.editora,
l.url_imagem,
g.genero,
l.n_exemplares,
l.data_publicacao
FROM livros AS l 
JOIN autores AS a ON l.autor_id = id_autor 
JOIN editoras AS e ON l.editora_id = id_editora
JOIN generos AS g ON l.genero_id = id_genero
ORDER BY id_livro ASC;

SELECT a.id_aluno, 
a.nome_aluno,
a.email_aluno, 
t.nome_turma
FROM alunos AS a
JOIN turmas AS t ON a.turma_id = id_turma;

delete from livros where id_livro = 12;

select * from turmas;


UPDATE livros SET editora_id = 5, autor_id = 2 WHERE id_livro = 13;

