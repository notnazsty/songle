import { HStack, Stack, VStack, Text, Box } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Game, Song } from "../../models";
import Card from "../Game/Card";
import CardSlide from "../Game/CardSlide";
import Searchbar from "./Searchbar";
import SongItem from "./SongItem";

export interface SongListProps {
  currentGame: Game;
  setCurrentGame: Dispatch<SetStateAction<Game | undefined>>;
  songList: Song[];
  setSongList: Dispatch<SetStateAction<Song[] | undefined>>;
  currentGuess: Song | undefined;
  setCurrentGuess: Dispatch<SetStateAction<Song | undefined>>;
}

//TODO: replace currentGuess & setCurrentGuess with currentGame.songsGuessed

const SongList = ({
  currentGame,
  setCurrentGame,
  songList,
  setSongList,
  currentGuess,
  setCurrentGuess,
}: SongListProps): JSX.Element => {
  return (
    <VStack w="100%" spacing={8} px={{ base: 4, sm: 8 }}>

    {/* <CardSlide song={currentGame.correctSong} guesses={[]} /> */}

      <Searchbar
        songList={songList}
        setSongList={setSongList}
        currentGame={currentGame}
      />
      <VStack
        maxW="100%"
        w="100%"
        px={2}
        minH="100px"
        maxH="75vh"
        overflowY="scroll"
        overflowX="hidden"
        css={{
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "grey",
            borderRadius: "24px",
          },
        }}
      >
        <>
          {songList.map((song: Song, i: number) => (
            <SongItem key={i} song={song} setCurrentGame={setCurrentGame} currentGame={currentGame}/>
          ))}
          {songList.length === 0 && (
            <HStack w="100%" justifyContent="center" color="white" py="8">
              <Text fontSize="xl"> No results available...</Text>
            </HStack>
          )}
        </>
      </VStack>
      <HStack w="100%" justifyContent="center" color="white" py="8">
        <Text fontSize="md"> {songList.length} songs loaded </Text>
      </HStack>
    </VStack>
  );
};

export default SongList;
