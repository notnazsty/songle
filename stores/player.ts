import create from "zustand"
import { devtools, persist } from "zustand/middleware"
import { AuthToken, PlayerData, PlayerProfile, Song, SpotifyImageObject } from "../models"

interface PlayerStoreState extends PlayerProfile, PlayerData, AuthToken {
  setAuthToken: (token: AuthToken["authToken"] | null) => void;
  setAuthCreatedAt: (createdAt: AuthToken["authCreatedAt"] | null) => void;
  setAuthDuration: (duration: AuthToken["authDuration"] | null) => void;
  setAuthService: (service: AuthToken["authService"] | null) => void;
  setName: (name :  string) => void;
  setEmail: (email :  string) => void;
  setProfileImage: (image : SpotifyImageObject) => void;
  setCountry: (country :  string) => void;
  setSavedTracks: (tracks: Song[]) => void;
  setGamesPlayed: (played: number) => void;
  reset: () => void;
}

const defaults : PlayerProfile & PlayerData & AuthToken = {
  name: null,
  email: null,
  profileImage: null,
  country: null,
  savedTracks: [],
  gamesPlayed: 0,
  authToken: null,
  authCreatedAt: null,
  authDuration: null,
  authService: null,
}

const usePlayerStore = create<PlayerStoreState>()(devtools(persist((set) => ({
  ...defaults,
  setName: (name) => set({name}),
  setEmail: (email) => set({email}),
  setProfileImage: (profileImage) => set({profileImage}),
  setCountry: (country) => set({country}),
  setSavedTracks: (savedTracks) => set({savedTracks}),
  setGamesPlayed: (gamesPlayed) => set({gamesPlayed}),
  setAuthToken: (authToken) => set({authToken}),
  setAuthCreatedAt: (authCreatedAt) => set({authCreatedAt}),
  setAuthDuration: (authDuration) => set({authDuration}),
  setAuthService: (authService) => set({authService}),
  reset: () => set({...defaults})
}))))

export default usePlayerStore;
