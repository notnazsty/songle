import axios, { AxiosResponse } from "axios";
import {
  transformAxiosResToPlaylistSongs,
  transformAxiosResToSimplifiedPlaylistItems,
  transformSpotifyResponseToSongObject,
} from ".";
import {
  SpotifyProfileRequestResponse,
  SpotifyRequestError,
  SpotifyProfileData,
  Song,
  SpotifyLibrarySongsData,
  SimplifiedPlaylistData,
  SpotifyUserPlaylists,
  SpotifyUserPlaylistSongs,
} from "../../models";

const clientID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const webURI = process.env.NEXT_PUBLIC_WEB_URI;

const authEndpoint = "https://accounts.spotify.com/authorize";
const scopes = [
  "user-read-private",
  "user-read-email",
  "user-library-read",
  "playlist-read-private",
];

export const loginURL = `${authEndpoint}?response_type=token&client_id=${clientID}&scope=${scopes.join(
  "%20"
)}&redirect_uri=${webURI}callback/`;

//Fix Later to use Promise.resolve() & Promise.reject()
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

  return Promise.resolve(data);
};

export const getNumOfSpotifyLibrarySongsSaved = async (
  authToken: string
): Promise<number> => {
  let total = 0;

  let response: AxiosResponse<
    SpotifyRequestError | SpotifyLibrarySongsData,
    any
  > = await axios.get(
    "https://api.spotify.com/v1/me/tracks?market=ES&limit=1&offset=0",
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    }
  );

  if (!("error" in response.data)) {
    total += response.data.total;
  }

  return Promise.resolve(total);
};

export const getUserSpotifyLibrarySongs = async (
  authToken: string,
  setCurrentSongNumLoading: (fn: (count: number) => number) => void
): Promise<Song[]> => {
  let librarySongs: Song[] = [];
  let countHelper: number = 0;

  let response: AxiosResponse<
    SpotifyRequestError | SpotifyLibrarySongsData,
    any
  > = await axios.get(
    "https://api.spotify.com/v1/me/tracks?market=ES&limit=50&offset=0",
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    }
  );

  if ("error" in response.data) {
    return Promise.reject(response.data.error);
  }

  countHelper = response.data.items.length;
  setCurrentSongNumLoading((count) => count + countHelper);

  librarySongs.push(
    ...transformSpotifyResponseToSongObject(response.data.items)
  );

  // Uncomment when releasing b/c I have ~5000 songs saved

  while (typeof response.data.next === "string") {
    response = await axios.get(response.data.next, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    });

    if ("error" in response.data) {
      return Promise.resolve(librarySongs);
    }

    countHelper = response.data.items.length;
    setCurrentSongNumLoading((count) => count + countHelper);

    librarySongs.push(
      ...transformSpotifyResponseToSongObject(response.data.items)
    );
  }

  return Promise.resolve(librarySongs);
};

// Getting Users Playlists

export const getUserSpotifyPlaylists = async (
  accessToken: string
): Promise<SimplifiedPlaylistData[]> => {
  let simplifiedPlaylistItems: SimplifiedPlaylistData[] = [];

  let response: AxiosResponse<SpotifyRequestError | SpotifyUserPlaylists, any> =
    await axios.get(
      ` https://api.spotify.com/v1/me/playlists?offset=0&limit=20`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );

  if ("error" in response.data) {
    return Promise.reject(response.data.error);
  }

  simplifiedPlaylistItems.push(
    ...transformAxiosResToSimplifiedPlaylistItems(response.data.items)
  );

  while (typeof response.data.next === "string") {
    response = await axios.get(response.data.next, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });

    // Incase you hit an API rate limit it will just return all the songs that you already got
    if ("error" in response.data) {
      return Promise.resolve(simplifiedPlaylistItems);
    }

    simplifiedPlaylistItems.push(
      ...transformAxiosResToSimplifiedPlaylistItems(response.data.items)
    );
  }

  return Promise.resolve(simplifiedPlaylistItems);
};

// Getting songs from a playlist
export const getSongsFromSpotifyPlaylistWithID = async (
  playlistID: string,
  accessToken: string,
  setCurrentSongNumLoading: (fn: (count: number) => number) => void
): Promise<Song[]> => {
  let songsFromPlaylist: Song[] = [];
  let countHelper: number = 0;

  let totalLoaded = 0;

  let response: AxiosResponse<
    SpotifyRequestError | SpotifyUserPlaylistSongs,
    any
  > = await axios.get(
    `https://api.spotify.com/v1/playlists/${encodeURI(
      playlistID
    )}/tracks?market=ES&limit=50&offset=0`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }
  );

  if ("error" in response.data) {
    return Promise.reject(response.data.error);
  }

  countHelper = response.data.items.length;
  setCurrentSongNumLoading((count) => count + countHelper);
  totalLoaded += countHelper;

  songsFromPlaylist.push(
    ...transformAxiosResToPlaylistSongs(response.data.items)
  );

  while (typeof response.data.next === "string") {
    response = await axios.get(response.data.next, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });

    // Incase you hit an API rate limit it will just return all the songs that you already got
    if ("error" in response.data) {
      return Promise.resolve(songsFromPlaylist);
    }

    countHelper = response.data.items.length;
    setCurrentSongNumLoading((count) => count + countHelper);
    totalLoaded += countHelper;

    songsFromPlaylist.push(
      ...transformAxiosResToPlaylistSongs(response.data.items)
    );

    if (totalLoaded >= 250) {
      return Promise.resolve(songsFromPlaylist);
    }
  }

  return Promise.resolve(songsFromPlaylist);
};

// For fixes towards loading large playlists

export const getSongsFromPlaylistIDStartingFrom = async (
  playlistID: string,
  accessToken: string,
  position: number
) => {
  let songsFromPlaylist: Song[] = [];

  let response: AxiosResponse<
    SpotifyRequestError | SpotifyUserPlaylistSongs,
    any
  > = await axios.get(
    `https://api.spotify.com/v1/playlists/${encodeURI(
      playlistID
    )}/tracks?market=ES&limit=50&offset=${position}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }
  );

  if ("error" in response.data) {
    return Promise.reject(response.data.error);
  }

  songsFromPlaylist.push(
    ...transformAxiosResToPlaylistSongs(response.data.items)
  );

  while (typeof response.data.next === "string") {
    response = await axios.get(response.data.next, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });

    // Incase you hit an API rate limit it will just return all the songs that you already got
    if ("error" in response.data) {
      return Promise.resolve(songsFromPlaylist);
    }

    songsFromPlaylist.push(
      ...transformAxiosResToPlaylistSongs(response.data.items)
    );
  }

  return Promise.resolve(songsFromPlaylist);
};
