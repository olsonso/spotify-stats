/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Select, Spinner } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import TracksTable from "../TrackTable/TracksTable";
import ArtistTable from "../ArtistTable/ArtistTable";
import "./styles.scss";
import { TrackData, ArtistData, SearchTerm } from "../../types/types";

const SpotifyData = () => {
  const [topTracks, setTopTracks] = useState<TrackData>();
  const [topArtists, setTopArtists] = useState<ArtistData>();
  const [timeRange, setTimeRange] = useState<string>("long_term");
  const [selectedSearchTerm, setSelectedSearchTerm] = useState<SearchTerm>(
    "tracks"
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const token = Cookies.get("spotifyAuthToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://api.spotify.com/v1/me/top/${selectedSearchTerm}?time_range=${timeRange}`,
        config
      )
      .then((res: any) => {
        setIsLoading(false);
        if (res.data?.items[0]?.type === "track") {
          setTopTracks(res?.data);
        } else {
          setTopArtists(res?.data);
        }
      });
  }, [timeRange, selectedSearchTerm]);

  const showTracks = () =>
    topTracks && selectedSearchTerm === "tracks" ? (
      <TracksTable data={topTracks} />
    ) : null;

  const showArtists = () =>
    topArtists && selectedSearchTerm === "artists" ? (
      <ArtistTable data={topArtists} />
    ) : null;

  return (
    <div className="wrapper">
      <div className="btn-container">
        <span className="btn" onClick={() => setSelectedSearchTerm("artists")}>
          Artists
        </span>
        <span className="btn" onClick={() => setSelectedSearchTerm("tracks")}>
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
      <br />
      {isLoading ? (
        <div className="spinner-container">
          <Spinner />
        </div>
      ) : (
        <>
          {showTracks()}
          {showArtists()}
        </>
      )}
    </div>
  );
};

export default SpotifyData;
