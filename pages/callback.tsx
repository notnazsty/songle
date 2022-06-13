import { Button, VStack, Text, Heading, Center, Progress, Stack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AuthToken,
  CombinedPlaylistLibrary,
  PlayerData,
  PlayerProfile,
  SimplifiedPlaylistData,
  Song,
  SpotifyLibrarySongRequestResponse,
  SpotifyRequestError,
} from "../models";
import usePlayerStore from "../stores/player";
import usePlaylistStore from "../stores/playlists"
import {
  getSongsFromSpotifyPlaylistWithID,
  getSpotifyData,
  getUserSpotifyLibrarySongs,
  getUserSpotifyPlaylists,
} from "../utils/spotify/spotifyRequests";

const Home: NextPage = () => {

  const [initialRender, setInitialRender] = useState(false);

  useEffect(() => {
    setInitialRender(true);
  }, []);

  const authToken = usePlayerStore((state) => state.authToken)

  const setAuthToken = usePlayerStore((state) => state.setAuthToken);
  const setName = usePlayerStore((state) => state.setName);
  const setProfileImage = usePlayerStore((state) => state.setProfileImage);
  const setEmail = usePlayerStore((state) => state.setEmail);
  const setCountry = usePlayerStore((state) => state.setCountry);
  const setSavedTracks = usePlayerStore((state) => state.setSavedTracks);
  const setGamesPlayed = usePlayerStore((state) => state.setGamesPlayed);

  const webURI = process.env.NEXT_PUBLIC_WEB_URI;

  //Playlist Store
  const totalSongCount = usePlaylistStore((state) => state.totalSongCount)
  const setTotalSongCount = usePlaylistStore((state) => state.setTotalSongCount);

  const currentPlaylistLoading = usePlaylistStore((state) => state.currentPlaylistLoading);
  const setCurrentPlaylistLoading = usePlaylistStore((state) => state.setCurrentPlaylistLoading)

  const currentSongNumLoading = usePlaylistStore((state) => state.currentSongNumLoading);
  const setCurrentSongNumLoading = usePlaylistStore((state) => state.setCurrentSongNumLoading);

  const playlists = usePlaylistStore((state) => state.playlists);
  const setPlaylists = usePlaylistStore((state) => state.setPlaylists);

  const saveSpotifyLibrarySongData = useCallback(
    async (authToken: string, callback: () => void) => {

      let librarySavedTracks: Song[] | SpotifyRequestError = [];

      let userPlaylists: SimplifiedPlaylistData[] | SpotifyRequestError = [];
      const newPlaylists = [];

      try {
        userPlaylists = await getUserSpotifyPlaylists(authToken);
        console.log(userPlaylists)
      } catch (err) {
        console.log(err)
      }

      for (let i = 0; i < userPlaylists.length; i++) {
        const playlist = userPlaylists[i];
        setTotalSongCount((count) => (count + playlist.total));
        const savedTracks: Song[] = await getSongsFromSpotifyPlaylistWithID(playlist.id, authToken)
        const currentPlaylist: CombinedPlaylistLibrary = {
          name: playlist.name,
          total: playlist.total,
          playlistCover: playlist.playlistCover,
          id: playlist.id,
          savedTracks: savedTracks
        };
        newPlaylists.push(currentPlaylist);
      }


      // Switch to .then() .catch() to catch errors and react to them
      try {
        librarySavedTracks = await getUserSpotifyLibrarySongs(authToken);
        newPlaylists.push({
          name: "Liked Tracks",
          total: librarySavedTracks.length,
          playlistCover: "likedSongs.png",
          savedTracks: librarySavedTracks
        })
      } catch (err) {
        console.log(err)
      }

      const playerSpotifyData = await getSpotifyData(authToken);
      if (playerSpotifyData.success) {
        setName(playerSpotifyData.success.display_name);
        setEmail(playerSpotifyData.success.email);
        setProfileImage(playerSpotifyData.success.images[0]);
        setCountry(playerSpotifyData.success.country);
        setSavedTracks(librarySavedTracks.map((song) => song)); //EXCEEDS QUOTA
        setGamesPlayed(0);
      }

      setPlaylists(newPlaylists);

      callback();
    },
    [setCountry, setEmail, setGamesPlayed, setName, setPlaylists, setProfileImage, setSavedTracks, setTotalSongCount]
  );

  useEffect(() => {
    if (initialRender) {
      setTotalSongCount((_) => (0));
      setPlaylists([]);
      setCurrentSongNumLoading(0);

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
        //   authService: 'Spotify',
        //   authToken: userToken,
        //   authCreatedAt: (new Date()).getUTCMilliseconds(),
        //   authDuration: parseInt(duration)
        // }
        setAuthToken(userToken);
        
        saveSpotifyLibrarySongData(userToken, () => window.open(webURI, "_self"));

      } else {
        setAuthToken(null);
        window.open(webURI, "_self");
      }
    }
  }, [initialRender, saveSpotifyLibrarySongData, setAuthToken, setCurrentSongNumLoading, setPlaylists, setTotalSongCount, webURI]);


  if (!initialRender) {
    return <></>;
  }

  return (
    <VStack bg={"black"} color="gray.300" minH="100vh" minW='100vw'>
      <Head>
        <title>Songle</title>
        <meta name="callback" content="callback" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack w='100%' height='100%'>

        <Center width='lg' height='lg' display='flex' flexDirection='column'>
          <Heading color='white' size='xl' alignSelf='center'>Loading Your Songs </Heading>
        </Center>

        <Text> Loading {currentPlaylistLoading} </Text>
        <Text> Song #{currentSongNumLoading} of {totalSongCount}</Text>


        {totalSongCount > 0 && (
          <Progress my='16px' colorScheme="green" height="20px" width='320px' value={currentSongNumLoading} max={totalSongCount} />
        )}

      </VStack>

    </VStack>
  );
};

export default Home;
