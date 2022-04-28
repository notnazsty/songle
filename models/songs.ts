export interface Song {
  name: string;
  album: string;
  artists: string[];
  releaseDate: Date;
  coverImages: CoverImage[];
}

export interface CoverImage {
  width: number;
  url: string;
  height: number;
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

