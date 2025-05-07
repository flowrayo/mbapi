import { client } from "../lib/client";
import { Request, Response } from "express";

export async function rankingList(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const {
      page = "1",
      perPage = "0"
    } = req.query;

    if (!id) {
      res.status(400).json({ error: "id is required" });
      return
    }

    const resp = await client.post(`/wefeed-h5-bff/web/ranking-list/content`, {
      id,
      page: Number(page),
      perPage: Number(perPage)
    });
    const data = resp.data;

    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
}