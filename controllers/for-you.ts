import { Request, Response } from "express";
import { client } from "../lib/client";

export async function forYou(req: Request, res: Response) {
  try {
    const { subjectId } = req.params;
    const {
      page = 1,
      perPage = 24
    } = req.query;

    if (!subjectId) {
      res.status(400).json({ error: "subjectId is required" });
      return
    }

    const resp = await client.post(`/wefeed-h5-bff/web/subject/detail-rec?subjectId=${subjectId}&page=${page}&perPage=${perPage}`);
    const data = resp.data;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}