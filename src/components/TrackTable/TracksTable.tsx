import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
} from "@chakra-ui/react";


const TracksTable = ({topTracks}: any) => {
  return (
    <>
      {topTracks && (
        <>
          <Table colorScheme="green" size="sm" width="500px">
            <Thead>
              <Tr>
                <Th>Album</Th>
                <Th>Song</Th>
                <Th>Artist</Th>
              </Tr>
            </Thead>
            {topTracks?.items.map((track) => (
              <Tbody key={track.name}>
                <Tr>
                  <Td>
                    <Image src={track.album.images[2].url} boxSize="50px"
    objectFit="cover" />
                  </Td>
                  <Td>{track.name}</Td>
                  <Td>{track.artists[0].name}</Td>
                </Tr>
              </Tbody>
            ))}
          </Table>
        </>
      )} 
    </>
  );
};

export default TracksTable;
