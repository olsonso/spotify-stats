import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Image,
  } from "@chakra-ui/react";
  
  
  const ArtistTable = ({topArtists}: any) => {
    return (
      <>
        {topArtists && (
          <>
            <Table colorScheme="green"  size="sm" width="500px">
              <Thead>
                <Tr>
                  <Th>Album</Th>
                  <Th>Artist</Th>
                  <Th>Genres</Th>
                </Tr>
              </Thead>
              {topArtists?.items.map((artist) => (
                <Tbody key={artist.name}>
                  <Tr>
                    <Td>
                      <Image src={artist.images[2].url} boxSize="50px"
    objectFit="cover"/>
                    </Td>
                    <Td>{artist.name}</Td>
                    <Td>{artist.genres[0]}</Td>
                  </Tr>
                </Tbody>
              ))}
            </Table>
          </>
        )} 
      </>
    );
  };
  
  export default ArtistTable;
  