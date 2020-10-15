import { Request, Response } from 'express';
import { getRepository } from "typeorm";
import Orphanage from "../models/Orphanage";

export default {
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find();

    return response.json(orphanages);
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id);

    return response.json(orphanage);
  },

  async create(request : Request, response: Response) {
    console.log(request.files);

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
  }
};