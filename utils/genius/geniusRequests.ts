import axios, { AxiosResponse } from "axios";
import cheerio from "cheerio";

import {
  AxiosGeniusSearchRequestResponse,
  GeniusSearchRequestHit,
  GeniusSearchRequestSearchQuery,
} from "../../models/geniusRequests";
import { getMatchPercentage } from "./utils";

const accessToken = process.env.NEXT_PUBLIC_GENIUS_ACCESS_TOKEN;

export const getSongLyrics = async (
  searchQueryObj: GeniusSearchRequestSearchQuery
): Promise<string> => {
  if (typeof accessToken != "string")
    return Promise.reject("Genius Access Token is undefined");

  const searchQuery = searchQueryObj.name + " by " + searchQueryObj.artists[0];

  console.log(searchQuery);

  let response: AxiosResponse<AxiosGeniusSearchRequestResponse, any> =
    await axios.get(
      "https://api.genius.com/search?q=" +
        encodeURI(searchQuery) +
        encodeURI(`&access_token=${accessToken}`)
    );

  if (response.data.meta.status != 200) {
    return Promise.reject(response.data.meta);
  }

  console.log(response);

  const hits = response.data.response?.hits;
  let songLink: string;

  if (!hits || hits.length === 0) {
    return Promise.reject(
      `Search Query: ${searchQuery} did not return any results`
    );
  } else {
    songLink = getBestMatch(hits, searchQueryObj).result.url;
  }

  // TO DO GET THE SONG LYRICS

  // let lyricRes = await axios.get(songLink);

  // console.log(lyricRes);

  const $ = cheerio.load("PLACEHOLDER")

  // Might need to do more checks to make it work

   fetch(songLink,{
   method: "GET",
  //  mode: 'no-cors',

  }).then(data => console.log(data)).catch(err => console.log(err));

  const songLyrics: string = $('div[class="lyrics"]').text().trim();


  return Promise.resolve(songLyrics);
};

const getBestMatch = (
  hits: GeniusSearchRequestHit[],
  searchQueryObj: GeniusSearchRequestSearchQuery
): GeniusSearchRequestHit => {
  let bestMatch: GeniusSearchRequestHit = hits[0];

  if (hits.length === 1) {
    return bestMatch;
  }

  let bestMatchPercentage: number = getMatchPercentage(hits[0], searchQueryObj);

  for (let i = 1; i < hits.length; i++) {
    const currentMatchPercentage = getMatchPercentage(hits[i], searchQueryObj);
    if (currentMatchPercentage > bestMatchPercentage) {
      bestMatch = hits[i];
    }
  }

  return bestMatch;
};

