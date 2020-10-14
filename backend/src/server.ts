import express from 'express';

import './database/connection';

const app = express();

app.use(express.json());

// app.get('/users', () => {
//   console.log('teste');
// });

//Rota = Conjuto
// Recurso = usuário

//Métodos HTTP = GET, POST, PUT, DELETE
//Parâmetros

// GET = Buscar uma informação (Lista, item)
// POST = Criando uma informação
// PUT = Editando uma informação
// DELETE = Deletando uma informação

// Query Params: http://localhost:3333/users?search=diego
// Route Params: http://localhost:3333/users/1 (Identificar um recurso)
// Body: http://localhost:3333/users (Identificar um recurso)

// app.post('/users/:id', (request, response) => {
//   console.log(request.query);
//   console.log(request.params);
//   console.log(request.body);

//   return response.json({Mensagem: 'Hello World'});
// });



app.listen(3333);

// REQ / RES
// localhost:3333   

//Driver nativo, Query builder, ORM
//ORM = Object Relational Mapping
// Query Builder ou ORM.

