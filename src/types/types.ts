
export type SearchTerm = 'artists' | 'tracks';

export interface SpotifyDataResponse {
    data: ArtistData | TrackData
  }

export type TrackData = {
    items: [
      {
        name: string;
        album: Album,
        artists: Artist
        genres: [string];
        type: string;
      }
    ];
  };

export type ArtistData = {
    items: [
      {
        name: string;
        images: [Image];
        genres: [string];
        type: string;
      }
    ];
  };

export type Image = {
    height: number;
    url: string;
    width: number;
  };

  type Artist = {
      name: string
  }
  type Album = {
      images: [Image]
  }