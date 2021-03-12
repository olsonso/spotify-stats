import React, { useState, useEffect } from "react";
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

type spotifyTopTracks = {
  data: {
    items:[any]
  }
}

const TracksTable = () => {
  const [topTracks, setTopTracks] = useState<spotifyTopTracks>();
  const [timeRange, setTimeRange] = useState<string>("long_term");

  const token = Cookies.get("spotifyAuthToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    axios
      .get(
        `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`,
        config
      )
      .then((res: spotifyTopTracks) => {
        setTopTracks(res);
      });
  }, [timeRange]);

  return (
    <>
      <div>
        <Button colorScheme="green" size="sm">
          Artists
        </Button>
        <Button colorScheme="green" size="sm">
          Songs
        </Button>
      </div>
      <Select
        defaultValue="long_term"
        onChange={(event) => {
          setTimeRange(event.target.value);
        }}
      >
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
