import {
  CompareArrayResponse,
  GameRoundData,
  Song,
  SongDifferences,
  SongMatches,
  SongMatchResponse,
} from "../../models";

// LOL MY COMPARE METHODS ARE COMPLETELY OFF KMS REDO EM

/**
 * Returns a SongMatchResponse Object after comparing the properties of two different songs.
 * @param songOne This should be the correct song.
 * @param songTwo This should the guessed song.
 * @returns a SongMatchResponse.
 */
export const compareSongs = (
  songOne: Song,
  songTwo: Song
): SongMatchResponse => {
  const isCorrect: boolean = match(songOne, songTwo);
  const nameResponse: CompareArrayResponse = compareNames(songOne, songTwo);
  const artistsResponse: CompareArrayResponse = compareArtists(
    songOne,
    songTwo
  );
  const albumResponse: CompareArrayResponse = compareAlbums(songOne, songTwo);
  const dateResponse: "Before" | "After" | "Correct" = compareDates(
    songOne,
    songTwo
  );

  const differences: SongDifferences = {
    name: nameResponse.differences,
    album: albumResponse.differences,
    releaseDate: dateResponse,
    artists: artistsResponse.differences,
  };

  const matches: SongMatches = {
    name: nameResponse.matches,
    album: albumResponse.matches,
    releaseDate: dateResponse == "Correct" ? true : false,
    artists: artistsResponse.matches,
  };

  return {
    isCorrect: isCorrect,
    matches: matches,
    differences: differences,
  };
};

const compareNames = (songOne: Song, songTwo: Song): CompareArrayResponse => {
  const matches: string[] = [];
  const differences: string[] = [];
  const songOneNameArr: string[] = songOne.name.split(" ");
  const songTwoNameArr: string[] = songTwo.name.split(" ");

  for (let i = 0; i < songTwoNameArr.length; i++) {
    if (songOneNameArr.includes(songTwoNameArr[i])) {
      matches.push(songTwoNameArr[i]);
    } else {
      differences.push(songTwoNameArr[i]);
    }
  }

  return {
    matches: matches,
    differences: differences,
  };
};

const compareArtists = (songOne: Song, songTwo: Song): CompareArrayResponse => {
  const matches: string[] = [];
  const differences: string[] = [];

  for (let i = 0; i < songTwo.artists.length; i++) {
    if (songOne.artists.includes(songTwo.artists[i])) {
      matches.push(songTwo.artists[i]);
    } else {
      differences.push(songTwo.artists[i]);
    }
  }

  return {
    matches: matches,
    differences: differences,
  };
};

// TODO decide if I should split based on spaces or return any character combos that are a match
// Currently getting matches based on any spaces in the album name
const compareAlbums = (songOne: Song, songTwo: Song): CompareArrayResponse => {
  const matches: string[] = [];
  const differences: string[] = [];
  const songOneAlbumArr: string[] = songOne.album.split(" ");
  const songTwoAlbumArr: string[] = songTwo.album.split(" ");

  for (let i = 0; i < songTwoAlbumArr.length; i++) {
    if (songOneAlbumArr.includes(songTwoAlbumArr[i])) {
      matches.push(songTwoAlbumArr[i]);
    } else {
      differences.push(songTwoAlbumArr[i]);
    }
  }

  return {
    matches: matches,
    differences: differences,
  };
};

const compareDates = (
  songOne: Song,
  songTwo: Song
): "Before" | "After" | "Correct" => {
  const songOneYear = new Date(songOne.releaseDate).getFullYear();
  const songTwoYear = new Date(songTwo.releaseDate).getFullYear();

  if (songOneYear > songTwoYear) return "Before";

  if (songOneYear < songTwoYear) return "After";

  return "Correct";
};

// Overly engineered way to precheck if a song is a match
export const match = (songOne: Song, songTwo: Song): boolean => {
  if (songOne.album == songTwo.album) {
    if (songOne.name == songTwo.name) {
      if (
        new Date(songOne.releaseDate).getFullYear() ==
        new Date(songTwo.releaseDate).getFullYear()
      ) {
        for (let i = 0; i < songOne.artists.length; i++) {
          if (!songTwo.artists.includes(songOne.artists[i])) {
            return false;
          }
        }
        return true;
      }
    }
  }
  return false;
};

export const applyFilter = (array: Song[], filterRules: GameRoundData): Song[] => {
  let filteredArray = array;

  // Name match filter
  if (filterRules.matches.name.length > 0) {
    filteredArray = filteredArray.filter((song) => {
      for (let i = 0; i < filterRules.matches.name.length; i++) {
        if (!song.name.includes(filterRules.matches.name[i])) {
          return false;
        }
      }
      return true;
    });
  }

  return filteredArray;
};
