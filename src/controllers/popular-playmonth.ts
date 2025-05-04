import { Request, Response } from "express";
import { client } from "../lib/client";

export async function popularPlaymonth(req: Request, res: Response) {
  try {
    const { month, platform } = req.params;
    const {
      page = 1,
      perPage = 3,
    } = req.query;

    if (!platform || !month) {
      res.status(400).json({ error: "platform and month is required" });
      return;
    }

    const resp = await client.post(`/wefeed-h5-bff/web/class-month`, {
      month,
      page: Number(page),
      perPage: Number(perPage),
      platform
    })
    const data = resp.data;

    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
}