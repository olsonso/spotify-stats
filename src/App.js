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
import { SpotifyApiContext } from "react-spotify-api";
import { SpotifyAuth, Scopes } from "react-spotify-auth";
import Cookies from "js-cookie";
import UserComponent from "./components/User";

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
        <Grid minH="100vh" p={3}>
          {console.log("Here", spotifyAuthToken)}
          <VStack spacing={8}>
            <Text>Music Matchsssser</Text>
            {console.log("Here", spotifyAuthToken)}
            {spotifyAuthToken ? (
              <SpotifyApiContext.Provider value={spotifyAuthToken}>
                <div>Thank you for authenticating with Spotify!</div>
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
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
