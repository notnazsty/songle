import { SpotifyImageObject } from "./spotifyRequests";

export interface Song {
  name: string;
  album: string;
  artists: string[];
  releaseDate: string;
  coverImages: SpotifyImageObject[];
}

// TODO make this work lol
export interface SongMatchResponse {
  matches: SongMatches;
  differences: SongDifferences
  isCorrect: boolean;
}

export interface SongMatches {
  name: string[];
  album: string[];
  releaseDate: boolean;
  artists: string[];
}

export interface SongDifferences {
  name: string[];
  album: string[];
  releaseDate: "Before" | "After" | "Correct";
  artists: string[];
}

export interface CompareArrayResponse{
  matches: string[];
  differences: string[];
}

export interface CombinedPlaylistLibrary {
  name: string;
  total: number;
  id?: string;
  playlistCover: SpotifyImageObject[] | string;
  savedTracks: Song[];
}

