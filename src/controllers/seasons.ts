import { Request, Response } from "express";
import { client } from "../lib/client";
import * as cheerio from 'cheerio';

export async function seasons(req: Request, res: Response) {
  try {
    const { detailPath } = req.params;

    const resp = await client.get(`/movies/${detailPath}`);
    const $ = cheerio.load(resp.data);
    const NUXTDATA = JSON.parse($('#__NUXT_DATA__').text())

    const ARRAYOFNUMBERS = NUXTDATA.filter((item: any) =>
      Array.isArray(item) &&
      item.length > 0 &&
      item.every(element => typeof element === 'number')
    )?.[0];

    const data: { season: number, episodes: number }[] = []

    for (let i = 0; i < ARRAYOFNUMBERS.length; i++) {
      const seasonIndex = ARRAYOFNUMBERS[i] + 2;
      const episodeIndex = ARRAYOFNUMBERS[i] + 1

      data.push({
        season: typeof NUXTDATA[seasonIndex] === "object" ? NUXTDATA[seasonIndex - 1] : NUXTDATA[seasonIndex],
        episodes: typeof NUXTDATA[episodeIndex + 1] !== "number" ? data[i - 1]?.episodes : NUXTDATA[episodeIndex]
      })
    }

    res.status(200).send(data);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
}