import { 
  Box, 
  HStack, 
  Image, 
  Stack, 
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Song } from "../../models";

interface SongItemProps{
 song: Song
}

const SongItem = ({
  song
}: SongItemProps): JSX.Element => {
  return (
    <HStack
      justifyContent="space-between"
      w="100%"
      color={"white"}
      px={{ base: 2, sm: 4 }}
      textAlign="left"
      spacing={4}
      borderBottom={{ base: "1px", sm: "0px" }}
      rounded="lg"
      _hover={{ bgColor: "#2A2A2A" }}
      cursor="pointer"
      onClick={() => {
      }}
    >
      <Image
        src={
          song.coverImages &&
          song.coverImages[0] &&
          song.coverImages[0].url
            ? song.coverImages[0].url
            : "www.google.com" //replace with another placeholder
        }
        w={{ base: "75", md: "100" }}
        h={{ base: "75", md: "100" }}
        alt="album cover"
        border={"1px"}
        borderColor={"white"}
        mr={{ base: 2, sm: 8 }}
      />
      <Stack
        direction={{ base: "column", sm: "row" }}
        spacing={{ base: 0, sm: 4 }}
        w="100%"
      >
        <Box w={{ base: "100%", sm: "33%" }}>
          <Text fontSize={{ base: "md", sm: "lg", md: "xl" }} fontWeight="bold">
            {" "}
            {song.name}{" "}
          </Text>
          <Text
            fontSize={{ base: "xs", sm: "sm", md: "md" }}
            fontStyle="italic"
          >
            {" "}
            {song.artists.join(", ")}{" "}
          </Text>
        </Box>
        <Box w={{ base: "100%", sm: "33%" }}>
          <Text> {song.album} </Text>
        </Box>

        <Box w={{ base: "100%", sm: "33%" }}>
          <Text> {new Date(song.releaseDate).getFullYear().toString()} </Text>
        </Box>
      </Stack>
    </HStack>
  );
};

export default SongItem;
