import { Box, HStack, Image, Stack, Text } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import { Game, Song } from "../../models";

interface SongItemProps {
  song: Song;
  currentGame: Game;
  setCurrentGame: Dispatch<SetStateAction<Game | undefined>>;
}

const SongItem = ({
  song,
  setCurrentGame,
  currentGame,
}: SongItemProps): JSX.Element => {

  //TODO update the state of the game based on guesses
  const updateGameState = () => {
    const newGameState: Game = {
      songOptions: currentGame.songOptions,
      songsGuessed: [...currentGame.songsGuessed, song],
      correctSong: currentGame.correctSong,
      gameState: "Win",
    };
    setCurrentGame(newGameState);
    localStorage.setItem("currentGame", JSON.stringify(newGameState));
    // TODO need to update playerData 
  };

  return (
    <HStack
      justifyContent="space-between"
      w="100%"
      color={"white"}
      py={{ base: 1, sm: 2 }}
      px={{ base: 2, sm: 4 }}
      textAlign="left"
      spacing={4}
      borderBottom={{ base: "1px", sm: "0px" }}
      rounded="lg"
      _hover={{ bgColor: "#2A2A2A" }}
      cursor="pointer"
      onClick={() => {
        updateGameState();
      }}
    >
      <Image
        src={
          song.coverImages && song.coverImages[2] && song.coverImages[2].url
            ? song.coverImages[2].url
            : "www.google.com" //replace with another placeholder
        }
        w={{ base: "75", md: "100" }}
        h={{ base: "75", md: "100" }}
        alt="album cover"
        border={"1px"}
        borderColor={"white"}
        mr={{ base: 2, sm: 8 }}
      />
      {/* 
        NOTICE: Did not notice a huge boost in performance from using a lazy load
      <LazyLoadImage
        alt={song.name}
        width={{ base: 75, md: 100 }}
        height={{ base: 75, md: 100 }}
        src={song.coverImages[2].url}
        treshold={150}
        border={"1px"}
        borderColor={"white"}
        mr={{ base: 2, sm: 8 }}
      /> */}
      <Stack
        direction={{ base: "column", sm: "row" }}
        spacing={{ base: 0, sm: 4 }}
        w="100%"
      >
        <Box w={{ base: "100%", sm: "33%" }}>
          <Text fontSize={{ base: "md", sm: "lg", md: "xl" }} fontWeight="bold">
            {" "}
            {song.name}{" "}
          </Text>
          <Text
            fontSize={{ base: "xs", sm: "sm", md: "md" }}
            fontStyle="italic"
          >
            {" "}
            {song.artists.join(", ")}{" "}
          </Text>
        </Box>
        <Box w={{ base: "100%", sm: "33%" }}>
          <Text> {song.album} </Text>
        </Box>

        <Box w={{ base: "100%", sm: "33%" }}>
          <Text> {new Date(song.releaseDate).getFullYear().toString()} </Text>
        </Box>
      </Stack>
    </HStack>
  );
};

export default SongItem;
