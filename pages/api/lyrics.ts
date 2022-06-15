import { Song } from "genius-lyrics";
import { getSanitizedString, returnBestMatchSong } from "../../utils/genius";

const Genius = require("genius-lyrics");
const accessToken = process.env.NEXT_PUBLIC_GENIUS_ACCESS_TOKEN;
const Client = new Genius.Client(accessToken);

export default async function handler(req: any, res: any) {

  if (typeof accessToken != "string")
    res.status(401).json({ message: "Genius Access Token Invalid or Missing" });

  try {
    const query = req.query["query"];

    const songArr: Song[] = await Client.songs.search(query);

    const bestSongResult = returnBestMatchSong(songArr, query);

    const songLyrics = (await bestSongResult.lyrics(true));

    res.status(200).json({ lyrics: getSanitizedString(songLyrics) });

  } catch (error) {
    res.status(401).json({ message: "Error" });
  }
}
