import { Request, Response } from "express";

export const adConfig = (req: Request, res: Response) => {
  res.json({
    application_id: "ca-app-pub-5981746119578926~9238528901",
    banner_ad_unit_id: "ca-app-pub-5981746119578926/6965387658",
    interstitial_ad_unit_id: "ca-app-pub-5981746119578926/6941644419",
    rewarded_ad_unit_id: "ca-app-pub-5981746119578926/9577281159",
    ad_frequency: 3,
    reward_amount: 1,
    enable_ads: true,
    hidePlayButton: false
  });
};

export const appVersion = (req: Request, res: Response) => {
  res.json({
    "versionCode": 1,
    "versionName": "1.0.0",
    "minVersionCode": 1,
    "forceUpdate": false,
    "updateMessage": "New features and bug fixes",
    "updateUrl": "https://play.google.com/store/apps/details?id=com.chipsflixapi"
  });
}; 