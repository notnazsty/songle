import { Song } from "./songs";

export interface AuthToken {
  authService: "Spotify" | "Apple" | null; // Apple Support In The Future?
  authToken: string | null;
  authCreatedAt: number | null;
  authDuration: number | null;
}

export interface SpotifyImageObject {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyRequestError {
  error: {
    status: 401 | 403 | 429;
    message: string;
  };
}

export interface SpotifyProfileData {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: SpotifyImageObject[];
  product: string;
  type: string;
  uri: string;
}

interface ArtistMetaData {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface AlbumInfo {
  album_type: string;
  artists: ArtistMetaData[];
  available_markets: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: SpotifyImageObject[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

interface Track {
  album: AlbumInfo;
  artists: ArtistMetaData[];
  available_markets: string;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: string;
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface SpotifySongData {
  added_at: string;
  track: Track;
}

export interface SpotifyLibrarySongsData {
  map(arg0: (song: any) => any): Song[];
  href: string;
  items: SpotifySongData[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface SpotifyProfileRequestResponse {
  error?: SpotifyRequestError;
  success?: SpotifyProfileData;
}

export interface SpotifyLibrarySongRequestResponse {
  error?: SpotifyRequestError;
  success?: SpotifyLibrarySongsData;
}

// FOR PLAYLIST REQUESTS

export interface SpotifyUserPlaylistsRequestResponse {
  error?: SpotifyRequestError;
  success?: SpotifyUserPlaylists;
}

export interface SimplifiedPlaylistData {
  name: string;
  total: number;
  id: string;
  playlistCover: SpotifyImageObject[];
}

export interface SpotifyUserPlaylists {
  href: string;
  items: SpotifyPlaylistItem[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface SpotifyPlaylistItem {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: SpotifyImageObject[];
  name: string;
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: any;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}


// Requesting Songs From A Specific Playlist
export interface SpotifyPlaylistSongItem {
  added_at: string;
  added_by: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  is_local: boolean;
  primary_color: any;
  track: Track;
  video_thumbnail: {
    url: string | null;
  };
}

export interface SpotifyUserPlaylistSongs {
  href: string;
  items: SpotifyPlaylistSongItem[];
  limit: number;
  next: string | null;
  offset: number;
  previous: null | string;
  total: number;
}

export interface SpotifyUserPlaylistsSongsRequestResponse {
  error?: SpotifyRequestError;
  success?: SpotifyUserPlaylistSongs;
}

