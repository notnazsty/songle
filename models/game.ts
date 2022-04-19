import { Song } from "./songs";
import { SpotifyImageObject } from "./spotifyRequests";

export interface PlayerProfile {
  name: string;
  email: string;
  profileImage: SpotifyImageObject;
  country: string;
}

// To make sure there is enough local storage space calculate games played and seperate the game history data into 
// multiple different localStorage entries whose length can be calculated based on how many games were played.
export interface Game{
    songOptions: Song[],
    songsGuessed: Song[],
    correctSong: Song
}


export interface PlayerData {
  profile: PlayerProfile;
  savedTracks: Song[];
  gamesPlayed: number;
}
