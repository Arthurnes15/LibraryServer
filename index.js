import express from 'express';
const app = express();
import { createPool } from "mysql2";
import cors from "cors";

app.listen(3001, () => {
    console.log("rodando servidor")
});

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

// POST QUERYS

app.post("/login", (req, res) => {
    const { name, email, password } = req.body;

    let SQL = `SELECT * FROM usuarios WHERE nome_usuario = "${name}" AND email_usuario = "${email}" AND senha_usuario = "${password}"`;

    db.query(SQL, (err, result) => {
        if(err) {
            res.status(500).send(err);
        }
        if(result.length > 0) {
            res.status(400).send({msg: "Usuário logado"});
        } else {
            res.send({msg: "Usuário negado"});
        }
    })
});

app.post("/registerBook", (req, res) => {
    const {book, author_book, gender, publisher, isbn_book, amount, volume, cdd, publication, image} = req.body;

    let SQL = `INSERT INTO livros(ISBN, nome_livro, volume_livro, CDD, n_exemplares, data_publicacao, url_imagem, autor_id, genero_id, editora_id) VALUES('${isbn_book}', '${book}', ${volume}, '${cdd}', ${amount}, '${publication}', '${image}', ${author_book}, ${gender}, '${publisher}');`;

    db.query(SQL, (err, result) => {
        console.log(err);
    })
});

app.post("/registerStudent", (req, res) => {
    const {name, email, group} = req.body;

    let SQL = `INSERT INTO alunos (nome_aluno, email_aluno, turma_id) VALUES ('${name}', '${email}', '${group}')`;

    db.query(SQL, (err, result) => {
        console.log(err);
    })
});

app.post("/registerPublisher", (req, res) => {
    const {reg_pub} = req.body;

    let SQL = `INSERT INTO editoras (editora) VALUES ('${reg_pub}')`;

    db.query(SQL, (err, result) => {
        console.log(err);
    })
})

app.post("/registerAuthor", (req, res) => {
    const {reg_author} = req.body;

    let SQL = `INSERT INTO autores (nome_autor) VALUES ('${reg_author}')`;

    db.query(SQL, (err, result) => {
        console.log(err);
    })
});

app.post("/rent", (req, res) => {
    const {book_id, responsible_rent, student, status_rent, date_return} = req.body;

    let SQL = `INSERT INTO alugueis (responsavel_aluguel, livro_id, aluno_id, status_id, data_devolucao)
    VALUES ('${responsible_rent}', ${book_id}, ${student}, ${status_rent}, '${date_return}');`

    db.query(SQL, (err, result) => {
        console.log(err);
    });
});

// GET QUERYS

app.get("/getStudents", (req, res) => {
    let SQL = "SELECT a.id_aluno, a.nome_aluno, a.email_aluno, t.id_turma, t.nome_turma FROM alunos AS a JOIN turmas AS t ON a.turma_id = id_turma;"

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

app.get("/getBooks", (req, res) => {
    let SQL = "SELECT l.id_livro, l.n_exemplares, l.volume_livro, l.ISBN, l.CDD, g.genero, g.id_genero, l.data_publicacao, l.url_imagem, l.nome_livro, a.nome_autor, a.id_autor, e.editora, e.id_editora FROM livros AS l JOIN autores AS a ON l.autor_id = id_autor JOIN generos AS g ON l.genero_id = id_genero JOIN editoras AS e ON l.editora_id = id_editora ORDER BY nome_livro ASC LIMIT 100";

    db.query(SQL, (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })
});

app.get("/getAllBooks", (req, res) => {
    let SQL = "SELECT l.id_livro, l.n_exemplares, l.volume_livro, l.ISBN, l.CDD, g.id_genero, g.genero, l.data_publicacao, l.url_imagem, l.nome_livro, a.id_autor, a.nome_autor, e.editora, e.id_editora FROM livros AS l JOIN autores AS a ON l.autor_id = id_autor JOIN generos AS g ON l.genero_id = id_genero JOIN editoras AS e ON l.editora_id = id_editora ORDER BY nome_livro ASC";

    db.query(SQL, (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })
});

app.get("/getAuthors", (req, res) => {
    let SQL = "SELECT * FROM autores ORDER BY id_autor ASC";

    db.query(SQL, (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })
});

app.get("/getGenders", (req, res) => {
    let SQL = "SELECT * FROM generos ORDER BY id_genero ASC";

    db.query(SQL, (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })
})

app.get("/getPublishers", (req, res) => {
    let SQL = "SELECT * FROM editoras ORDER BY id_editora ASC";

    db.query(SQL, (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })
});

app.get("/rents", (req, res) => {
    let SQL = "SELECT a.id_aluguel, a.responsavel_aluguel, a.data_aluguel, a.data_devolucao, l.url_imagem, l.nome_livro, al.nome_aluno, t.nome_turma, s.tipo FROM alugueis AS a JOIN livros AS l ON a.livro_id = id_livro JOIN alunos AS al ON a.aluno_id = id_aluno JOIN turmas AS t ON al.turma_id = id_turma JOIN status AS s ON a.status_id = id_status WHERE id_status=1;"

    db.query(SQL, (err, result) => {
        if (err) console.log(err)
        else res.send(result);
    })
});

app.get("/rentsPending", (req, res) => {
    let SQL = "SELECT a.id_aluguel, a.responsavel_aluguel, a.data_aluguel, a.data_devolucao, l.url_imagem, l.nome_livro, al.nome_aluno, t.nome_turma, s.tipo FROM alugueis AS a JOIN livros AS l ON a.livro_id = id_livro JOIN alunos AS al ON a.aluno_id = id_aluno JOIN turmas AS t ON al.turma_id = id_turma JOIN status AS s ON a.status_id = id_status WHERE id_status=2;"

    db.query(SQL, (err, result) => {
        if (err) console.log(err)
        else res.send(result);
    });
});

app.get("/rentsReturned", (req, res) => {
    let SQL = "SELECT a.id_aluguel, a.responsavel_aluguel, a.data_aluguel, a.data_devolucao, l.url_imagem, l.nome_livro, al.nome_aluno, t.nome_turma, s.tipo FROM alugueis AS a JOIN livros AS l ON a.livro_id = id_livro JOIN alunos AS al ON a.aluno_id = id_aluno JOIN turmas AS t ON al.turma_id = id_turma JOIN status AS s ON a.status_id = id_status WHERE id_status=3;"

    db.query(SQL, (err, result) => {
        if (err) console.log(err)
        else res.send(result);
    });
});

// PUT QUERYS

app.put("/edit", (req, res) => {
    const { id, book, author, publisher, gender, isbn, amount, cdd, volume } = req.body;
    let SQL = `UPDATE livros SET ISBN = '${isbn}', CDD = '${cdd}', nome_livro = '${book}', n_exemplares = ${amount}, volume_livro = ${volume},  editora_id = ${publisher}, genero_id = ${gender}, autor_id = ${author} WHERE id_livro = ${id};`

    db.query(SQL, (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
});

app.put("/editStatus", (req, res) => {
    const {status_id, rent_id} = req.body;
    let SQL = `UPDATE alugueis SET status_id=${status_id} WHERE id_aluguel=${rent_id}`;

    db.query(SQL, (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })
});

app.put("/editStudent", (req, res) => {
    const {id, name, email, group} = req.body;
    let SQL = `UPDATE alunos SET nome_aluno='${name}', email_aluno='${email}', turma_id=${group} WHERE id_aluno=${id}`;

    db.query(SQL, (err, result) => {
        if(err) console.log(err)
        else res.send(result);
    });
});

app.put("/editRent", (req, res) => {
    const {rent_id, date_return} = req.body;
    let SQL = `UPDATE alugueis SET data_devolucao = '${date_return}'  WHERE id_aluguel = ${ rent_id };`

    db.query(SQL, (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    });
});

app.put("/editGroup", (req, res) => {
    const {id, group} = req.body;
    let SQL = `UPDATE turmas SET nome_turma = '${group}' WHERE id_turma = ${id}`;

    db.query(SQL, (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })
})

// DELETE QUERYS

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    let SQL = `DELETE FROM livros WHERE id_livro = ${id}`
    db.query(SQL, (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    })
});

app.delete("/deleteStudent/:id", (req, res) => {
    const { id } = req.params;
    let SQL = `DELETE FROM alunos WHERE id_aluno = ${id}`
    db.query(SQL, (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    })
});

app.delete("/deleteRent/:id", (req, res) => {
    const { id } = req.params;
    let SQL = `DELETE FROM alugueis WHERE id_aluguel = ${id}`;

    db.query(SQL, (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    })
});

app.delete("/deleteGroup/:id", (req, res) => {
    const { id } = req.params;
    let SQL = `DELETE FROM turmas WHERE id_turma = ${id}`;

    db.query(SQL, (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    })
});



