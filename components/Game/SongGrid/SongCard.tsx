import React from 'react'
import { Song } from '../../../models';

interface Props {
    song: Song;
}

const SongCard : React.FC<Props> = ({song}) => {
  return (
    <div>{song.name}</div>
  )
}

export default SongCard