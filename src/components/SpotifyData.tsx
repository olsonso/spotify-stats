import React, { useState, useEffect } from "react";
import {
  Button,
  Select,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import TracksTable from './TracksTable'
import ArtistTable from "./ArtistTable";

type spotifyTopTracks = {
  data: any
}

const SpotifyData = () => {
  const [topTracks, setTopTracks] = useState<spotifyTopTracks>();
  const [topArtists, setTopArtists] = useState<any>();
  const [timeRange, setTimeRange] = useState<string>("long_term");
  const [searchTerm, setSearchTerm] = useState<"artists" | "tracks">("tracks");

  const token = Cookies.get("spotifyAuthToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    axios
      .get(
        `https://api.spotify.com/v1/me/top/${searchTerm}?time_range=${timeRange}`,
        config
      )
      .then((res: spotifyTopTracks) => {
          if(res.data?.items[0]?.type === "track"){
        setTopTracks(res?.data);
          } else {
            setTopArtists(res?.data)
          }
      });
  }, [timeRange, searchTerm]);

  return (
    <>
        <div>
        <Button colorScheme="green" size="sm" onClick={(()=>setSearchTerm('artists'))}>
          Artists
        </Button>
        <Button colorScheme="green" size="sm" onClick={(()=>setSearchTerm('tracks'))}>
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
      {topTracks && searchTerm === "tracks" ? (
          <TracksTable topTracks={topTracks} />
      ) : topArtists && searchTerm === "artists" ? (
        <ArtistTable topArtists={topArtists} />
      ):(
        <Spinner />
      )}
    </>
  );
};

export default SpotifyData;
