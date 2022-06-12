import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Game, GameRoundData, GameState, Song } from "../models";

interface GameStoreState extends Game {
  songList: Song[];
  gameRoundData: GameRoundData;
  setSongList: (songList: Song[]) => void;
  setGameRoundData: (gameRoundData : GameRoundData) => void;
  setSongOptions: (songOptions: Song[]) => void;
  setSongsGuessed: (songsGuessed: Song[]) => void;
  setCorrectSong: (correctSong: Song) => void;
  setGameState: (gameState: GameState) => void;
  reset: () => void;
}

const defaults: Game & { songList: Song[], gameRoundData: GameRoundData } = {
  songList: [],
  songOptions: [],
  songsGuessed: [],
  correctSong: null,
  gameState: "Not Started",
  gameRoundData:  { 
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
  }}
};

const useGameStore = create<GameStoreState>()(
  devtools((set) => ({
    ...defaults,
    setSongList: (songList) => set({ songList }),
    setGameRoundData: (gameRoundData) => set({gameRoundData}),
    setSongOptions: (songOptions) => set({ songOptions }),
    setSongsGuessed: (songsGuessed) => set({ songsGuessed }),
    setCorrectSong: (correctSong) => set({ correctSong }),
    setGameState: (gameState) => set({ gameState }),
    reset: () => set({ ...defaults }),
  }))
);

export default useGameStore;
