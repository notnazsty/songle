import { VStack, Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { CombinedPlaylistLibrary, Song } from '../../models'
import useGameStore from '../../stores/game'
import usePlayerStore from '../../stores/player'

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

    const createNewGame = (savedTracks: Song[]) => {
        const songs = getLimitedSongs(savedTracks, 250);
        const song = getRandomSong(songs);

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
        <VStack bg={'gray.900'} borderRadius={16} w={"192px"} spacing={0} cursor="pointer" onClick={() => createNewGame(playlist.savedTracks)}>
            <Box boxSize={48} pos="relative" overflow="hidden" bgImage={typeof playlist.playlistCover === "string" ? playlist.playlistCover : playlist.playlistCover[0].url} bgSize="contain" bgPos="center" />
            <Text fontSize="lg" textAlign={"center"} px={1} py={3}>{playlist.name}</Text>
        </VStack>
    )
}

export default PlaylistCard