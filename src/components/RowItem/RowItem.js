import movieTrailer from "movie-trailer";
import React, { Fragment, useState } from "react";
import ReactStars from "react-rating-stars-component";
import imageNotFound from "../../assets/images/404NotFoundPoster.png";
import Modal from "../Modal/Modal";
import "./RowItem.css";

const base_url_for_images = "https://image.tmdb.org/t/p/original";

function RowItem({ movie, setTrailerUrl, isLargeImg, setErrorMessage }) {
  const [disabled, setDisabled] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleClick = async (movie) => {
    let url = "";
    setDisabled(true);
    try {
      url = await movieTrailer(
        movie?.title || movie?.name || movie?.original_name
      );
      const urlParams = new URLSearchParams(new URL(url).search);
      const newTrailerUrl = urlParams.get("v");
      setTrailerUrl(newTrailerUrl);
    } catch (error) {
      setErrorMessage(`Trailer requested by you is not found.`);
    }
    setDisabled(false);
  };

  const handlePosterImageNotFound = (event) => {
    const { currentTarget } = event;
    currentTarget.onerror = null; // prevents looping
    currentTarget.src = imageNotFound;
  };

  return (
    <Fragment>
      <div className="row_poster_item">
        <img
          key={movie.id}
          onClick={() => setOpenModal(true)}
          className={`row_poster ${isLargeImg && "row_posterLarge"}`}
          src={`${base_url_for_images}${
            isLargeImg ? movie.poster_path : movie.backdrop_path
          }`}
          onError={handlePosterImageNotFound}
          alt={movie.name}
        />
        <div className="row_item_name">
          <h5>{movie.name || movie.title}</h5>
        </div>
        <div className="rating">
          <ReactStars
            edit={false}
            activeColor={"orange"}
            value={Number(movie.vote_average) / 2}
            color={"#dcdffd"}
            isHalf={true}
          />
          <span>({Number(movie.vote_average).toFixed(1)}/10)</span>
        </div>
        <div className="btn-container-center">
          <button
            className="watch_btn"
            onClick={() => handleClick(movie)}
            disabled={disabled}
          >
            Play
          </button>
          <button className="details_btn" onClick={() => setOpenModal(true)}>
            Details
          </button>
        </div>
      </div>
      {openModal && <Modal setOpenModal={setOpenModal} movie={movie} />}
    </Fragment>
  );
}

export default RowItem;
