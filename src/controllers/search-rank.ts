import { Request, Response } from "express";
import { client } from "../lib/client";

export async function searchRanks(req: Request, res: Response) {
  try {
    const resp = await client.post(`https://moviebox.ph/wefeed-h5-bff/web/subject/search-rank`);
    const data = resp.data;

    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
}
