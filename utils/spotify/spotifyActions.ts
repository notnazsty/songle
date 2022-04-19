import {
  PlayerData,
  PlayerProfile,
  SpotifyLibrarySongRequestResponse,
} from "../../models";
import { getSpotifyData, getUserSpotifyLibrarySongs } from "./spotifyRequests";

export const saveSpotifyLibrarySongData = async (authToken: string) => {
  const libraryRequestResponse: SpotifyLibrarySongRequestResponse =
    await getUserSpotifyLibrarySongs(authToken);

  if (libraryRequestResponse.error) {
    return;
  }

  const playerDataString = localStorage.getItem("playerData");

  if (playerDataString && libraryRequestResponse.success) {
    let playerDataObj: PlayerData = JSON.parse(playerDataString);
    playerDataObj = {
      profile: playerDataObj.profile,
      savedTracks: libraryRequestResponse.success.map((song) => song),
      gamesPlayed: playerDataObj.gamesPlayed,
    };
    localStorage.setItem("playerData", JSON.stringify(playerDataObj));
    return;
  }

  // When local storage does not contain anything for playerData but libraryRequestResponse returns a successful value
  if (libraryRequestResponse.success) {
    let newPlayerDataObj: PlayerData;
    const playerSpotifyData = await getSpotifyData(authToken);
    if (playerSpotifyData.success) {
      const playerProfile: PlayerProfile = {
        name: playerSpotifyData.success.display_name,
        email: playerSpotifyData.success.email,
        profileImage: playerSpotifyData.success.images[0],
        country: playerSpotifyData.success.country,
      };

      newPlayerDataObj = {
        profile: playerProfile,
        savedTracks: libraryRequestResponse.success.map((song) => song),
        gamesPlayed: 0,
      };
      localStorage.setItem("playerData", JSON.stringify(newPlayerDataObj));
      return;
    }
  }
};


