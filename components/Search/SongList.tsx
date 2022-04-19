import { VStack } from "@chakra-ui/react";
import React from "react";
import { Song } from "../../models";
import SongItem from "./SongItem";

export interface SongListProps{
  list: Song[]
}

const SongList = ({
  list
}: SongListProps): JSX.Element => {
  return (
    <VStack>
      {list.map((song: Song, i: number) => (<SongItem key={i} song={song} />)) }
    </VStack>
  )
};

export default SongList;
