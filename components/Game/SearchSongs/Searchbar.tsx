import { HStack, InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import React, { useEffect, useMemo, useState } from "react";
import { Song } from "../../../models";
import Fuse from "fuse.js";
import useGameStore from "../../../stores/game";


const fuseOptions: Fuse.IFuseOptions<Song> = {
  includeScore: true,
  keys: ["name", "artists", "album", "releaseDate"],
  threshold: 0.3,
};

const Searchbar = (): JSX.Element => {

    const songOptions = useGameStore(state => state.songOptions)
    const setSongList = useGameStore(state => state.setSongList)
    const [searchQuery, setSearchQuery] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    };
  
    const fuse = useMemo(() => {
      return new Fuse(songOptions, fuseOptions);
    }, [songOptions]);
  
    useEffect(() => {
      if (searchQuery.trim() == "") {
        setSongList(songOptions)
      } else {
        const results = fuse.search(searchQuery).map((val) => val.item);
        setSongList(results) 
      }      
    }, [fuse, searchQuery, setSongList, songOptions]);
  
    return (
      <HStack w="100%" color="gray.300">
        <InputGroup borderColor={"gray.800"} bg="gray.900" rounded={"md"}>
          <InputLeftElement
            // eslint-disable-next-line react/no-children-prop
            children={<Search2Icon color="gray.00" />}
          />
          <Input value={searchQuery} onChange={handleChange} placeholder="Search for songs" />
        </InputGroup>
      </HStack>
    );
};

export default Searchbar;
