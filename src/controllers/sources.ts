import { client } from "../lib/client";
import { Request, Response } from "express";

export async function sources(req: Request, res: Response) {
  try {
    const { id, subjectId } = req.params;
    const {
      se,
      ep
    } = req.query;

    if (!id || !subjectId || !se || !ep) {
      res.status(400).json({ error: "id, subjectId, se, ep is required" });
      return;
    }

    const resp = await client.get(`/wefeed-h5-bff/web/subject/play?subjectId=${subjectId}&se=${se}&ep=${ep}`, {
      headers: {
        Referer: `https://moviebox.ph/movies/${id}`,
      }
    });
    const data = resp.data;

    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
}
