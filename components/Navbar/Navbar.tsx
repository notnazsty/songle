import React from "react";
import {
  Avatar,
  Button,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import usePlayerStore from "../../stores/player";
import { loginURL } from "../../utils/spotify/spotifyRequests";


const Navbar = () => {
  const signout = usePlayerStore((state) => state.reset);
  const authToken = usePlayerStore((state) => state.authToken);
  const profileImage = usePlayerStore((state) => state.profileImage);

  return (
    <HStack py={2} px={4} w="100%" align={"center"} justify="space-between">
      <Text fontSize={"xl"} fontWeight={"bold"}>
        Songle
      </Text>

      <HStack spacing={6}>
        <HStack color="gray.400">
          <Link href='https://github.com/notnazsty/songle' isExternal>Github</Link>
        </HStack>
        {authToken && (
          <Menu>
            <MenuButton>
              <Avatar boxSize={9} src={profileImage?.url} />
            </MenuButton>
            <MenuList bg="gray.900" borderColor={"gray.700"}>
              <MenuItem _hover={{ bg: "gray.700" }} _focus={{ bg: "gray.700" }} onClick={() => window.open(loginURL,"_self")}> Reload Playlists </MenuItem>

              <MenuItem _hover={{ bg: "gray.700" }} _focus={{ bg: "gray.700" }} onClick={signout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        )}
      </HStack>
    </HStack>
  );
};

export default Navbar;
