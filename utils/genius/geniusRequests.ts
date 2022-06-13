import axios from "axios";
import { GeniusSearchRequestSearchQuery } from "../../models/geniusRequests";

const webURI = process.env.NEXT_PUBLIC_WEB_URI;

export const getSongLyrics = async (
  searchQueryObj: GeniusSearchRequestSearchQuery
): Promise<string> => {

  let req = await fetch("/api/lyrics?query=" + encodeURI(searchQueryObj.name + " " + searchQueryObj.artists[0]))
  const data = await req.json();
  const songLyrics = data.lyrics;

  return songLyrics[Math.floor(songLyrics.length * Math.random())];
};


// Store song lyrics in a object so I can keep grabbing more lines from the song