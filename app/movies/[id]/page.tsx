"use client";

import { Movie, MovieDBClient } from "@/app/services/movies";
import { useEffect, useState, useMemo } from "react";

export default function MoviePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const client = useMemo(() => {
    return new MovieDBClient();
  }, []);

  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    client.getMovie(id).then((result) => {
      setMovie(result);
    });
  }, [id, client]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{movie?.title}</h1>
      <div className="flex items-center mb-4">
        <img
          className="w-48 h-auto rounded mr-4"
          src={movie?.posterUrl ? movie.posterUrl : `https://place-hold.it/192x284`}
          alt={movie?.title}
        />
        <div>
          <p className="text-xl font-bold mb-2">Rating: {movie?.rating}</p>
          <p>Review Score: {movie?.ratingValue}</p>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Director(s):</h3>
        <ul className="list-disc pl-4">
          {movie?.directors?.map((director) => (
            <li key={director}>{director}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Cast:</h3>
        <ul className="list-disc pl-4">
          {movie?.mainActors?.map((actor) => (
            <li key={actor}>{actor}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Writer(s):</h3>
        <ul className="list-disc pl-4">
          {movie?.writers?.map((writer) => (
            <li key={writer}>{writer}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Genres:</h3>
        <ul className="list-none flex flex-wrap">
          {movie?.genres?.map((genre) => (
            <li
              key={genre.id}
              className="px-2 py-1 rounded bg-gray-200 text-gray-700 mr-2 mb-2"
            >
              {genre.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
