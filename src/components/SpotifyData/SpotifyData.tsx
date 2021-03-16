/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Button,
  Select,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import TracksTable from '../TrackTable/TracksTable'
import ArtistTable from "../AtristTable/ArtistTable";
import './styles.scss';

type spotifyTopTracks = {
  data: any
}

const SpotifyData = () => {
  const [topTracks, setTopTracks] = useState<spotifyTopTracks>();
  const [topArtists, setTopArtists] = useState<any>();
  const [timeRange, setTimeRange] = useState<string>("long_term");
  const [searchTerm, setSearchTerm] = useState<"artists" | "tracks">("tracks");
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const token = Cookies.get("spotifyAuthToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(
        `https://api.spotify.com/v1/me/top/${searchTerm}?time_range=${timeRange}`,
        config
      )
      .then((res: spotifyTopTracks) => {
        setIsLoading(false)
          if(res.data?.items[0]?.type === "track"){
        setTopTracks(res?.data);
          } else {
            setTopArtists(res?.data)
          }
      });
  }, [timeRange, searchTerm]);

  const showTracks = () => topTracks && searchTerm === "tracks" ? (
    <TracksTable topTracks={topTracks} />
  ): null

  const showArtists = () => topArtists && searchTerm === "artists" ? (
     <ArtistTable topArtists={topArtists} />
  ): null

  return (
    <div className="wrapper">
      <div className="btn-container">
      <span className='btn' onClick={(()=> setSearchTerm("artists"))}>
          Artists
      </span>
      <span className='btn'  onClick={(()=> setSearchTerm("tracks"))}>
          Songs
      </span>
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
      <br/>
      {isLoading ? (
        <div className="spinner-container">
        <Spinner />
        </div>
        ): (
          <>
      {showTracks()}
      {showArtists()}
      </>
      )}
      </div>
  );
};

export default SpotifyData;
