import { useLoaderData } from "react-router-dom";
import { Movie, Series } from "../../types/Omdb.ts";

export default function SingleMovie() {
  const publishing = useLoaderData() as Movie | Series | Episode | undefined;

  return (
    <div>
      <h1>Single Movie</h1>
    </div>
  );
}
