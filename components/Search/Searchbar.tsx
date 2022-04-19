import { Search2Icon } from '@chakra-ui/icons'
import { HStack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import Fuse from 'fuse.js'
import React, { useState } from 'react'

const Searchbar = (
):JSX.Element => {

  const [searchQuery, setSearchQuery] = useState("")

  const songList: string[] = []


  const fuseOptions = {
    includeScore: true,
    keys: []
  }

  const fuse = new Fuse(songList, fuseOptions)


  return (
    <HStack>
      <InputGroup>
        <InputLeftElement
          // eslint-disable-next-line react/no-children-prop
          children={
            <Search2Icon color='white' />
          }
        />
        <Input />
      </InputGroup>

    </HStack>
  )
}

export default Searchbar