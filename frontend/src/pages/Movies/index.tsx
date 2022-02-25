import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MoviesPage } from "types/moviesPage";
import { SpringPage } from "types/vendor/spring";
import { requestBackend } from "util/request";
import "./styles.css";

const Movies = () => {
  const [page, setPage] = useState<SpringPage<MoviesPage>>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: "/movies",
      withCredentials: true,
      params: {
        page: 0,
        size: 12,
      },
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
      console.log(response.data);
    });
  }, []);
  return (
    <div className="movie-container">
      <h1>Tela de listagem de filmes</h1>
      <ul>
          <li key={page?.content[1].id}>
            <Link to={"/movies/" + page?.content[1].id}>Acessar/{page?.content[1].title}/{page?.content[1].id}</Link>
          </li>
          <li key={page?.content[5].id}>
            <Link to={"/movies/" + page?.content[5].id}>Acessar/{page?.content[5].title}/{page?.content[5].id}</Link>
          </li>
      </ul>
    </div>
  );
};

export default Movies;
