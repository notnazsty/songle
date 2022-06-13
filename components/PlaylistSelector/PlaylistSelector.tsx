import { VStack, Text, HStack, Grid, Image } from "@chakra-ui/react";
import React from "react";
import usePlaylistStore from "../../stores/playlists";
import PlaylistCard from "./PlaylistCard";


import 'swiper/css';


const PlaylistSelector = () => {



  const playlists = usePlaylistStore((state) => state.playlists);


  return (
    <VStack>
      <Text fontSize={"2xl"}>Choose a playlist</Text>


      <HStack spacing={12}>
        {playlists.map((playlist, index) => (
          <PlaylistCard key={index} playlist={playlist} />
        ))}
        
      </HStack>


      \
    </VStack>
  );
};

export default PlaylistSelector;
