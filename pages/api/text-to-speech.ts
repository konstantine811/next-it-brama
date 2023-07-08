import { NextApiRequest, NextApiResponse } from "next";
import textToSpeech from "@google-cloud/text-to-speech";
import fs from "fs";
import util from "util";

export default async function createMessage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { text, lang } = req.body;
  const client = new textToSpeech.TextToSpeechClient();
  // Construct the request
  const request = {
    input: { text: text },
    // Select the language and SSML voice gender (optional)
    voice: { languageCode: lang, ssmlGender: "NEUTRAL" },
    // select the type of audio encoding
    audioConfig: { audioEncoding: "MP3" },
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request as any);
  const writeFile = util.promisify(fs.writeFile);
  if (response.audioContent) {
    const pathToFile = "public/output.mp3";
    await writeFile(pathToFile, response.audioContent, "binary");
    res.status(200).json({ path: "output.mp3" });
  } else {
    res.status(400).json({ error: "error" });
  }
}
