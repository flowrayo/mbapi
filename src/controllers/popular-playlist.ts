import { Request, Response } from "express";
import { client } from "../lib/client";

export async function popularPlaylist(req: Request, res: Response) {
  try {
    const { platform } = req.params;
    const {
      page = 1,
      perPage = 3,
    } = req.query;

    if (!platform) {
      res.status(400).json({ error: "platform is required" });
      return;
    }

    const resp = await client.post(`/wefeed-h5-bff/web/class-list`, {
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