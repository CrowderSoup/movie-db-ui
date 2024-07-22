"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { MovieDBClient, QueryParams, Movie } from "./services/movies";
import Paginator from "./components/paginator";
import SearchBox from "./components/searchBox";

export default function Home() {
  const client = useMemo(() => {
    return new MovieDBClient();
  }, []);

  const [genres, setGenres] = useState<{ id: string; title: string }[]>([]);
  const [genre, setGenre] = useState<string>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");

  const handleGetMovies = useCallback(async (params: QueryParams) => {
    const response = await client.getMovies(params);

    if (response?.data) {
      setMovies(response?.data);
    }

    if (response?.totalPages) {
      setTotalPages(response.totalPages);
    }
  }, [client]);

  const handlePageChange = useCallback(async (page: number) => {
    setCurrentPage(page);
  }, []);

  const handleSearch = useCallback((search: string) => {
    setSearchText(search);
  }, []);

  const handleGenreChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === "Select a genre...") {
      setGenre(undefined);
    } else {
      setGenre(event.target.value);
    }
  }, []);

  useEffect(() => {
    const getMoviesProps = {
      page: currentPage,
      limit: 15,
      search: searchText,
      genre: genre,
    };

    handleGetMovies(getMoviesProps);
    client.getGenres().then((result) => {
      setGenres(result);
    });
  }, [handleGetMovies, currentPage, searchText, client, genre]);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex">
        <div className="m-1">
          <SearchBox placeholder="Search..." handleSearch={handleSearch} />
        </div>
        <div className="m-1">
          <select
            className="appearance-none bg-gray-200 border border-gray-400 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onChange={handleGenreChange}
          >
            <option>Select a genre...</option>
            {genres.map((genre) => {
              return (
                <option key={genre.id}>{genre.title}</option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="flex m-4 flex-wrap justify-items-center">
        {movies.length ? movies.map((movie) => {
          return (
            <div key={movie.id} className="flex flex-col grow m-1 items-center p-4 bg-gray-100 rounded-lg shadow-md">
              <img className="w-48 h-auto rounded-lg object-cover mb-2" src={movie?.posterUrl ? movie.posterUrl : `https://place-hold.it/192x284`} alt={movie.title} />
              <a className="text-xl font-bold text-gray-800 mb-1 underline hover:text-blue-800" href={`/movies/${movie.id}`}>
                {movie.title}
              </a>
              <p className="text-gray-600">Rating: {movie?.rating}</p>
            </div>
          );
        }) : (
          <div>
            No movies found
          </div>
        )}
      </div>
      <div>
        <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </main>
  );
}
