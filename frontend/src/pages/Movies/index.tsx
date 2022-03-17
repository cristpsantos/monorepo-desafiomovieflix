import { AxiosRequestConfig } from "axios";
import MovieCard from "components/MovieCard";
import Pagination from "components/Pagination";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MoviesPage } from "types/moviesPage";
import { SpringPage } from "types/vendor/spring";
import { requestBackend } from "util/request";
import "./styles.css";

type ControlComponentData = {
  activePage: number;
};

const Movies = () => {
  const [page, setPage] = useState<SpringPage<MoviesPage>>();

  const [controlComponentData, setControlComponentData] =
    useState<ControlComponentData>({
      activePage: 0,
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentData({
      activePage: pageNumber
    })
  }

  const getMovies = useCallback(() => {
    const params: AxiosRequestConfig = {
      url: "/movies",
      withCredentials: true,
      params: {
        page: controlComponentData.activePage,
        size: 4,
      },
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
      console.log(response.data);
    });
  }, [controlComponentData]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <div className="movie-container-main">
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
              <div className="col-sm-6 col-xl-3 movie-items" key={movie.id}>
                <Link to={`/movies/${movie.id}`}>
                  <MovieCard movie={movie} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <Pagination
        forcePage={page?.number}
        pageCount={page ? page.totalPages : 0}
        range={3}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default Movies;
