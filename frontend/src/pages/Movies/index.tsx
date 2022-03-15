import { AxiosRequestConfig } from "axios";
import MovieCard from "components/MovieCard";
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
        size: 4,
      },
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
      console.log(response.data);
    });
  }, []);
  return (
    <div className="movie-container">
      <div className="movie-filter">
        <select>
          <option value="Comédia">Comédia</option>
          <option value="Comédia">Terror</option>
          <option value="Comédia">Drama</option>
        </select>
      </div>
      <div className="row">
        {page?.content.map((movie) => {
          return (
            <div className="col-sm-6 col-xl-3" key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <MovieCard movie={movie} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Movies;
