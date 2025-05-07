import { client } from "../lib/client";
import { Request, Response } from "express";

export async function suggestions(req: Request, res: Response) {
  try {
    const {
      page = 0,
      perPage = 30
    } = req.query;

    const resp = await client.post("https://moviebox.ph/wefeed-h5-bff/web/subject/trending", {
      page: Number(page),
      perPage: Number(perPage),
      uid: "5805325814992453840"
    });
    const data = resp.data;

    res.status(200).json(data)
  } catch (error: any) {
    res.status(500).json(error.message);
  }
}