import { VStack, Text, Button, Image, Box, Heading, Center } from '@chakra-ui/react';
import React from 'react'
import useGameStore from '../../stores/game'

const EndScreen = () => {
  const gameState = useGameStore(state => state.gameState);
  const resetGame = useGameStore(state => state.reset);
  const correctSong = useGameStore((state) => state.correctSong)

  return (
    <VStack w="100%">
      {gameState === "Win" && <Text fontSize={"5xl"} color="green.400" fontWeight={"bold"}>
        {"You Won!"}
      </Text>}
      {gameState === "Loss" && <Text fontSize={"5xl"} color="red.200" fontWeight={"bold"}>
        {"You Lost :("}
      </Text>}
      
      {correctSong && (
        <Center display='flex' flexDirection='column' py={8}>
          <Image src={correctSong.coverImages[1].url} alt={correctSong.name} />
          <Heading> {correctSong.name} </Heading>
          <Text> {correctSong.album} </Text>
          <Text> {correctSong.artists.join(", ")}</Text>
        </Center>
      )}
      <Button onClick={resetGame} bg="gray.900" _hover={{ bg: "gray.700" }} _active={{ bg: "gray.700" }}>Play again</Button>
    </VStack>
  )
}

export default EndScreen