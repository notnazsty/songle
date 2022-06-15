import axios from "axios";
import { GeniusSearchRequestSearchQuery } from "../../models/geniusRequests";
import { getInitialHint } from "./utils";


export const getSongLyrics = async (
  searchQueryObj: GeniusSearchRequestSearchQuery
): Promise<string> => {

  let req = await fetch("/api/lyrics?query=" + encodeURI(searchQueryObj.name + " " + searchQueryObj.artists[0]))
  const data = await req.json();
  const songLyrics = data.lyrics;

  return songLyrics;
};


