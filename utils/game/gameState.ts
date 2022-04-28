import { Game, PlayerData, Song } from "../../models";

export const loadCurrentGame = (): Game => {
    const currentGameString = localStorage.getItem("currentGame");
    if (currentGameString){
        const currentGameObj: Game = JSON.parse(currentGameString);
        return currentGameObj
    } else {
        const newGame: Game = createNewGame();
        return newGame;
    }
}

const createNewGame = (): Game => {
    const songs = getLimitedSongs(100);
    const song = getRandomSong(songs);
    const newGame: Game = {
        songOptions: songs,
        songsGuessed: [],
        correctSong: song,
        gameState: 'In Progress'
    }
    return newGame;
}


const getRandomSong = (songs: Song[]): Song => {
    const randomNum = Math.floor(Math.random() * songs.length -1);
    return songs[randomNum];
}

const getLimitedSongs = (range: number): Song[] => {
    const savedTrack: Song[] | undefined = getPlayerSavedTracks();
    if (savedTrack){
        if (savedTrack.length > range){
            const maxLeftPos = savedTrack.length - range;
            const randomNum = Math.floor(Math.random() * maxLeftPos);
            const filteredVals = savedTrack.filter(
                (item, i) =>  i <= randomNum + range && i > randomNum
            );
            return filteredVals;
        }
        return savedTrack;
    }
    return [];
}

const getPlayerSavedTracks = (): Song[] | undefined => {
    const playerDataString: string | null = localStorage.getItem("playerData");
    if (playerDataString){
        const playerDataObj: PlayerData = JSON.parse(playerDataString);
        if (playerDataObj.savedTracks){
            return playerDataObj.savedTracks;
        }
    }
    return undefined;
}