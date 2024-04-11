import { useLoaderData } from "react-router-dom";
import { Movie, Series } from "../../types/Omdb.ts";
import { Rate } from "antd";

export default function SingleMovie() {
  const movieData = useLoaderData() as Movie | Series | undefined;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row lg:gap-8">
        <div className="w-full lg:w-1/3">
          <img
            className="w-full rounded-lg shadow-md"
            src={movieData?.Poster}
            alt={`${movieData?.Title} Poster`}
          />
        </div>
        <div className="flex-grow">
          <h1 className="mb-4 text-3xl font-bold">{`${movieData?.Title} (${movieData?.Year})`}</h1>
          <p className="mb-2 text-gray-700">
            <span className="text-green-500">{movieData?.Rated}</span> |{" "}
            {movieData?.Runtime} | {movieData?.Genre.split(", ").join(", ")}
          </p>
          <div className="mb-4 flex">
            <span className="mr-2 text-gray-700">Director:</span>
            <span className="font-bold">{movieData?.Director}</span>
          </div>
          <div className="mb-4 flex">
            <span className="mr-2 text-gray-700">Writer(s):</span>
            <span className="font-bold">{movieData?.Writer}</span>
          </div>
          <div className="mb-4 flex">
            <span className="mr-2 text-gray-700">Cast:</span>
            <span className="font-bold">{movieData?.Actors}</span>
          </div>
          <p className="mb-4">{movieData?.Plot}</p>
          <div className="flex flex-wrap">
            <div className="mb-2 mr-4">
              <span className="mr-1 text-gray-700">Language:</span>
              <span className="font-bold">{movieData?.Language}</span>
            </div>
            <div className="mb-2 mr-4">
              <span className="mr-1 text-gray-700">Country:</span>
              <span className="font-bold">{movieData?.Country}</span>
            </div>
            <div>
              <span className="mr-1 text-gray-700">Awards:</span>
              <span className="font-bold">{movieData?.Awards}</span>
            </div>
          </div>
          <div className="mt-4 flex">
            <Rate
              disabled
              value={parseFloat(movieData?.imdbRating as string)}
            />
            <span className="ml-2 text-gray-700">
              ({movieData?.imdbRating}) IMDb - {movieData?.imdbVotes} votes
            </span>
          </div>
          <div className="mt-2 flex">
            <span className="mr-2 inline-block rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700">
              Metascore: {movieData?.Metascore}
            </span>
            {movieData?.Ratings.map((rating) => (
              <span
                key={rating.Source}
                className="mr-2 inline-block rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700"
              >
                {rating.Source}: {rating.Value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
