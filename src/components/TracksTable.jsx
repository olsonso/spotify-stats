import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Button,
  Select,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";

const TracksTable = () => {
  const [topTracks, setTopTracks] = useState();
  const token = Cookies.get("spotifyAuthToken");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const onSelect = (event) => {
    setTopTracks(null);
    axios
      .get(
        `https://api.spotify.com/v1/me/top/tracks?time_range=${event.target.value}`,
        config
      )
      .then((res) => {
        setTopTracks(res);
      });
  };

  return (
    <>
      <div>
        <Button>Artists</Button>
        <Button>Songs</Button>
      </div>
      <Select placeholder="Select time range" onChange={onSelect}>
        <option value="short_term">Last 4 weeks</option>
        <option value="medium_term">Last 6 months</option>
        <option value="long_term">All time</option>
      </Select>
      {topTracks ? (
        <>
          <Table variant="simple" size="sm" width="500px">
            <Thead>
              <Tr>
                <Th>Album</Th>
                <Th>Song</Th>
                <Th>Artist</Th>
              </Tr>
            </Thead>
            {topTracks.data?.items.map((track) => (
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
        <Spinner />
      )}
    </>
  );
};

export default TracksTable;
