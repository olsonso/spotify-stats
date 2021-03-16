import React from "react";
import { Spinner, Button, Flex, Spacer, Heading } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { User } from "react-spotify-api";
import styled from "styled-components";
import SpotifyData from "./SpotifyData/SpotifyData";

function logout() {
  Cookies.remove("spotifyAuthToken");
  window.location.href = "/";
}

const Container = styled.div`
  width: 500px;
  margin: 0 auto;
`;

const UserComponent = () => {

 const expiredToken = (user) => {
   if(user?.error){
     return logout()
   } else {
     return(
       <Spinner />
     )
   }
 }

    return(
      <>
    <Flex>
      <Spacer />
      <Heading>What You Listening to?</Heading>
      <Spacer />
      <div>
        <Button onClick={logout} colorScheme="green" size="sm" variant="link">
          Logout
        </Button>
      </div>
    </Flex>
    <User>
      {(user) =>
        user?.data && !user?.error? (
          <>
            <Container>
              <SpotifyData />
            </Container>
          </>
        ) : (
         expiredToken(user)
        )
      }
    </User>
  </>
)
}

export default UserComponent;
