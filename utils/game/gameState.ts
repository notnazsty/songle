import { Game, GameRoundData, PlayerData, Song } from "../../models";

//TODO Add a Cumulative SongMatch/Difference Response

export const loadCurrentGame = (): Game => {
  const currentGameString = localStorage.getItem("currentGame");
  if (currentGameString) {
    const currentGameObj: Game = JSON.parse(currentGameString);
    return currentGameObj;
  } else {
    const newGame: Game = createNewGame();
    return newGame;
  }
};

const createNewGame = (): Game => {
  const songs = getLimitedSongs(100);
  const song = getRandomSong(songs);
  const newGame: Game = {
    songOptions: songs,
    songsGuessed: [],
    correctSong: song,
    gameState: "In Progress",
  };
  createLocalGameRoundData();
  return newGame;
};

const getRandomSong = (songs: Song[]): Song => {
  const randomNum = Math.floor(Math.random() * songs.length - 1);
  return songs[randomNum];
};

const getLimitedSongs = (range: number): Song[] => {
  const savedTrack: Song[] | undefined = getPlayerSavedTracks();
  if (savedTrack) {
    if (savedTrack.length > range) {
      const maxLeftPos = savedTrack.length - range;
      const randomNum = Math.floor(Math.random() * maxLeftPos);
      const filteredVals = savedTrack.filter(
        (item, i) => i <= randomNum + range && i > randomNum
      );
      return filteredVals;
    }
    return savedTrack;
  }
  return [];
};

const getPlayerSavedTracks = (): Song[] | undefined => {
  const playerDataString: string | null = localStorage.getItem("playerData");
  if (playerDataString) {
    const playerDataObj: PlayerData = JSON.parse(playerDataString);
    if (playerDataObj.savedTracks) {
      return playerDataObj.savedTracks;
    }
  }
  return undefined;
};

export const createLocalGameRoundData = () => {
  const gameRoundData: GameRoundData = {
    matches: {
      name: [],
      album: [],
      artists: [],
    },
    differences: {
      name: [],
      album: [],
      releaseDate: [],
      artists: [],
    },
  };
  localStorage.setItem("gameRoundData", JSON.stringify(gameRoundData));
};

export const updateLocalGameRoundData = (roundData: GameRoundData) => {
  const gameRoundDataStr = localStorage.getItem("gameRoundData");
  if (gameRoundDataStr) {
    const gameRound: GameRoundData = JSON.parse(gameRoundDataStr);

    const nameMatches = new Set(
      ...gameRound.matches.name,
      ...roundData.matches.name
    );
    const albumMatches = new Set(
      ...gameRound.matches.album,
      ...roundData.matches.album
    );
    const artistsMatches = new Set(
      ...gameRound.matches.artists,
      ...roundData.matches.artists
    );
    const releaseDateMatches = roundData.matches.releaseDate
      ? roundData.matches.releaseDate
      : gameRound.matches.releaseDate
      ? gameRound.matches.releaseDate
      : undefined;

    const nameDifferences = new Set(
      ...gameRound.differences.name,
      ...roundData.differences.name
    );

    const albumDifferences = new Set(
      ...roundData.differences.album,
      ...gameRound.differences.album
    );

    const artistsDifferences = new Set(
      ...gameRound.differences.artists,
      ...roundData.differences.artists
    );

    //Fix this
    // const releaseDifferences = new Set(
    //     ...gameRound.differences.releaseDate,
    //     ...roundData.differences.artists
    // )

    const newGameData: GameRoundData = {
      matches: {
        name: Array.from(nameMatches),
        album: Array.from(albumMatches),
        releaseDate: releaseDateMatches,
        artists: Array.from(artistsMatches),
      },
      differences: {
        name: Array.from(nameDifferences),
        album: Array.from(albumDifferences),
        releaseDate: [],
        artists: Array.from(artistsDifferences),
      },
    };
  }

  localStorage.setItem("gameRoundData", JSON.stringify(roundData));
};
