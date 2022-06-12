import { Song, SongDifferences, SongMatches } from "./songs";
import { SpotifyImageObject } from "./spotifyRequests";

export interface PlayerProfile {
  name: string | null;
  email: string | null;
  profileImage: SpotifyImageObject | null;
  country: string | null;
}

// To make sure there is enough local storage space calculate games played and seperate the game history data into
// multiple different localStorage entries whose length can be calculated based on how many games were played.
export interface Game {
  songOptions: Song[];
  songsGuessed: Song[];
  correctSong: Song | null;
  gameState: GameState;
}

export type GameState = "Win" | "Loss" | "In Progress" | "Fetching Songs" | "Not Started";

export interface PlayerData {
  savedTracks: Song[];
  gamesPlayed: number;
}

export interface SongSimilarity {
  name: string[];
  album: string[];
  artists: string[];
}

export interface GameRoundData {
  matches: {
    name: string[];
    album: string[];
    releaseDate?: number | null;
    artists: string[];
  };
  differences: {
    name: string[];
    album: string[];
    releaseDate: number[];
    artists: string[];
  };
}
