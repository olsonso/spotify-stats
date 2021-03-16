import { Table, Thead, Tbody, Tr, Th, Td, Image } from "@chakra-ui/react";
import { ArtistData } from "../../types/types";

type ArtistTableProps = {
  data: ArtistData;
};
const ArtistTable = ({ data }: ArtistTableProps) => {
  return (
    <>
      {data && (
        <>
          <Table colorScheme="green" size="sm" width="500px">
            <Thead>
              <Tr>
                <Th>Album</Th>
                <Th>Artist</Th>
                <Th>Genres</Th>
              </Tr>
            </Thead>
            {data?.items.map((artist) => (
              <Tbody key={artist.name}>
                <Tr>
                  <Td>
                    <Image
                      src={artist?.images[0]?.url}
                      boxSize="50px"
                      objectFit="cover"
                    />
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
