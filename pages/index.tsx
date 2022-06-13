import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Box, Button } from "@chakra-ui/react";

import Navbar from "../components/Navbar/Navbar";
import WelcomeScreen from "../components/Welcome/WelcomeScreen";
import usePlayerStore from "../stores/player";
import useGameStore from "../stores/game";
import PlaylistSelector from "../components/PlaylistSelector/PlaylistSelector";
import Game from "../components/Game/Game";
import EndScreen from "../components/End/EndScreen";
import { getSongLyrics } from "../utils/genius";
import { getUserSpotifyPlaylists } from "../utils";

const Home: NextPage = () => {
  const [initialRender, setInitialRender] = useState(false);

  const authToken = usePlayerStore((state) => state.authToken);

  const gameState = useGameStore((state) => state.gameState);


  useEffect(() => {
    console.log(authToken)
  }, [authToken])

  useEffect(() => {
    setInitialRender(true);
  }, []);

  const renderScreen = () => {
    if (!authToken) {
      return <WelcomeScreen />;
    }

    switch (gameState) {
      case "Not Started":
        return <PlaylistSelector />;
      case "Fetching Songs":
      case "In Progress":
        return <Game />;
      case "Win":
      case "Loss":
        return <EndScreen />;
      default:
        const exhaustive: never = gameState;
    }
  };

  if (!initialRender) {
    return <></>;
  }

  return (
    <Box bg={"black"} color="gray.300" minH="100vh">
      <Head>
        <title>Songle</title>
        <meta name="description" content="Songle a music puzzle game." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      {renderScreen()}
    </Box>
  );
};

export default Home;
