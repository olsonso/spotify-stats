import React, { useState, useEffect } from "react";
import { ChakraProvider, Box, VStack, Heading } from "@chakra-ui/react";
import { SpotifyApiContext } from "react-spotify-api";
import { SpotifyAuth, Scopes } from "react-spotify-auth";
import Cookies from "js-cookie";
import UserComponent from "./components/User";
import theme from "./theme";

const clientId = "cf20756001cf45c59e8a0ad5c87eafc0";
const redirectUri = "http://localhost:3000/";

function App() {
  const [spotifyAuthToken, setSpotifyAuthToken] = useState();

  useEffect(() => {
    setSpotifyAuthToken(Cookies.get("spotifyAuthToken"));
  }, [Cookies.get("spotifyAuthToken")]);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        {spotifyAuthToken ? (
          <SpotifyApiContext.Provider value={spotifyAuthToken}>
            <UserComponent />
          </SpotifyApiContext.Provider>
        ) : (
          <SpotifyAuth
            redirectUri={redirectUri}
            clientID={clientId}
            scopes={[
              Scopes.userTopRead,
              Scopes.userLibraryRead,
              Scopes.userReadPlaybackState,
              Scopes.userReadCurrentlyPlaying,
            ]}
          />
        )}
      </Box>
    </ChakraProvider>
  );
}

export default App;
