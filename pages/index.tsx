import { Button, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Searchbar from "../components/Search/Searchbar";
import SongList from "../components/Search/SongList";
import { AuthToken, PlayerData, Song } from "../models";
import { saveSpotifyLibrarySongData } from "../utils/spotify/spotifyActions";
import {
  loginURL,
} from "../utils/spotify/spotifyRequests";

const Home: NextPage = () => {

  const [authToken, setAuthToken] = useState<AuthToken>();
  const [songList, setSongList] = useState<Song[]>();

  //Pulling authToken from localStorage and updating it if necessary
  useEffect(() => {
    const localAuthToken: string | null = localStorage.getItem("authToken");
    if (localAuthToken) {
      const authTokenObj: AuthToken = JSON.parse(localAuthToken);
      if (new Date(authTokenObj.createdAt).getTime() + authTokenObj.duration > new Date().getTime()){
        window.location.reload()
      }
      setAuthToken(authTokenObj);
    }
  }, [authToken]);

  useEffect(() => {
    const playerDataString = localStorage.getItem("playerData");
    if (playerDataString){
      const playerDataObj: PlayerData = JSON.parse(playerDataString);
      setSongList(playerDataObj.savedTracks);
    }    
  }, [])

  return (
    <VStack bgColor="black" minH="100vh" h="100%">
      <Head>
        <title>Songle</title>
        <meta name="description" content="Songle a music puzzle game." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VStack>
        <Searchbar />
      </VStack>

      <Button
        colorScheme="purple"
        onClick={() => window.open(loginURL, "_self")}
      >
        {" "}
        Login{" "}
      </Button>

      <Button
        onClick={() =>
          authToken ? saveSpotifyLibrarySongData(authToken.authToken) : null
        }
      >
        {" "}
        Request Profile{" "}
      </Button>


      {songList && (
        <SongList list={songList} />
      )}


    </VStack>
  );
};

export default Home;
