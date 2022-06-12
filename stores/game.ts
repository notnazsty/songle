import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Game, GameRoundData, GameState, Song, SongSimilarity } from "../models";

interface GameStoreState extends Game {
  songList: Song[];
  gameRoundData: GameRoundData;
  hint: SongSimilarity | null,
  searchbarQuery: string;
  setSongList: (songList: Song[]) => void;
  setGameRoundData: (gameRoundData: GameRoundData) => void;
  setHint: (hint: SongSimilarity | null) => void;
  setSearchbarQuery: (str : string) => void;
  setSongOptions: (songOptions: Song[]) => void;
  setSongsGuessed: (songsGuessed: Song[]) => void;
  setCorrectSong: (correctSong: Song) => void;
  setGameState: (gameState: GameState) => void;
  reset: () => void;
}

const defaults: Game & { songList: Song[]; gameRoundData: GameRoundData;  hint: SongSimilarity | null, searchbarQuery: string; } = {
  songList: [],
  songOptions: [],
  songsGuessed: [],
  correctSong: null,
  gameState: "Not Started",
  hint: null,
  searchbarQuery: "",
  gameRoundData: {
    matches: {
      name: [],
      album: [],
      artists: [],
      releaseDate: null,
    },
    differences: {
      name: [],
      album: [],
      releaseDate: [],
      artists: [],
    }
  },
};

const useGameStore = create<GameStoreState>()(
  devtools((set) => ({
    ...defaults,
    setSongList: (songList) => set({ songList }),
    setGameRoundData: (gameRoundData) => set({ gameRoundData }),
    setHint: (hint) => set({ hint }),
    setSearchbarQuery: (searchbarQuery) => set({ searchbarQuery }),
    setSongOptions: (songOptions) => set({ songOptions }),
    setSongsGuessed: (songsGuessed) => set({ songsGuessed }),
    setCorrectSong: (correctSong) => set({ correctSong }),
    setGameState: (gameState) => set({ gameState }),
    reset: () => set({ ...defaults }),
  }))
);

export default useGameStore;
