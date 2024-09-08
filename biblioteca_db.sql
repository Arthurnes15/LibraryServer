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
    data_publicacao YEAR,
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
    email_usuario VARCHAR(45),
    senha_usuario VARCHAR(150)
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
	id_status INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    tipo VARCHAR(30)
);

CREATE TABLE alugueis (
	id_aluguel INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    responsavel_aluguel VARCHAR(50),
    data_aluguel TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    livro_id INT NOT NULL,
    aluno_id INT NOT NULL,
    status_id INT NOT NULL,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id_aluno),
    FOREIGN KEY (livro_id) REFERENCES livros(id_livro),
    FOREIGN KEY (status_id) REFERENCES status(id_status)
);

-- CADASTRO DE AUTORES
INSERT INTO autores (nome_autor) VALUES 
('J.R.R Tolkien'),
('C.S Lewis'),
('J.K Rowling'),
('João Guimarães Rosa'),
('Mario Quintana'),
('José Alcides Pinto'),
('Silio Boccarena'),
('Vinícius de Moraes'),
('Rachel de Queiroz'),
('Luiz Alfredo Garcia-Roza'),
('Rubem Braga'),
('Jorge Amado'),
('Rubem Fonseca');

-- SELECIONA OS AUTORES EM ORDEM ALFABÉTICA
SELECT * FROM autores ORDER BY nome_autor ASC;

-- CADASTRO DE GÊNEROS
INSERT INTO generos (genero) VALUES 
('Aventura'),
('Literatura Infanto-Juvenil'),
('Cristianismo'),
('Romance'),
('Autobiografia'),
('Crônica'),
('Conto'),
('Ficção'),
('Poesia'),
('Biografia'),
('História'),
('Literatura Brasileira'),
('Psicologia');

-- SELECIONA OS GÊNEROS EM ORDEM ALFABÉTICA
SELECT * FROM generos ORDER BY genero ASC;

-- CADASTRO TESTE DE EDITORAS
INSERT INTO editoras(editora) VALUES 
('Harper Collins'),
('Martins Fontes'),
('Rocco'),
('Thomas Nelson');

-- CADASTRO DE EDITORAS
INSERT INTO editoras (editora) VALUES 
('Nova Fronteira'),
('L&PM'),
('UFC edições'),
('Uno Educação'),
('Schwarcz LTDA'),
('José Olympio'),
('Companhia das Letras'),
('Global Editora'),
('Ática'),
('Record LTDA'),
('Editora Objetiva Ltda'),
('Nova Fronteira S.A.');

-- SELECIONA AS EDITORAS EM ORDEM ALFABÉTICA
SELECT * FROM editoras ORDER BY editora ASC;
SELECT COUNT(*) FROM editoras;

-- CADASTRO DE LIVROS
INSERT INTO livros(ISBN, nome_livro, volume_livro, CDD, n_exemplares, data_publicacao, url_imagem, autor_id, genero_id, editora_id)
VALUES('85-209-1150-1', 'Sangarana', 1, '823', 1, '1999','https://firebasestorage.googleapis.com/v0/b/booksimages-33709.appspot.com/o/images%2Fsagarana.jpg?alt=media&token=941cd4d1-b542-4225-9ee6-f04ca1b0fc6b',  10, 12, 11);

-- SELECIONA TODOS OS LIVROS
SELECT * FROM livros;

-- SELECIONA OS LIVROS COM AS EDITORAS, AUTORES E GÊNEROS
SELECT l.id_livro, 
l.ISBN,
l.CDD,
l.nome_livro,
a.nome_autor,
e.editora,
l.url_imagem,
g.genero,
l.n_exemplares,
YEAR(l.data_publicacao)
FROM livros AS l 
JOIN autores AS a ON l.autor_id = id_autor 
JOIN editoras AS e ON l.editora_id = id_editora
JOIN generos AS g ON l.genero_id = id_genero
ORDER BY id_livro ASC;

-- CADASTRO DE USUÁRIOS
INSERT INTO usuarios(nome_usuario, email_usuario, senha_usuario ) 
VALUES('Kauã', 'kaua123@gmail.com', 'abc123');

-- SELECIONA TODOS OS USUÁRIOS
SELECT * FROM usuarios;

-- CADASTRO DAS TURMAS DA ESCOLA
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

-- SELECIONA AS TURMAS
SELECT * FROM turmas;

-- CADASTRO DE ALUNOS
INSERT INTO alunos (nome_aluno, email_aluno, turma_id) 
VALUES ('Kauã Silva de Jesus', 'kaua.silva@gmail.com', 10),
('João Victor Guedes', 'joaovictor@gmail.com', 1);

-- SELECIONA TODOS ALUNOS
SELECT * FROM alunos ORDER BY nome_aluno ASC;

-- SELECIONA OS ALUNOS COM SUAS TURMAS
SELECT a.id_aluno, 
a.nome_aluno,
a.email_aluno, 
t.nome_turma
FROM alunos AS a
JOIN turmas AS t ON a.turma_id = id_turma
ORDER BY nome_aluno ASC;

-- CADASTRO DOS STATUS
INSERT INTO status(id_status, tipo) VALUES
(1, 'Alugado'),
(2, 'Atrasado'),
(3, 'Entregue');

-- SELECIONA OS TIPO DE STATUS PARA OS ALUGUÉIS
SELECT * FROM status;

-- CADASTRO DE ALUGUEIS
INSERT INTO alugueis (responsavel_aluguel, livro_id, aluno_id, status_id, data_devolucao)
VALUES ('Kauã', 6, 1, 1, '2023-12-12');

-- SELECIONA TODOS OS ALUGUEIS
SELECT * FROM alugueis;

-- SELECIONA RESPONSÁVEL DO ALUGUEL COM SUA DATA, O LIVRO ALUGADO E O STATUS DO ALUGUEL;
SELECT a.id_aluguel,
a.responsavel_aluguel,
a.data_aluguel,
a.data_devolucao,
l.url_imagem,
l.nome_livro,
al.nome_aluno,
t.nome_turma,
s.tipo
FROM alugueis AS a 
JOIN livros AS l ON a.livro_id = id_livro
JOIN alunos AS al ON a.aluno_id = id_aluno
JOIN turmas AS t ON al.turma_id = id_turma
JOIN status AS s ON a.status_id = id_status;