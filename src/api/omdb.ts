import { Params } from "react-router-dom";

const apiKey = import.meta.env.VITE_OMDB_API_KEY;

type GetMovies = {
  searchQuery: string;
  yearQuery: string;
  typeQuery: string;
  pageQuery: string;
};

export const getMovies = async ({
  searchQuery,
  yearQuery,
  typeQuery,
  pageQuery,
}: GetMovies) => {
  return await fetch(
    `https://www.omdbapi.com/?s=${searchQuery}&y=${yearQuery}&type=${typeQuery}&page=${pageQuery}&apikey=${apiKey}`,
  );
};

export const getMovie = async (params: Params) => {
  return await fetch(
    `https://www.omdbapi.com/?i=${params.imdbID}&apikey=${apiKey}`,
  );
};
