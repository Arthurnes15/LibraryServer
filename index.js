const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true,     
    optionSuccessStatus:200
}

app.use(cors(corsOptions));     
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "artcnt2706@!",
    database: "biblioteca",
})

app.post("/register-book", (req, res) => {
    const {book, author_book, gender, publisher, isbn, amount, volume, cdd, publication, image} = req.body;

    let SQL = `INSERT INTO livros(ISBN, nome_livro, volume_livro, CDD, n_exemplares, data_publicacao, url_imagem, autor_id, genero_id, editora_id) VALUES('${isbn}', '${book}', ${volume}, '${cdd}', ${amount}, '${publication}', '${image}', ${author_book}, ${gender}, ${publisher});`;

    db.query(SQL, (err, result) => {
        console.log(err);
    })
})

app.post("/register-student", (req, res) => {
    const {name, email, group} = req.body;

    let SQL = `INSERT INTO alunos (nome_aluno, email_aluno, turma_id) VALUES ('${name}', '${email}', '${group}')`;

    db.query(SQL, (err, result) => {
        console.log(err);
    })
});

app.get("/getStudents", (req, res) => {
    let SQL = "SELECT a.id_aluno, a.nome_aluno, a.email_aluno, t.nome_turma FROM alunos AS a JOIN turmas AS t ON a.turma_id = id_turma;"

    db.query(SQL, (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })
})

app.get("/getGroups", (req, res) => {
    let SQL = "SELECT * FROM turmas";

    db.query(SQL, (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })
});

app.post("/register-publisher", (req, res) => {
    const {reg_pub} = req.body;

    let SQL = `INSERT INTO editoras (editora) VALUES ('${reg_pub}')`;

    db.query(SQL, (err, result) => {
        console.log(err);
    })
})

app.post("/register-author", (req, res) => {
    const {reg_author} = req.body;

    let SQL = `INSERT INTO autores (nome_autor) VALUES ('${reg_author}')`;

    db.query(SQL, (err, result) => {
        console.log(err);
    })
})

app.get("/getBooks", (req, res) => {
    let SQL = "SELECT l.id_livro, l.n_exemplares, l.ISBN, l.CDD, g.genero, l.data_publicacao, l.url_imagem, l.nome_livro, a.nome_autor, e.editora FROM livros AS l JOIN autores AS a ON l.autor_id = id_autor JOIN generos AS g ON l.genero_id = id_genero JOIN editoras AS e ON l.editora_id = id_editora ORDER BY nome_livro ASC";

    db.query(SQL, (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })

})

app.get("/getAuthors", (req, res) => {
    let SQL = "SELECT * FROM autores ORDER BY nome_autor ASC";

    db.query(SQL, (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })

})

app.get("/getGenders", (req, res) => {
    let SQL = "SELECT * FROM generos ORDER BY genero ASC";

    db.query(SQL, (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })

})

app.get("/getPublishers", (req, res) => {
    let SQL = "SELECT * FROM editoras ORDER BY editora ASC";

    db.query(SQL, (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })
})

app.put("/edit", (req, res) => {
    const {id, name, author, publisher, gender, isbn, amount, cdd} = req.body;
    let SQL = `UPDATE livros SET ISBN = '${isbn}', CDD = '${cdd}', nome_livro = '${name}', n_exemplares = ${amount},  editora_id = ${publisher}, genero_id = ${gender}, autor_id = ${author} WHERE id_livro = ${id};`

    db.query(SQL, (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    })
})

app.delete("/delete/:id", (req, res) => {
    const {id} = req.params;
    let SQL = `DELETE FROM livros WHERE id_livro = ${id}`
    db.query(SQL, (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    })
})

app.listen(3001, () => {
    console.log("rodando servidor")
});

