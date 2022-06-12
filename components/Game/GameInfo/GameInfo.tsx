import { CloseIcon } from "@chakra-ui/icons";
import {
  AspectRatio,
  Box,
  Center,
  Grid,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import useGameStore from "../../../stores/game";

const GameInfo = () => {
  const gameState = useGameStore((state) => state.gameState);
  const songsGuessed = useGameStore((state) => state.songsGuessed);
  const numOfSongsGuessed = useMemo(() => songsGuessed.length, [songsGuessed]);
  const MAX_GUESSES = 6;

  const guessBgColor = (i: number, numOfSongsGuessed: number) => {
    if (i < numOfSongsGuessed) {
      return "red.700";
    } else {
      return "gray.800";
    }
  };

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
        <Text fontSize="md" color="gray.400">{`${
          MAX_GUESSES - numOfSongsGuessed
        } guesses remaining`}</Text>
      </VStack>
      <VStack align={"start"}>
        <Text fontWeight={"bold"}>Similarities</Text>
        <Text color="gray.300">The similarities between your guesses and the correct answer will appear here.</Text>
      </VStack>
    </VStack>
  );
};

export default GameInfo;
