import {
  GeniusLyricObject,
  GeniusRequestStatusMeta,
  GeniusSearchRequestHit,
  GeniusSearchRequestSearchQuery,
} from "../../models";


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

