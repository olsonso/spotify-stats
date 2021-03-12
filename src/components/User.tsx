import React from "react";
import { Spinner, Button, Flex, Spacer, Heading } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { User } from "react-spotify-api";
import styled from "styled-components";
import SpotifyData from "./SpotifyData";

function logout() {
  Cookies.remove("spotifyAuthToken");
  window.location.href = "/";
}

const Container = styled.div`
  width: 500px;
  margin: 0 auto;
`;

const UserComponent = () => (
  <>
    <Flex>
      <Spacer />
      <Heading>Music Matcher</Heading>
      <Spacer />
      <div>
        <Button onClick={logout} colorScheme="green" size="sm">
          Logout
        </Button>
      </div>
    </Flex>
    <User>
      {(user) =>
        user?.data ? (
          <>
            <Container>
              <SpotifyData />
            </Container>
          </>
        ) : (
          <Spinner />
        )
      }
    </User>
  </>
);

export default UserComponent;
