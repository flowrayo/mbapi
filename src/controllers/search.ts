import { client } from "../lib/client";
import { Request, Response } from "express";

export async function search(req: Request, res: Response) {
  try {
    const {
      keyword = "one piece",
      page = "1",
      perPage = "24",
      subjectType = "0"
    } = req.query;

    const resp = await client.post(`/wefeed-h5-bff/web/subject/search`, {
      keyword,
      page: Number(page),
      perPage: Number(perPage),
      subjectType: Number(subjectType),
    });
    const data = resp.data;

    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
}