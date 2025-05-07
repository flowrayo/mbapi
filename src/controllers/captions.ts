import { Request, Response } from "express";
import { client } from "../lib/client";

export async function captions(req: Request, res: Response) {
  try {
    const { id, subjectId } = req.params;

    if (!id || !subjectId) {
      res.status(400).json({ error: "id, subjectId is required" });
      return
    }

    const resp = await client.get(`https://moviebox.ph/wefeed-h5-bff/web/subject/caption?format=MP4&id=${id}&subjectId=${subjectId}`);
    const data = resp.data;

    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
}
