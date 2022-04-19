import axios, { AxiosResponse } from "axios";
import {
  Song,
  SpotifyLibrarySongRequestResponse,
  SpotifyLibrarySongsData,
  SpotifyProfileData,
  SpotifyProfileRequestResponse,
  SpotifyRequestError,
  SpotifySongData,
} from "../../models";

const clientID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const redirectURI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

const authEndpoint = "https://accounts.spotify.com/authorize";
const scopes = ["user-read-private", "user-read-email", "user-library-read"];

export const loginURL = `${authEndpoint}?response_type=token&client_id=${clientID}&scope=${scopes.join(
  "%20"
)}&redirect_uri=${redirectURI}`;

export const getSpotifyData = async (
  authToken: string
): Promise<SpotifyProfileRequestResponse> => {
  const response: AxiosResponse<SpotifyRequestError | SpotifyProfileData, any> =
    await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    });

  const data: SpotifyProfileRequestResponse = {
    error:
      "error" in response.data
        ? {
            error: response.data.error,
          }
        : undefined,
    success: "display_name" in response.data ? response.data : undefined,
  };

  return data;
};

export const getUserSpotifyLibrarySongs = async (
  authToken: string
): Promise<SpotifyLibrarySongRequestResponse> => {
  let librarySongs: Song[] = [];

  let response: AxiosResponse<
    SpotifyRequestError | SpotifyLibrarySongsData,
    any
  > = await axios.get("https://api.spotify.com/v1/me/tracks?market=ES&limit=50&offset=0", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken,
    },
  });

  if ("error" in response.data) {
    return {
      error: {
        error: response.data.error,
      },
    };
  }

  librarySongs.push(
    ...transformSpotifyResponseToSongObject(response.data.items)
  );

  while ("next" in response.data && response.data.next != null) {
    response = await axios.get(response.data.next, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    });

    if ("error" in response.data) {
      break;
    }

    librarySongs.push(
      ...transformSpotifyResponseToSongObject(response.data.items)
    );
  }

  return {
    success: librarySongs,
  };
};

const transformSpotifyResponseToSongObject = (
  response: SpotifySongData[]
): Song[] => {
  let arr: Song[] = [];

  for (let i = 0; i < response.length; i++) {
    const songObj: Song = {
      name: response[i].track.name,
      album: response[i].track.album.name,
      artists: response[i].track.artists.map((artist) => artist.name),
      releaseDate: new Date(response[i].track.album.release_date),
      coverImages: response[i].track.album.images.map((image) => image),
    };
    arr.push(songObj);
  }
  return arr;
};


