import { MoviesPage } from 'types/moviesPage';
import './styles.css';

type Props = {
    movie: MoviesPage;
}

const MovieCard = ( {movie} : Props) => {
    return(
        <div className="movie-card-container">
            <div className="movie-card-item">
                <img className="movie-card-image" src={movie.imgUrl} alt="Imagem do filme" />
                <div className="movie-card-details-movie">
                    <h5>{movie.title}</h5>
                    <p className="movie-card-year">{movie.year}</p>
                    <p className="movie-card-resume">{movie.subTitle}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;