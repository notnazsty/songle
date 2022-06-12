import { Button, VStack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect } from "react";
import {
  AuthToken,
  PlayerData,
  PlayerProfile,
  Song,
  SpotifyLibrarySongRequestResponse,
  SpotifyRequestError,
} from "../models";
import usePlayerStore from "../stores/player";
import {
  getSpotifyData,
  getUserSpotifyLibrarySongs,
} from "../utils/spotify/spotifyRequests";

const Home: NextPage = () => {
  const setAuthToken = usePlayerStore((state) => state.setAuthToken);
  const setName = usePlayerStore((state) => state.setName);
  const setProfileImage = usePlayerStore((state) => state.setProfileImage);
  const setEmail = usePlayerStore((state) => state.setEmail);
  const setCountry = usePlayerStore((state) => state.setCountry);
  const setSavedTracks = usePlayerStore((state) => state.setSavedTracks);
  const setGamesPlayed = usePlayerStore((state) => state.setGamesPlayed);

  const webURI = process.env.NEXT_PUBLIC_WEB_URI;

  const saveSpotifyLibrarySongData = useCallback(
    async (authToken: string, callback: () => void) => {

      let librarySavedTracks: Song[] | SpotifyRequestError = [];

      try {
        librarySavedTracks = await getUserSpotifyLibrarySongs(authToken);
      } catch (err) {
        console.log(err)
      }
      
      const playerSpotifyData = await getSpotifyData(authToken);
        if (playerSpotifyData.success) {
          setName(playerSpotifyData.success.display_name);
          setEmail(playerSpotifyData.success.email);
          setProfileImage(playerSpotifyData.success.images[0]);
          setCountry(playerSpotifyData.success.country);
          setSavedTracks(librarySavedTracks.map((song) => song));
          setGamesPlayed(0);
        }
      
      callback();
    },
    [
      setCountry,
      setEmail,
      setGamesPlayed,
      setName,
      setProfileImage,
      setSavedTracks,
    ]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userToken = window.location.hash.substring(
        window.location.hash.indexOf("token=") + 6,
        window.location.hash.indexOf("&token_type")
      );
      const duration = window.location.hash.substring(
        window.location.hash.indexOf("expires_in=") + 11
      );

      if (
        typeof userToken === "string" &&
        userToken !== "" &&
        typeof duration === "string" &&
        userToken !== ""
      ) {
        // const authToken: AuthToken = {
        //     service: 'Spotify',
        //     authToken: userToken,
        //     createdAt: (new Date()).getUTCMilliseconds(),
        //     duration: parseInt(duration)
        // }

        setAuthToken(userToken);
        saveSpotifyLibrarySongData(userToken, () => window.open(webURI, "_self"))
      } else {
        setAuthToken(null);
        window.open(webURI, "_self");
      }
    } else {
      setAuthToken(null);
    }
  }, [saveSpotifyLibrarySongData, setAuthToken, webURI]);

  return (
    <VStack>
      <Head>
        <title>Songle</title>
        <meta name="description" content="callback" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Text>Loading...</Text>
    </VStack>
  );
};

export default Home;
