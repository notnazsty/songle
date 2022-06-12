import { VStack, Text, Button } from '@chakra-ui/react';
import React from 'react'
import useGameStore from '../../stores/game'

const EndScreen = () => {
  const gameState = useGameStore(state => state.gameState);
  const resetGame = useGameStore(state => state.reset);

  return (
    <VStack w="100%">
      {gameState === "Win" && <Text fontSize={"5xl"} color="green.600" fontWeight={"bold"}>
        {"You Won!"}
      </Text>}
      {gameState === "Loss" && <Text fontSize={"5xl"} color="red.600" fontWeight={"bold"}>
        {"You Lost :("}
      </Text>}
      <Button onClick={resetGame} bg="gray.900" _hover={{bg: "gray.700"}} _active={{bg: "gray.700"}}>Play again</Button>
    </VStack>
  )
}

export default EndScreen