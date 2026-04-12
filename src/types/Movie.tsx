// src/types/Movie.tsx
export interface Movie {
  id: number;
  title: string;
  synopsis: string;
  genreId: number;
  ratingId: number;
  runtime: number;
  releaseDate: string;
  imageURL: string;
}
