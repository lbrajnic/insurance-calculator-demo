import { Request, Response, NextFunction } from "express";
import * as insuranceConfig from "../services/insurance-config.service.js";

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await insuranceConfig.getAll());
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error while getting the insurance configs`, err.message);
      next(err);
    }
  }
}

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.params.id) {
      res.json(await insuranceConfig.get(req.params.id));
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error while getting the insurance config`, err.message);
      next(err);
    }
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {    
    res.json(await insuranceConfig.create(req.body));
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error while creating the insurance config`, err.message);
      next(err);
    }
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.params.id) {
      res.json(await insuranceConfig.update(req.params.id, req.body));
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error while updating the insurance config`, err.message);
      next(err);
    }
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.params.id) {
      res.json(await insuranceConfig.remove(req.params.id));
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error while deleting the insurance config`, err.message);
      next(err);
    }
  }
}

export { getAll, get, create, update, remove };
