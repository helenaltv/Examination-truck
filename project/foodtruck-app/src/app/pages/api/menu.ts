// project/foodtruck-app/src/pages/api/menu.ts
import type { NextApiRequest, NextApiResponse } from "next";

const API_BASE_URL = "http://yumyum-assets.s3-website.eu-north-1.amazonaws.com";
const API_KEY = "yum-KwOi5vm2TYNmi8Dd";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type } = req.query; // Expecting "wonton", "dip", or "drink"

  if (!type || (type !== "wonton" && type !== "dip" && type !== "drink")) {
    res.status(400).json({ error: "Invalid or missing type parameter" });
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/${type}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${type} items`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
