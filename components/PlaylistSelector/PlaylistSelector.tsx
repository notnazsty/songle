import { VStack, Text, HStack, Grid, Image } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Game, Song } from "../../models";
import useGameStore from "../../stores/game";
import usePlayerStore from "../../stores/player";
import usePlaylistStore from "../../stores/playlists";

const PlaylistSelector = () => {

  const savedTracks = usePlayerStore(state => state.savedTracks)
  const setCorrectSong = useGameStore(state => state.setCorrectSong);
  const setGameState = useGameStore(state => state.setGameState);
  const setSongList = useGameStore(state => state.setSongList);
  const setSongOptions = useGameStore(state => state.setSongOptions);
  const setSongsGuessed = useGameStore(state => state.setSongsGuessed);

  const playlists = usePlaylistStore((state) => state.playlists);

  useEffect(() => {
    console.log(playlists)
  
    
  }, [playlists] )
  


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

  // TODO ADD SWIPER INFINIT LOOP CAROUSEL

  return (
    <VStack>
      <Text fontSize={"2xl"}>Choose a playlist</Text>
      <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(5, 1fr)" }}>
       
        {playlists.map((playlist, i) => (<Image key={i} src={typeof playlist.playlistCover === "string" ? playlist.playlistCover : playlist.playlistCover[1].url} alt={playlist.name} />))}

      </Grid>
      <HStack as="button" border={"1px"} p={2} rounded='25' onClick={() => createNewGame(savedTracks)}>
        <Text> Start New Game </Text>
      </HStack>
    </VStack>
  );
};

export default PlaylistSelector;
