import { Router } from "express";
import { getRepository } from "typeorm";
import Orphanage from "./models/Orphanage";

const routes = Router();

routes.post("/orphanages", async (request, response) => {
  console.log(request.body);

  const {
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
  } = request.body;

  const OrphanagesRepository = getRepository(Orphanage);

  const orphanage = OrphanagesRepository.create({
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
  });

  await OrphanagesRepository.save(orphanage);

  // return response.json({ message: "Hello World" });
  return response.status(201).json(orphanage);
});

export default routes;
