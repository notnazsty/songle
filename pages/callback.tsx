import { VStack, Text, Heading, Center, Progress, Image, Spinner } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import {
  CombinedPlaylistLibrary,
  SimplifiedPlaylistData,
  Song,
  SpotifyRequestError,
} from "../models";
import usePlayerStore from "../stores/player";
import usePlaylistStore from "../stores/playlists"
import {
  getNumOfSpotifyLibrarySongsSaved,
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

  const setPlaylists = usePlaylistStore((state) => state.setPlaylists);

  const saveSpotifyLibrarySongData = useCallback(
    async (authToken: string, callback: () => void) => {

      let librarySavedTracks: Song[] | SpotifyRequestError = [];

      let userPlaylists: SimplifiedPlaylistData[] | SpotifyRequestError = [];
      const newPlaylists = [];

      try {
        userPlaylists = await getUserSpotifyPlaylists(authToken);
      } catch (err) {
        console.log(err)
      }

      let totalSongCount = 0;
      for (let i = 0; i < userPlaylists.length; i++) {
        totalSongCount += userPlaylists[i].total;
      }
      totalSongCount += await getNumOfSpotifyLibrarySongsSaved(authToken);
      setTotalSongCount((count) => (totalSongCount));

      for (let i = 0; i < userPlaylists.length; i++) {
        const playlist = userPlaylists[i];
        setCurrentPlaylistLoading(playlist.name)
        try {
          const savedTracks: Song[] = await getSongsFromSpotifyPlaylistWithID(playlist.id, authToken, setCurrentSongNumLoading)
          const currentPlaylist: CombinedPlaylistLibrary = {
            name: playlist.name,
            total: playlist.total,
            playlistCover: playlist.playlistCover,
            id: playlist.id,
            savedTracks: savedTracks
          };
          newPlaylists.push(currentPlaylist);
        } catch (err) {
          console.log(err)
        }
      }


      try {
        setCurrentPlaylistLoading("Liked Tracks")
        librarySavedTracks = await getUserSpotifyLibrarySongs(authToken, setCurrentSongNumLoading);
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
        // setSavedTracks(librarySavedTracks.map((song) => song)); //EXCEEDS QUOTA
        setGamesPlayed(0);
      }

      setPlaylists(newPlaylists);
      setCurrentPlaylistLoading("")


      callback();
    },
    [setCountry, setCurrentPlaylistLoading, setCurrentSongNumLoading, setEmail, setGamesPlayed, setName, setPlaylists, setProfileImage, setTotalSongCount]
  );

  useEffect(() => {
    if (initialRender) {
      setTotalSongCount((_) => (0));
      setPlaylists([]);
      setCurrentSongNumLoading((count) => (0));

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
    <VStack bg={"black"} color="gray.300" minH="100vh" w='100%' alignItems={'center'}>
      <Head>
        <title>Songle</title>
        <meta name="callback" content="callback" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <Center width='100%' height='lg' display='flex' flexDirection='column'>
          <Heading color='white' size='xl' alignSelf='center'>Loading Your Songs </Heading>
        </Center>

        <Text pt={8} > Loading {currentPlaylistLoading} </Text>
        <Text textAlign={"center"}> Song #{currentSongNumLoading} of {totalSongCount}</Text>
        <Text textAlign={"center"}> Some songs will be skipped from playlists if they are too long</Text>

        {totalSongCount > 0 && (
          <Progress rounded={10} my='16px' colorScheme="green" height="20px" width='min(100%, 320px)' value={currentSongNumLoading} max={totalSongCount} />
        )}

        {totalSongCount == 0 && (
          <Spinner size='lg' color='green.400' />
        )}



      </VStack>

  );
};

export default Home;
