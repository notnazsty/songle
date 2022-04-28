import { Search2Icon } from "@chakra-ui/icons";
import { HStack, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import Fuse from "fuse.js";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Game, Song } from "../../models";

interface SearchBarProps {
  currentGame: Game;
  songList: Song[];
  setSongList: Dispatch<SetStateAction<Song[] | undefined>>;
}

const fuseOptions: Fuse.IFuseOptions<Song> = {
  includeScore: true,
  keys: ["name", "artists", "album", "releaseDate"],
  threshold: 0.3,
};

const Searchbar = ({
  songList,
  setSongList,
  currentGame,
}: SearchBarProps): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const fuse = useMemo(() => {
    return new Fuse(currentGame.songOptions, fuseOptions);
  }, [currentGame.songOptions]);

  useEffect(() => {
    if (searchQuery.trim() == "") {
      setSongList(currentGame.songOptions);
    } else {
      const results = fuse.search(searchQuery).map((val) => val.item);
      setSongList(results);
    }
  }, [currentGame.songOptions, fuse, searchQuery, setSongList]);

  return (
    <HStack maxW="100%" w="5xl" px={16} color="white">
      <InputGroup>
        <InputLeftElement
          // eslint-disable-next-line react/no-children-prop
          children={<Search2Icon color="white" />}
        />
        <Input value={searchQuery} onChange={handleChange} />
      </InputGroup>
    </HStack>
  );
};

export default Searchbar;
