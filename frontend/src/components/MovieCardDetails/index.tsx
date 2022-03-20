import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { MoviesPage } from 'types/moviesPage';
import { requestBackend } from 'util/request';
import './styles.css';

type Props = {
    movieId: string;
}
const MovieCardDetails = ({ movieId } : Props) => {

    const [pageDetailsMovie, setPageDetailsMovie] = useState<MoviesPage>();

    
     useEffect(() => {
        const config: AxiosRequestConfig = {
        url: "/movies/" + movieId,
        withCredentials: true,
    };

    requestBackend(config).then((response) => {
      setPageDetailsMovie(response.data);
    })
  },[movieId]);

    return (
            <div className="movie-card-details" key={pageDetailsMovie?.id}>
                <div className="movie-card-details-image-container">
                    <img className="movie-card-details-image" src={pageDetailsMovie?.imgUrl} alt="Imagem do filme" />
                </div>
                <div className="movie-card-details-container">
                     <h4 className="movie-title"> {pageDetailsMovie?.title}</h4>
                    <p className="movie-card-year">{pageDetailsMovie?.year}</p>
                    <p className="movie-card-subtitle">{pageDetailsMovie?.subTitle}</p>
                     <p className="sinopys-movie">{pageDetailsMovie?.synopsis}</p>
                </div>
            </div>
    );
};

export default MovieCardDetails;