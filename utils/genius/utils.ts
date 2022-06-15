import { Song } from "genius-lyrics";

export const getSanitizedString = (lyrics: string): string => {
  const lyricSplitArray = lyrics.split("\n").filter((line) => {
    if (line.includes("[")) {
      if (
        line.includes("Chorus") ||
        line.includes("Intro") ||
        line.includes("Verse") ||
        line.includes("Part")
      ) {
        return false;
      }
    }
    if (line.trim().length === 0) {
      return false;
    }

    return true;
  });

  return lyricSplitArray.join("\n");
};

export const getInitialHint = (lyrics: string): string => {
  let output: string = "";

  const lyricSplitArray = lyrics.split("\n");

  const num = lyricSplitArray.length / 4;
  const randPos = Math.floor(Math.random() * Math.ceil(num));

  if (randPos * 4 + 4 < lyricSplitArray.length) {
    for (let i = 0; i < 4; i++) {
      output += lyricSplitArray[randPos * 4 + i] + "\n";
    }
  } else {
    for (let i = 0; i < 4; i++) {
      output += lyricSplitArray[(randPos - 1) * 4 + i] + "\n";
    }
  }

  return output;
};

// Issues with this need to fix later (some songs will have the same lyrics repeat so it breaks this need to store positions in a object and put in store)
export const getNextHint = (
  lyrics: string,
  displayedLyrics: string
): string => {
  let output = "";

  const lyricSplitArray = lyrics.split("\n");
  const displayedLyricsArr = displayedLyrics.split("\n");

  const startingPos = lyricSplitArray.indexOf(displayedLyricsArr[0]);
  const endingPos = lyricSplitArray.indexOf(
    displayedLyricsArr[displayedLyricsArr.length - 1]
  );

  if (endingPos + 4 < lyricSplitArray.length) {
    output = displayedLyrics;
    for (let i = 0; i < 4; i++) {
      output += lyricSplitArray[endingPos + i] + "\n";
    }
  } else {
    if (startingPos - 4 >= 0) {
      for (let i = 0; i < 4; i++) {
        output += lyricSplitArray[startingPos - i] + "\n";
      }
      output += displayedLyrics;
    } else {
      output = displayedLyrics;
    }
  }

  return output;
};

// Functions For Optimizing Search Results

export const returnBestMatchSong = (
  songs: Song[],
  searchQuery: string
): Song => {
  if (songs.length === 1) {
    return songs[0];
  }
  let bestSong = songs[0];
  let bestSongWeight = similarity(songs[0].fullTitle, searchQuery);

  for (let i = 1; i < songs.length; i++) {
    const currentWeight = similarity(songs[i].fullTitle, searchQuery);
    if (currentWeight > bestSongWeight) {
      bestSongWeight = currentWeight;
      bestSong = songs[i];
    }
  }
  return bestSong;
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
