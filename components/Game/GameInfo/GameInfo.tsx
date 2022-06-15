import { CloseIcon } from "@chakra-ui/icons";
import {
  Center,
  Grid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import useGameStore from "../../../stores/game";
import { getInitialHint, getSongLyrics } from "../../../utils/genius";

const GameInfo = () => {

  const correctSong = useGameStore((state) => state.correctSong)
  const hint = useGameStore((state) => state.hint);
  const songsGuessed = useGameStore((state) => state.songsGuessed);
  const numOfSongsGuessed = useMemo(() => songsGuessed.length, [songsGuessed]);
  const MAX_GUESSES = 6;

  const currentSongLyrics = useGameStore((state) => state.currentSongLyrics);
  const setCurrentSongLyrics = useGameStore((state) => state.setCurrentSongLyrics)

  const guessBgColor = (i: number, numOfSongsGuessed: number) => {
    if (i < numOfSongsGuessed) {
      return "red.700";
    } else {
      return "gray.800";
    }
  };

  const [songLyricHint, setSongLyricHint] = useState("")

  useEffect(() => {
    if (correctSong && !currentSongLyrics) {
      setCurrentSongLyrics(" ")

      getSongLyrics({
        name: correctSong.name,
        artists: correctSong.artists
      }).then((lyric) => {
        setCurrentSongLyrics(lyric);
        setSongLyricHint(getInitialHint(lyric));
      }).catch((err) => console.log(err))
    }

  }, [correctSong, currentSongLyrics, setCurrentSongLyrics])


  return (
    <VStack align={"stretch"} spacing={6}>
      <VStack align={"start"}>
        <Grid w="100%" maxW="300px" templateColumns={"repeat(6, 1fr)"}>
          {Array.from({ length: MAX_GUESSES }, (val, i) => (
            <Center
              key={i}
              boxSize={10}
              rounded="md"
              bg={guessBgColor(i, numOfSongsGuessed)}
              borderWidth="1px"
              borderColor={i == numOfSongsGuessed ? "blue.500" : "gray.800"}
            >
              {i < numOfSongsGuessed && <CloseIcon boxSize={3} />}
            </Center>
          ))}
        </Grid>
        <Text fontSize="md" color="gray.400">{`${MAX_GUESSES - numOfSongsGuessed
          } guesses remaining`}</Text>
      </VStack>
      <VStack align={"start"} spacing={4}>
        {currentSongLyrics && !(currentSongLyrics.length > 2) && (
          <Center w='100%'>
            <Spinner size='md' color='orange' thickness="3px" />
          </Center>
        )}

        {songLyricHint &&
          <VStack align={"start"} w='100%' justifyContent='space-between'>
            <Text fontWeight={"bold"}> Lyrics: </Text>
            {songLyricHint.split("\n").map((l, i) => (<Text key={i}> {l} </Text>))}
            {/* <Button size='xs' colorScheme='green' onClick={() => {
              if (correctSong) {
                setSongLyricHint(getNextHint(currentSongLyrics, songLyricHint))
              }
            }}> Next</Button> */}
          </VStack>}

        <Text fontWeight={"bold"}>Hints</Text>
        {!hint && (
          <Text color="gray.300">
            Hints based on the similarities between your guesses and the
            correct answer will appear here.
          </Text>
        )}

        {hint && hint.name.length > 0 && (
          <VStack>
            <Text>Name: {hint.name.join(", ")}</Text>
          </VStack>
        )}
        {hint && hint.album.length > 0 && (
          <VStack>
            <Text>Album: {hint.album.join(", ")}</Text>
          </VStack>
        )}
        {hint && hint.artists.length > 0 && (
          <VStack>
            <Text>Artists: {hint.artists.join(", ")}</Text>
          </VStack>
        )}
      </VStack>
    </VStack>
  );
};

export default GameInfo;
