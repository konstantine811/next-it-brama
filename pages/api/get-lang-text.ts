import { NextApiRequest, NextApiResponse } from "next";
import DetectLanguage from "detectlanguage";

export default async function createMessage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { text } = req.body;
  const apiKey = process.env.DETECT_LANGUAGE_API_KEY as string;
  const detectlanguage = new DetectLanguage(apiKey);
  const langeData = await detectlanguage.detect(text);
  res.status(200).json(langeData);
}
