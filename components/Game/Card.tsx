import { Box, BoxProps, Text, Image, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import { Song } from "../../models";

interface CardProps extends BoxProps {
  song: Song;
  guesses: Song[];
}

const Card = ({ song, guesses }: CardProps) => {
  //TODO: Filter the data thats viewable based on the guesses made
  return (
    <Box
      display="flex"
      flexDir="column"
      bgColor="white"
      boxSize="md"
      color="black"
      rounded="lg"
      alignItems="center"
      overflow='hidden'
    >
      <Image
        w="100%"
        maxH="87%"
        src={song.coverImages[0].url}
        alt="album cover"
      />
      <VStack w='100%' h='13%' spacing={0}>
        <Text fontWeight="semibold" fontSize="lg">
          {song.name}
        </Text>
        <Text fontSize="sm"> By {song.artists.join(",")} </Text>
      </VStack>
    </Box>
  );
};

export default Card;
