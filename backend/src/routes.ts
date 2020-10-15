import { Router } from "express";
// import { getRepository } from "typeorm";
// import Orphanage from "./models/Orphanage";

import multer from 'multer';

import uploadConfig from './config/upload';

import OrphanagesController from './controllers/OrphanagesController';

const routes = Router();
const upload = multer(uploadConfig);

// MVC

// Model
// Views
// Controllers

// routes.post("/orphanages", async (request, response) => {
//   console.log(request.body);

  // const {
  //   name,
  //   latitude,
  //   longitude,
  //   about,
  //   instructions,
  //   opening_hours,
  //   open_on_weekends,
  // } = request.body;

  // const OrphanagesRepository = getRepository(Orphanage);

  // const orphanage = OrphanagesRepository.create({
  //   name,
  //   latitude,
  //   longitude,
  //   about,
  //   instructions,
  //   opening_hours,
  //   open_on_weekends,
  // });

  // await OrphanagesRepository.save(orphanage);

  // // return response.json({ message: "Hello World" });
  // return response.status(201).json(orphanage);
// });

// Index, show, create, update, delete

routes.get("/orphanages", OrphanagesController.index);
routes.get("/orphanages/:id", OrphanagesController.show);
// routes.post("/orphanages", OrphanagesController.create);
routes.post("/orphanages", upload.array('images'), OrphanagesController.create);

// {
// 	"name": "Lar das meninas",
// 	"latitude": -27.2104339,
// 	"longitude": -49.629111,
// 	"about": "Sobre o orfanato",
// 	"instructions": "Venha visitar",
// 	"opening_hours": "Das 8h até 18h",
// 	"open_on_weekends": true
// }

export default routes;
