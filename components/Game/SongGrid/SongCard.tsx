import {
  Text,
  VStack,
  Image,
  HStack,
  Box,
  AspectRatio,
} from "@chakra-ui/react";
import React from "react";
import { Song } from "../../../models";
import useGameStore from "../../../stores/game";
import usePlayerStore from "../../../stores/player";
import { filterSongOptions, songSimilarities } from "../../../utils";
import areArraysEqual from "../../../utils/array/equality";

interface Props {
  song: Song;
}

const SongCard: React.FC<Props> = ({ song }) => {
  const correctSong = useGameStore((state) => state.correctSong);
  const songOptions = useGameStore((state) => state.songOptions);
  const songsGuessed = useGameStore((state) => state.songsGuessed);

  const setSongsGuessed = useGameStore((state) => state.setSongsGuessed);
  const setGameState = useGameStore((state) => state.setGameState);
  const setSongOptions = useGameStore((state) => state.setSongOptions);
  const setHint = useGameStore((state) => state.setHint);
  const setSearchbarQuery = useGameStore((state) => state.setSearchbarQuery);

  const gamesPlayed = usePlayerStore((state) => state.gamesPlayed);
  const setGamesPlayed = usePlayerStore((state) => state.setGamesPlayed);

  const makeGuess = () => {
    const newSongsGuessed = [...songsGuessed, song];
    setSongsGuessed(newSongsGuessed);

    const filteredSongOptions = filterSongOptions(
      song,
      correctSong,
      songOptions
    );
    setSongOptions(filteredSongOptions);

    const hint = correctSong ? songSimilarities(song, correctSong) : null;
    setHint(hint);

    setSearchbarQuery("");

    if (
      song.name === correctSong?.name &&
      song.album === correctSong?.album &&
      areArraysEqual(song.artists, correctSong?.artists, false)
    ) {
      setGameState("Win");
      setGamesPlayed(gamesPlayed + 1)
    } else if (newSongsGuessed.length === 6) {
      setGameState("Loss");
      setGamesPlayed(gamesPlayed + 1)

    }


  };

  return (
    <HStack
      w="100%"
      border="1px"
      borderColor={"gray.500"}
      rounded="md"
      overflow={"hidden"}
      cursor="pointer"
      _hover={{ borderColor: "blue.500" }}
      onClick={makeGuess}
    >
      <Box
        w="100%"
        h="100%"
        minH={{ base: "100px", lg: "160px" }}
        maxW={{ base: "100px", lg: "160px" }}
        bgPos="center"
        bgSize={"cover"}
        bgImage={
          song.coverImages.length > 2
            ? song.coverImages[1].url
            : song.coverImages.length > 1
            ? song.coverImages[0].url
            : ""
        }
      ></Box>
      <VStack align="stretch" px={4} py={2}>
        <Text fontWeight={"bold"} fontSize={{ base: "md", lg: "lg" }}>
          {song.name}
        </Text>
        <Text fontSize={{ base: "sm", lg: "md" }}>{song.album}</Text>
        <Text fontSize={{ base: "sm", lg: "md" }}>
          {song.artists.join(", ")}
        </Text>
        {/* <Text>{new Date(song.releaseDate).getFullYear()}</Text> */}
      </VStack>
    </HStack>
  );
};

export default SongCard;
