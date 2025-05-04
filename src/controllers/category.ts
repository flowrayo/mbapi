import { client } from "../lib/client";
import { Request, Response } from "express";

export async function category(req: Request, res: Response) {
  try {
    const { channelId } = req.params;
    const {
      classify = "All",
      country = "All",
      genre = "All",
      page = "1",
      perPage = "24",
      sort = "ForYou",
      year = "All",
    } = req.query;

    if (!channelId) {
      res.status(400).json({ error: "channelId is required" });
      return
    }

    const resp = await client.post(`/wefeed-h5-bff/web/filter`, {
      channelId: Number(channelId),
      classify,
      country,
      genre,
      page: Number(page),
      perPage: Number(perPage),
      sort,
      year
    });
    const data = resp.data;

    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
}