import { VStack, Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { CombinedPlaylistLibrary, Song } from '../../models'
import useGameStore from '../../stores/game'
import usePlayerStore from '../../stores/player'
import { getSongsFromPlaylistIDStartingFrom } from '../../utils'

interface PlaylistCardProps {
    playlist: CombinedPlaylistLibrary
}

const PlaylistCard = ({
    playlist
}: PlaylistCardProps): JSX.Element => {

    const savedTracks = usePlayerStore(state => state.savedTracks)
    const setCorrectSong = useGameStore(state => state.setCorrectSong);
    const setGameState = useGameStore(state => state.setGameState);
    const setSongList = useGameStore(state => state.setSongList);
    const setSongOptions = useGameStore(state => state.setSongOptions);
    const setSongsGuessed = useGameStore(state => state.setSongsGuessed);
    const authToken = usePlayerStore((state) => state.authToken)


    const createNewGame = async (savedTracks: Song[]) => {

        const songs = getLimitedSongs(savedTracks, 250);
        const song = getRandomSong(songs);

        // TODO: For fixing playlist song size storing issue 
        // if (playlist.total > savedTracks.length && authToken) {
        //     const requestedExtraSongs = playlist.id ? await getSongsFromPlaylistIDStartingFrom(playlist.id, authToken, playlist.savedTracks.length) : [];
        //     songs = getLimitedSongs([...savedTracks, ...requestedExtraSongs], 250);
        //     song = getRandomSong(songs);
        // } else {
        //     songs = getLimitedSongs(savedTracks, 250);
        //     song = getRandomSong(songs);
        // }

        setSongList(songs)
        setCorrectSong(song)
        setSongOptions(songs)
        setSongsGuessed([]);
        setGameState("In Progress");
    };

    const getRandomSong = (songs: Song[]): Song => {
        const randomNum = Math.floor(Math.random() * songs.length - 1);
        return songs[randomNum];
    };

    const getLimitedSongs = (savedTracks: Song[], range: number): Song[] => {
        if (savedTracks) {
            if (savedTracks.length > range) {
                const maxLeftPos = savedTracks.length - range;
                const randomNum = Math.floor(Math.random() * maxLeftPos);
                const filteredVals = savedTracks.filter(
                    (item, i) => i <= randomNum + range && i > randomNum
                );
                return filteredVals;
            }
            return savedTracks;
        }
        return [];
    };


    return (
        <VStack bg={'gray.900'} borderRadius={16} w={"192px"} spacing={0} cursor="pointer" onClick={async () => await createNewGame(playlist.savedTracks)}>
            <Box boxSize={48} pos="relative" overflow="hidden" bgImage={typeof playlist.playlistCover === "string" ? playlist.playlistCover : playlist.playlistCover[0].url} bgSize="contain" bgPos="center" />
            <Text fontSize="lg" textAlign={"center"} px={1} py={3}>{playlist.name}</Text>
        </VStack>
    )
}

export default PlaylistCard