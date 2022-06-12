import { Grid, HStack, Stack, VStack, Text, Box } from "@chakra-ui/react";
import React from "react";
import GameInfo from "./GameInfo/GameInfo";
import Searchbar from "./SearchSongs/Searchbar";
import SongGrid from "./SongGrid/SongGrid";

const Game = () => {
  return (
    <Grid templateColumns={{ lg: "300px 1fr" }} gridGap={12} px={4} py={2}>
      <GameInfo />
      <VStack align="start" spacing={6}>
        <Stack w="100%" direction={{base: "column", lg: "row" }} align={{base: "start", lg:"center"}} justify={{lg: "space-between"}}>
          <Text flexShrink={0} mt={0} fontSize={"4xl"} fontWeight="bold" lineHeight={{lg: 0}}>
            Make a Guess!
          </Text>
          <Box w="100%" maxW="xl">
            <Searchbar />
          </Box>
        </Stack>
        <SongGrid />
      </VStack>
    </Grid>
  );
};

export default Game;
