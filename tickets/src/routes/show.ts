import express, { Request, Response } from "express";
import { NotFoundError } from "@echoeventix/common";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/tickets/:id", async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  // if status-code is not specified, by default sends a 200
  res.send(ticket);
});

export { router as showTicketRouter };
