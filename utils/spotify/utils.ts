import { SpotifyPlaylistSongItem, Song, SimplifiedPlaylistData, SpotifyPlaylistItem, SpotifySongData } from "../../models";

export const transformSpotifyResponseToSongObject = (
    items: SpotifySongData[]
  ): Song[] => {
    let songsFromSelection: Song[] = [];
  
    items.forEach((item: SpotifySongData) => {
      const songObject: Song = {
        name: item.track.name,
        coverImages: item.track.album.images.map((imageObj) => imageObj),
        album: item.track.album.name,
        releaseDate: new Date(item.track.album.release_date).getFullYear().toString(),
        artists: item.track.artists.map((artist) => artist.name),
      };
      songsFromSelection.push(songObject);
    });
  
    return songsFromSelection;
  };

export const transformAxiosResToSimplifiedPlaylistItems = (
    items: SpotifyPlaylistItem[]
  ): SimplifiedPlaylistData[] => {
    let simplifiedPlaylistItems: SimplifiedPlaylistData[] = [];
  
    items.forEach((playlist: SpotifyPlaylistItem) => {
      const simplifiedPlaylistData: SimplifiedPlaylistData = {
        name: playlist.name,
        total: playlist.tracks.total,
        id: playlist.id,
        playlistCover: playlist.images,
      };
      simplifiedPlaylistItems.push(simplifiedPlaylistData);
    });
  
    return simplifiedPlaylistItems;
  };

export const transformAxiosResToPlaylistSongs = (
    items: SpotifyPlaylistSongItem[]
  ): Song[] => {
    let songsFromSelection: Song[] = [];
  
    items.forEach((item: SpotifyPlaylistSongItem) => {
      const songObject: Song = {
        name: item.track.name,
        coverImages: item.track.album.images.map((imageObj) => imageObj),
        album: item.track.album.name,
        releaseDate: new Date(item.track.album.release_date).getFullYear().toString(),
        artists: item.track.artists.map((artist) => artist.name),
      };
      songsFromSelection.push(songObject);
    });
  
    return songsFromSelection;
  };