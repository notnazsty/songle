import {
  Button,
  HStack,
  Spinner,
  VStack,
  Image,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import SongList from "../components/Search/SongList";
import { AuthToken, Game, PlayerData, PlayerProfile, Song } from "../models";
import { loadCurrentGame } from "../utils";
import { saveSpotifyLibrarySongData } from "../utils/spotify/spotifyActions";
import { loginURL } from "../utils/spotify/spotifyRequests";

const Home: NextPage = () => {
  const [authToken, setAuthToken] = useState<AuthToken>();
  const [songList, setSongList] = useState<Song[]>();
  const [playerData, setPlayerData] = useState<PlayerData>();
  const [currentGame, setCurrentGame] = useState<Game>();
  const [isLoading, setIsLoading] = useState(false);

  //Pulling authToken from localStorage and updating it if necessary (make this only reload the page once)
  useEffect(() => {
    const localAuthToken: string | null = localStorage.getItem("authToken");
    if (localAuthToken) {
      const authTokenObj: AuthToken = JSON.parse(localAuthToken);
      if (
        new Date(authTokenObj.createdAt).getTime() + authTokenObj.duration >
        new Date().getTime()
      ) {
        window.location.reload();
      }
      setAuthToken(authTokenObj);
    }
  }, [authToken]);

  useEffect(() => {
    const playerDataString: string | null = localStorage.getItem("playerData");
    if (playerDataString) {
      const playerDataObj: PlayerData = JSON.parse(playerDataString);
      setPlayerData(playerDataObj);

      const currentGame = loadCurrentGame();
      setSongList(currentGame.songOptions);
      localStorage.setItem('currentGame', JSON.stringify(currentGame));
      setCurrentGame(currentGame);
    }
  }, []);

  return (
    <VStack bgColor="black" minH="100vh" h="100%">
      <Head>
        <title>Songle</title>
        <meta name="description" content="Songle a music puzzle game." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image
        src="spotify-icon.png"
        alt="spotify login"
        cursor="pointer"
        w="16"
        h="16"
        onClick={() => window.open(loginURL, "_self")}
        mt={8}
      />

      <Button
        onClick={async () => {
          if (authToken) {
            setIsLoading(true);
            await saveSpotifyLibrarySongData(authToken.authToken);
            setIsLoading(false);
          }
        }}
      >
        {" "}
        Request Profile{" "}
      </Button>

      {isLoading && (
        <HStack w="100%" justifyContent="center" my={4}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="teal.200"
            color="teal.800"
            size="xl"
          />
        </HStack>
      )}

      {songList && !isLoading && currentGame &&  (
        <SongList
          songList={songList}
          setSongList={setSongList}
          currentGame={currentGame}
        />
      )}
    </VStack>
  );
};

export default Home;
