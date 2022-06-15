import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { CombinedPlaylistLibrary, SpotifyImageObject } from "../models";

interface Playlists {
  totalSongCount: number;
  currentPlaylistLoading: string;
  currentSongNumLoading: number;
  playlists: CombinedPlaylistLibrary[];
  setTotalSongCount: (fn: (count: number) => number) => void;
  setCurrentPlaylistLoading: (playlistName: string) => void;
  setCurrentSongNumLoading: (fn: (count: number) => number) => void;
  setPlaylists: (playlistsArr: CombinedPlaylistLibrary[]) => void;
  mergePlaylists: (fn: (playlist: CombinedPlaylistLibrary[]) => CombinedPlaylistLibrary[]) => void;
}

const defaults: {
  totalSongCount: number;
  currentPlaylistLoading: string;
  currentSongNumLoading: number;
  playlists: CombinedPlaylistLibrary[];
} = {
  totalSongCount: 0,
  currentPlaylistLoading: "",
  currentSongNumLoading: 0,
  playlists: [],
};

const usePlaylistStore = create<Playlists>()(
  devtools(
    persist((set) => ({
      ...defaults,
      setTotalSongCount: (fn) => set(state => ({totalSongCount: fn(state.totalSongCount)})),
      setCurrentPlaylistLoading: (currentPlaylistLoading) =>
        set({ currentPlaylistLoading }),
      setCurrentSongNumLoading: (fn) => set(state => ({currentSongNumLoading: fn(state.currentSongNumLoading)})),
      setPlaylists: (playlists) => set({ playlists }),
      mergePlaylists: (fn) => set(state => ({playlists: fn(state.playlists)})),
      reset: () => set({ ...defaults }),
    }), {name: "playlists"})
  )
);

export default usePlaylistStore;
