import express from "express";
// import { getRepository } from "typeorm";
// import orphanages from "./models/Orphanage";

import path from 'path';

import cors from 'cors';

import 'express-async-errors';

import "./database/connection";

import routes from "./routes";
import errorHandler from './errors/handler';

import Orphanage from "./models/Orphanage";

const app = express();

// app.use(cors({
//   origin: 
// }))

app.use(cors())

app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use(errorHandler);

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

// app.post("/orphanages", async (request, response) => {
//   console.log(request.body);

//   const {
//     name,
//     latitude,
//     longitude,
//     about,
//     instructions,
//     opening_hours,
//     open_on_weekends,
//   } = request.body;

//   const OrphanagesRepository = getRepository(Orphanage);

//   const orphanage = OrphanagesRepository.create({
//     name,
//     latitude,
//     longitude,
//     about,
//     instructions,
//     opening_hours,
//     open_on_weekends,
//   });

//   await OrphanagesRepository.save(orphanage);

//   // return response.json({ message: "Hello World" });
//   return response.status(201).json(orphanage);
// });

app.listen(3333);

// REQ / RES
// localhost:3333

//Driver nativo, Query builder, ORM
//ORM = Object Relational Mapping
// Query Builder ou ORM.
