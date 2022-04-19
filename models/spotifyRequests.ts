import { Song } from "./songs";

export interface AuthToken {
  service: "Spotify" | "Apple";
  authToken: string;
  createdAt: Date;
  duration: number;
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

export interface SpotifySongData {
  added_at: string;
  track: {
    album: {
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
    };
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
  };
}

export interface SpotifyLibrarySongsData {
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
  success?: Song[];
}
