import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  theme,
  Grid,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { User, UserTop } from "react-spotify-api";

function logout() {
  Cookies.remove("spotifyAuthToken");
  window.location = "/";
}

const options = {
  time_range: "long_term",
};

const UserComponent = () => (
  <User>
    {(user) =>
      user?.data ? (
        <div className="flex items-center justify-between">
          <div className="font-medium">Hello, {user.data.display_name}</div>
          <UserTop type="tracks" options={options}>
            {(tracks) =>
              tracks?.data ? (
                tracks.data?.items.map((track) => {
                  return (
                    <div key={track.id}>
                      {track.name}, {track.artists[0].name}
                    </div>
                  );
                })
              ) : (
                <p>Looking for your top tracks...</p>
              )
            }
          </UserTop>
          <Button onClick={logout}>Logout</Button>
        </div>
      ) : (
        <div>fetching...</div>
      )
    }
  </User>
);

export default UserComponent;
