import { VStack, Text, HStack, Grid } from "@chakra-ui/react";
import React from "react";
import { Game, Song } from "../../models";
import useGameStore from "../../stores/game";
import usePlayerStore from "../../stores/player";

const PlaylistSelector = () => {

  const savedTracks = usePlayerStore(state => state.savedTracks)
  const setCorrectSong = useGameStore(state => state.setCorrectSong);
  const setGameState = useGameStore(state => state.setGameState);
  const setSongList = useGameStore(state => state.setSongList);
  const setSongOptions = useGameStore(state => state.setSongOptions);
  const setSongsGuessed = useGameStore(state => state.setSongsGuessed);


  const createNewGame = (savedTracks: Song[]) => {
    const songs = getLimitedSongs(savedTracks, 100);
    const song = getRandomSong(songs);

    setSongList(songs)
    setCorrectSong(song)
    setSongOptions(songs)
    setSongsGuessed([]);
    setGameState("In Progress");
    // createLocalGameRoundData();
  };
  
  const getRandomSong = (songs: Song[]): Song => {
    const randomNum = Math.floor(Math.random() * songs.length - 1);
    return songs[randomNum];
  };
  
  const getLimitedSongs = (savedTracks: Song[], range: number): Song[] => {
    if (savedTracks) {
      if (savedTracks.length > range) {
        const maxLeftPos = savedTracks.length - range;
        const randomNum = Math.floor(Math.random() * maxLeftPos);
        const filteredVals = savedTracks.filter(
          (item, i) => i <= randomNum + range && i > randomNum
        );
        return filteredVals;
      }
      return savedTracks;
    }
    return [];
  };
    
  return (
    <VStack>
      <Text fontSize={"2xl"}>Choose a playlist</Text>
      <Grid templateColumns={{base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(5, 1fr)"}}>
        <HStack as="button" border={"1px"} p={6} onClick={() => createNewGame(savedTracks)}>
          <Text>Saved Tracks</Text>
        </HStack>
      </Grid>
    </VStack>
  );
};

export default PlaylistSelector;
