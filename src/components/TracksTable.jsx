import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Menu,
  Button,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { UserTop } from "react-spotify-api";

const options = {
  time_range: "long_term",
};

const TracksTable = () => {
  const [timeRange, setTimeRange] = useState();

  return (
    <>
      <Menu>
        <MenuButton>Time Range</MenuButton>
        <MenuList>
          <MenuItem> Lst 4 months</MenuItem>
          <MenuItem> Lst year</MenuItem>
          <MenuItem> All Time</MenuItem>
        </MenuList>
      </Menu>
      <UserTop type="tracks" options={options}>
        {(tracks) =>
          tracks?.data ? (
            <>
              <Table variant="simple" size="sm" width="500px">
                <Thead>
                  <Tr>
                    <Th>Album</Th>
                    <Th>Song</Th>
                    <Th>Artist</Th>
                  </Tr>
                </Thead>
                {tracks.data?.items.map((track) => (
                  <Tbody>
                    <Tr>
                      <Td>
                        <Image src={track.album.images[2].url} />
                      </Td>
                      <Td>{track.name}</Td>
                      <Td>{track.artists[0].name}</Td>
                    </Tr>
                  </Tbody>
                ))}
              </Table>
            </>
          ) : (
            <p>Looking for your top tracks...</p>
          )
        }
      </UserTop>
    </>
  );
};

export default TracksTable;
