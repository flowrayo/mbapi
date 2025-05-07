import { Request, Response } from "express";
import { client } from "../lib/client";
import * as cheerio from 'cheerio';

export async function seasons(req: Request, res: Response) {
  try {
    const { detailPath } = req.params;

    const resp = await client.get(`/movies/${detailPath}`);
    const $ = cheerio.load(resp.data);
    const NUXTDATA = JSON.parse($('#__NUXT_DATA__').text())

    // Find the index mapping object
    const indexMap = NUXTDATA.find((item: any) => 
      typeof item === 'object' && 
      item?.title !== undefined && 
      typeof item.title === 'number'
    );

    if (!indexMap) {
      throw new Error('Could not find index mapping in Nuxt data');
    }

    // Find the mapping object with 'uid'
    const uidMapIndex = NUXTDATA.findIndex(
      (item: any) => typeof item === 'object' && item?.uid !== undefined
    );
    console.log("uidMapIndex:", uidMapIndex);
    console.log("NUXTDATA[uidMapIndex]:", NUXTDATA[uidMapIndex]);
    console.log("NUXTDATA[uidMapIndex + 1]:", NUXTDATA[uidMapIndex + 1]);
    console.log("NUXTDATA[uidMapIndex + 2]:", NUXTDATA[uidMapIndex + 2]);
    let id = undefined;
    if (uidMapIndex !== -1) {
      const uidIndex = NUXTDATA[uidMapIndex].uid;
      if (typeof uidIndex === 'number' && typeof NUXTDATA[uidIndex] === 'string') {
        id = NUXTDATA[uidIndex];
      }
    }

    // Extract data using the index mapping
    const title = NUXTDATA[indexMap.title];
    const description = NUXTDATA[indexMap.description];
    const image = NUXTDATA[indexMap.image];

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

    res.status(200).send({
      id,
      title,
      description,
      image,
      seasons: data
    });
  } catch (error: any) {
    res.status(500).json(error.message);
  }
}