import { GameRoundData, Song, SongSimilarity } from "../../models";
import { intersect } from "../array/intersect";

export const songSimilarities: (a: Song, b: Song) => SongSimilarity = (
  a,
  b
) => {
  const name = intersect(a.name.split(" ").map((val) => val.trim().toLowerCase()), b.name.split(" ").map((val) => val.trim().toLowerCase()));
  const album = intersect(a.album.split(" ").map((val) => val.trim().toLowerCase()), b.album.split(" ").map((val) => val.trim().toLowerCase()));
  const artists = intersect(a.artists.map((val) => val.trim()), b.artists.map((val) => val.trim()));

  return {
    name,
    album,
    artists,
  };
};


// fix this
export const filterSongOptions : (guess: Song, correctSong: Song | null, songOptions: Song[]) => Song[] = (guess, correctSong, songOptions) => {
    
    if (!correctSong) {
        return songOptions;
    }

    const similarities = songSimilarities(guess, correctSong);

    return songOptions.filter((val) => {
        for (let i = 0; i < similarities.name.length; i++) {
            const word = similarities.name[i];
           if (!val.name.toLowerCase().includes(word)) {
            return false;
           }
        }

        for (let i = 0; i < similarities.album.length; i++) {
            const word = similarities.album[i];
           if (!val.album.toLowerCase().includes(word)) {
            return false;
           }
        }

        for (let i = 0; i < similarities.artists.length; i++) {
            const artist = similarities.artists[i];
           if (!val.artists.includes(artist)) {
            return false;
           }
        }
        
        return true;
    })
}

export const blank = {};
