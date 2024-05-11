import express from 'express'
const app = express();
import { createPool } from "mysql2";
import cors from "cors";
import bcrypt from 'bcrypt';

const saltRounds = 10;

const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true,     
    optionSuccessStatus:200
}

app.use(cors(corsOptions));     
app.use(express.json());

const db = createPool({
    host: "localhost",
    user: "root",
    password: "artcnt2706@!",
    database: "biblioteca",
});

app.post("/login", (req, res) => {
    const { name, email, password } = req.body;

    let SQL = `SELECT * FROM usuarios WHERE nome_usuario = "${name}" AND email_usuario = "${email}" AND senha_usuario = "${password}"`;

    db.query(SQL, (err, result) => {
        if(err) {
            res.send(err);
        }
        if(result.length > 0) {
            res.send({msg: "Usuário logado"});
        } else {
            res.send({msg: "Usuário negado"});
        }
    })
});

app.post("/register-book", (req, res) => {
    const {book, author_book, gender, publisher, isbn, amount, volume, cdd, publication, image} = req.body;

    let SQL = `INSERT INTO livros(ISBN, nome_livro, volume_livro, CDD, n_exemplares, data_publicacao, url_imagem, autor_id, genero_id, editora_id) VALUES('${isbn}', '${book}', ${volume}, '${cdd}', ${amount}, '${publication}', '${image}', ${author_book}, ${gender}, ${publisher});`;

    db.query(SQL, (err, result) => {
        console.log(err);
    })
});

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
    });
});

app.get("/getGroups", (req, res) => {
    let SQL = "SELECT * FROM turmas";

    db.query(SQL, (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })
});

app.get("/getStatus", (req, res) => {
    let SQL = "SELECT * FROM status";

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
});

app.get("/getBooks", (req, res) => {
    let SQL = "SELECT l.id_livro, l.n_exemplares, l.ISBN, l.CDD, g.genero, l.data_publicacao, l.url_imagem, l.nome_livro, a.nome_autor, e.editora FROM livros AS l JOIN autores AS a ON l.autor_id = id_autor JOIN generos AS g ON l.genero_id = id_genero JOIN editoras AS e ON l.editora_id = id_editora ORDER BY nome_livro ASC";

    db.query(SQL, (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })
});

app.get("/getAuthors", (req, res) => {
    let SQL = "SELECT * FROM autores ORDER BY nome_autor ASC";

    db.query(SQL, (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })
});

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
});

app.put("/edit", (req, res) => {
    const {id, name, author, publisher, gender, isbn, amount, cdd} = req.body;
    let SQL = `UPDATE livros SET ISBN = '${isbn}', CDD = '${cdd}', nome_livro = '${name}', n_exemplares = ${amount},  editora_id = ${publisher}, genero_id = ${gender}, autor_id = ${author} WHERE id_livro = ${id};`

    db.query(SQL, (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    })
})

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    let SQL = `DELETE FROM livros WHERE id_livro = ${id}`
    db.query(SQL, (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    })
});

app.post("/rent", (req, res) => {
    const {book_id, responsible_rent, student, status_rent} = req.body;

    let SQL = `INSERT INTO alugueis (responsavel_aluguel, livro_id, aluno_id, status_id)
    VALUES ('${responsible_rent}', ${book_id}, ${student}, ${status_rent});`

    db.query(SQL, (err, result) => {
        console.log(err);
    });
});

app.post("/amountRents", (req, res) => {
    const { student_id } = req.body;

    let SQL = `SELECT COUNT(aluno_id) FROM alugueis WHERE aluno_id = ${student_id};`

    db.query(SQL, (err, result) => {
        if(err) {
            res.send(err);
        } if (SQL > 2) {
            res.send({msg: "O aluno não pode ter mais um aluguel"})
        } else {
            res.send({msg: "Pode "});
        }
    })
})

// db.query(SQL, (err, result) => {
//     if(err) {
//         res.send(err);
//     }
//     if(result.length > 0) {
//         res.send({msg: "Usuário logado"});
//     } else {
//         res.send({msg: "Usuário negado"});
//     }
// })

app.listen(3001, () => {
    console.log("rodando servidor")
});

