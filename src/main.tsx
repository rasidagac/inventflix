import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import Movies from "./routes/movies";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev";
import SingleMovie from "./routes/single-movie";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        element: <Movies />,
        index: true,
        loader: async ({ request }): Promise<Response> => {
          const searchQuery = new URL(request.url).searchParams.get("s");
          const yearQuery = new URL(request.url).searchParams.get("y");
          const typeQuery = new URL(request.url).searchParams.get("type");
          const pageQuery =
            new URL(request.url).searchParams.get("page") || "1";

          if (searchQuery === null) {
            return redirect("/?s=pokemon");
          }

          return await fetch(
            `https://www.omdbapi.com/?s=${searchQuery}&y=${yearQuery}&type=${typeQuery}&page=${pageQuery}&apikey=955822d2`,
          );
        },
      },
      {
        path: "/movie/:imdbID",
        element: <SingleMovie />,
        loader: async ({ params }): Promise<Response> => {
          return await fetch(
            `https://www.omdbapi.com/?i=${params.imdbID}&apikey=955822d2`,
          );
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DevSupport
      ComponentPreviews={ComponentPreviews}
      useInitialHook={useInitial}
    >
      <RouterProvider router={router} />
    </DevSupport>
  </React.StrictMode>,
);
