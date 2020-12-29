import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  theme,
  Grid,
  VStack,
  Text,
  Button,
} from '@chakra-ui/react';
import { SpotifyApiContext, User } from 'react-spotify-api';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import Cookies from 'js-cookie';
import { UserTop } from 'react-spotify-api';

const clientId = 'cf20756001cf45c59e8a0ad5c87eafc0';
const redirectUri = 'http://localhost:3000/';

function App() {
  const [spotifyAuthToken, setSpotifyAuthToken] = useState();

  function logout() {
    Cookies.remove('spotifyAuthToken');
    window.location = '/';
  }

  useEffect(() => {
    setSpotifyAuthToken(Cookies.get('spotifyAuthToken'));
  }, [Cookies.get('spotifyAuthToken')]);

  const options = {
    time_range: 'long_term',
  };
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>
            <Text>Music Matcher</Text>
            {spotifyAuthToken ? (
              <SpotifyApiContext.Provider value={spotifyAuthToken}>
                <div>Thank you for authenticating with Spotify!</div>
                <User>
                  {user =>
                    user && user.data ? (
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-gray-900">
                          Hello, {user.data.display_name}
                        </div>
                        <UserTop type="tracks" options={options}>
                          {tracks =>
                            tracks && tracks.data ? (
                              tracks.data.items.map(track => {
                                return <div key={track.id}>{track.name}</div>;
                              })
                            ) : (
                              <p className="text-lg text-center text-gray-900">
                                Looking for your top tracks...
                              </p>
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
              </SpotifyApiContext.Provider>
            ) : (
              // Display the login page
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
