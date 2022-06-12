import React from "react";
import {
  Avatar,
  Button,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import usePlayerStore from "../../stores/player";
import { loginURL } from "../../utils/spotify/spotifyRequests";


const WelcomeScreen = () => {

  return (
    <VStack px={4} py={16} spacing={8} align={{base: "flex-start", md: "center"}}>
      <Heading size="xl">
        How well do you know your playlist?
      </Heading>
      <Text maxW="3xl" textAlign={{md:"center"}}>In Songle, you have 6 guesses to figure out a song from your spotify playlist. After each guess, the list of possible next guesses narrows based on the similarities between your previous guesses and the correct choice. Connect your Spotify to play now.</Text>
      <Button 
      colorScheme={"green"} 
      onClick={() => window.open(loginURL, "_self")}
      >
        Connect your Spotify
      </Button>
    </VStack>
  );
};

export default WelcomeScreen;
