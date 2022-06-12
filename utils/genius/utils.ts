import {
  GeniusLyricObject,
  GeniusRequestStatusMeta,
  GeniusSearchRequestHit,
  GeniusSearchRequestSearchQuery,
} from "../../models";
import { getSongLyrics } from "./geniusRequests";


// Get Arbritary Match Percentage (Should Optimize Later)
// Name 65% Weight
// Artists 35% Weight 65% main artist 35% split with features
export const getMatchPercentage = (
  item: GeniusSearchRequestHit,
  searchQueryObj: GeniusSearchRequestSearchQuery
): number => {
  let nameWeight = similarity(item.result.title, searchQueryObj.name) * 0.65;

  // TODO GET ARTIST WEIGHT WORKING

  return nameWeight;
};

const similarity = (songOneName: string, songTwoName: string) => {
  let longer: string, shorter: string;

  if (songOneName.length < songTwoName.length) {
    shorter = songOneName;
    longer = songTwoName;
  } else {
    longer = songOneName;
    shorter = songTwoName;
  }

  let maxLen = longer.length;

  if (maxLen === 0) {
    return 1.0;
  }

  return (maxLen - editDistance(longer, shorter)) / maxLen;
};

// TODO: Copied from online personalize for better results
const editDistance = (s1: string, s2: string) => {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  let costs = new Array();
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i == 0) costs[j] = j;
      else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
};


export const getGeniusLyricObject = async (
  searchQuery: GeniusSearchRequestSearchQuery
): Promise<GeniusLyricObject | undefined> => {
  let songLyrics: string | GeniusRequestStatusMeta = "";

  try {
    songLyrics = await getSongLyrics(searchQuery);
  } catch (err) {
    return undefined;
  }

  const displayedLyrics = getInitialHint(songLyrics); 


  const geniusLyricObj: GeniusLyricObject = {
    songLyrics: songLyrics,
    displayedLyrics: displayedLyrics,
    hintCount: 1,
  };

  return geniusLyricObj;
};

export const getInitialHint = (lyrics: string): string => {
    let output: string = "";

    const lyricSplitArray = lyrics.split("/n");

    let random = Math.floor(Math.random() * lyricSplitArray.length);

    if (random + 1 < lyricSplitArray.length){
        output += lyricSplitArray[random] + lyricSplitArray[random+1];
    } else if (random - 1 >= 0) {
        output += lyricSplitArray[random] + lyricSplitArray[random-1];
    } else {
        output += lyricSplitArray[random]
    }

    return output;
}

// TODO

export const getNextHint = (lyricObj: GeniusLyricObject): string => {
    let output = "";



    return output;
}

