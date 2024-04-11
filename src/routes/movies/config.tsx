import { Button, Image, TableProps } from "antd";
import { Omdb, Search } from "../../types/Omdb.ts";
import { Link } from "react-router-dom";

type tableColumnConfig = TableProps<Search>["columns"];
type paginationConfig = TableProps<Search>["pagination"];

export const tableColumnConfig: tableColumnConfig = [
  {
    title: "Poster",
    dataIndex: "Poster",
    align: "center",
    width: 100,
    render: (value, movie) => (
      <Image
        fallback="https://via.placeholder.com/60x80"
        loading="lazy"
        src={value}
        alt={movie.Title}
        width={75}
        className="aspect-[3/4] rounded"
      />
    ),
  },
  {
    title: "Title",
    dataIndex: "Title",
  },
  {
    title: "Year",
    dataIndex: "Year",
  },
  {
    title: "Type",
    dataIndex: "Type",
    render: (value) => value.charAt(0).toUpperCase() + value.slice(1),
  },
  {
    title: "Action",
    dataIndex: "imdbID",
    align: "center",
    render: (imdbID) => (
      <Link to={`/movie/${imdbID}`}>
        <Button size="large">Detail</Button>
      </Link>
    ),
  },
];

export const paginationConfig = (
  movies: Omdb | undefined,
  searchParams: URLSearchParams,
): paginationConfig => ({
  current: Number(searchParams.get("page")) || 1,
  pageSize: 10,
  showSizeChanger: false,
  total: Number(movies?.totalResults),
});

export const options = [
  { label: "Movie", value: "movie" },
  { label: "Series", value: "series" },
  { label: "Episode", value: "episode" },
];
