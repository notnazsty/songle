import { Grid } from '@chakra-ui/react'
import React from 'react'
import useGameStore from '../../../stores/game'
import SongCard from './SongCard';

const SongGrid = () => {
  const songList = useGameStore(state => state.songList);
  return (
    <Grid w="100%" templateColumns={{md: "repeat(2, 1fr)", xl:  "repeat(3, 1fr)"}}>
        {songList.map((song, i) => <SongCard key={i} song={song} />)}
    </Grid>
  )
}

export default SongGrid