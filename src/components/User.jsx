import React from "react";
import { Spinner, Button, Flex, Spacer } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { User } from "react-spotify-api";
import TrackTable from "./TracksTable";
import styled from "styled-components";

function logout() {
  Cookies.remove("spotifyAuthToken");
  window.location = "/";
}

const Container = styled.div`
  width: 400px;
  margin: 0 auto;
`;

const UserComponent = () => (
  <User>
    {(user) =>
      user?.data ? (
        <Container>
          <Flex>
            <div>Hello, {user.data.display_name}</div>
            <Spacer />
            <Button onClick={logout}>Logout</Button>
          </Flex>
          <TrackTable />
        </Container>
      ) : (
        <Spinner />
      )
    }
  </User>
);

export default UserComponent;
