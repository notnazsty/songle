import { VStack, Text, HStack, Grid, Image, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import usePlaylistStore from "../../stores/playlists";
import PlaylistCard from "./PlaylistCard";

import Fuse from "fuse.js";
import { Search2Icon } from "@chakra-ui/icons";
import { CombinedPlaylistLibrary } from "../../models";

const fuseOptions: Fuse.IFuseOptions<CombinedPlaylistLibrary> = {
  includeScore: true,
  keys: ["id", "name"],
  threshold: 0.6,
};

const PlaylistSelector = () => {

  const playlists = usePlaylistStore((state) => state.playlists);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedPlaylists, setDisplayedPlaylists] = useState<CombinedPlaylistLibrary[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const fuse = useMemo(() => {
    return new Fuse(playlists, fuseOptions);
  }, [playlists]);

  useEffect(() => {
    if (searchQuery.trim() == "") {
      setDisplayedPlaylists(playlists)
    } else {
      const results = fuse.search(searchQuery).map((val) => val.item);
      setDisplayedPlaylists(results)
    }
  }, [fuse, playlists, searchQuery]);

  return (
    <VStack w='100%' spacing={8}>
      <Text fontSize={"2xl"}>Choose a playlist</Text>

      <InputGroup w='100%' maxW='5xl' borderColor={"gray.800"} bg="gray.900" rounded={"md"}>
        <InputLeftElement
          // eslint-disable-next-line react/no-children-prop
          children={<Search2Icon color="gray.00" />}
        />
        <Input value={searchQuery} onChange={handleChange} placeholder="Search for a playlist" />
      </InputGroup>

      <Grid templateColumns={{ sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)", xl: "repeat(5, 1fr)" }} gridGap={4} pb={{ base: 16, md: 32 }}>
        {displayedPlaylists.map((playlist, index) => (
          <PlaylistCard key={index} playlist={playlist} />
        ))}
      </Grid>





    </VStack>
  );
};

export default PlaylistSelector;
