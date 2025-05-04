import { Router } from "express";
import { sources } from "../controllers/sources";
import { suggestions } from "../controllers/suggestions";
import { rankingList } from "../controllers/ranking-list";
import { category } from "../controllers/category";
import { captions } from "../controllers/captions";
import { seasons } from "../controllers/seasons";
import { search } from "../controllers/search";
import { forYou } from "../controllers/for-you";
import { searchRanks } from "../controllers/search-rank";
import { popularPlaylist } from "../controllers/popular-playlist";
import { popularPlaymonth } from "../controllers/popular-playmonth";

export const router = Router();

router.get("/suggestions", suggestions);

router.get('/search', search);

router.get('/search-rank', searchRanks);

router.get('/popular-playlist/:platform', popularPlaylist);

router.get('/popular-playmonth/:month/:platform', popularPlaymonth);

router.get("/ranking-list/:id", rankingList);

router.get("/category/:channelId", category);

router.get('/for-you/:subjectId', forYou);

router.get('/seasons/:detailPath', seasons);

router.get('/captions/:id/:subjectId', captions);

router.get("/source/:id/:subjectId", sources);