import { Request, Response, NextFunction } from "express";
import * as insurance from "../services/insurance.service.js";

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const response = await insurance.getAll();
    if (!response) {
      res.status(404).json({ message: "Insurances not found" });
      return;
    }
    res.json(response);
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error while getting the insurances`, err.message);
      next(err);
    }
  }
}

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.params.id) {
      const response = await insurance.get(req.params.id);
      if (!response) {
        res.status(404).json({ message: "Insurance not found" });
        return;
      }
      res.json(response);
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error while getting the insurance`, err.message);
      next(err);
    }
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await insurance.create(req.body));
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error while creating the insurance`, err.message);
      next(err);
    }
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.params.id) {
      const response = await insurance.update(req.params.id, req.body);
      if (!response) {
        res.status(404).json({ message: "Insurance not found" });
        return;
      }
      res.json(response);
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error while updating the insurance`, err.message);
      next(err);
    }
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.params.id) {
      const response = await insurance.remove(req.params.id);
      if (!response) {
        res.status(404).json({ message: "Insurance not found" });
        return;
      }
      res.json(response);
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error while deleting the insurance`, err.message);
      next(err);
    }
  }
}

export { getAll, get, create, update, remove };
