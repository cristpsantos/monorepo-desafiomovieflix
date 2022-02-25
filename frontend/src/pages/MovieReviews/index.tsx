import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { MovieReviewsPage } from "types/movieReviewsPage";
import { hasAnyRoles } from "util/auth";
import { requestBackend } from "util/request";
import { ReactComponent as StarImage } from "assets/images/Star.svg";
import "./styles.css";

type UrlParams = {
  movieId: string;
};

type FormData = {
  text: string;
  movieId: number;
};

const MoviesReviews = () => {
  let { movieId } = useParams<UrlParams>();

  const [page, setPage] = useState<MovieReviewsPage[]>();

  const [reload, setReload] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    formData.movieId = Number(movieId);

    const params: AxiosRequestConfig = {
      method: "POST",
      url: "/reviews",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: JSON.stringify(formData),
    };
    console.log(params);
    requestBackend(params).then((response) => {
      if (reload === true) {
        setReload(false);
        setValue("text", "");
      } else {
        setReload(true);
        setValue("text", "");
      }
    });
  };

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: "/movies/" + movieId + "/reviews",
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
    });
  }, [reload, movieId]);

  return (
    <div className="reviews-container">
      <h1>Tela detalhes do filme id: {movieId}</h1>
      {hasAnyRoles(["ROLE_MEMBER"]) ? (
        <div className="card-newreviews">
          <form onSubmit={handleSubmit(onSubmit)} className="form-reviews">
            <input
              {...register("text", {
                required: "O campo da avaliação não pode ser vazio!",
              })}
              name="text"
              type="text"
              placeholder="Deixe aqui sua avaliação"
              className={`form-control base-input ${
                errors.text ? "is-invalid" : ""
              }`}
            />
            <div className="feedback d-block">{errors.text?.message}</div>
            <div className="buttom-div-custom">
              <button className="buttom-custom-review">
                SALVAR SUA AVALIAÇÃO
              </button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}

      <div className="card-reviews">
        {page?.map((review) => [
          <div className="details-reviews" key={review.id}>
            <div className="name-user-container">
              <StarImage />
              <h4 className="name-user"> {review.user.name}</h4>
            </div>
            <p className="review-users">{review.text}</p>
          </div>,
        ])}
      </div>
    </div>
  );
};

export default MoviesReviews;
