import { NextApiRequest, NextApiResponse } from "next";

export default async function getAudioUrl(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.body;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.data.finished) {
      res.status(200).json({ data });
    } else {
      setTimeout(async () => {
        const data = await response.json();
        res.status(200).json({ data });
      }, 1000);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
