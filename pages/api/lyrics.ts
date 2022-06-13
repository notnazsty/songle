const Genius = require("genius-lyrics");
const accessToken = process.env.NEXT_PUBLIC_GENIUS_ACCESS_TOKEN;
const Client = new Genius.Client(accessToken);

export default async function handler(req: any, res: any) {
  if (typeof accessToken != "string")
    res.status(401).json({ message: "Genius Access Token Invalid or Missing" });

  try {
    const query = req.query["query"];
    let songArr = await Client.songs.search(query);
    // console.log(songArr)
    console.log(await songArr[0].lyrics(true));
    let songLyrics = (await songArr[0].lyrics(true)).split("\n");
    res.status(200).json({ lyrics: songLyrics });
  } catch (error) {
    res.status(401).json({ message: "error" });
  }
}
