import React from "react";
import imageNotFound from "../../assets/images/404NotFoundPoster.png";
import ReactStars from "react-rating-stars-component";
import "./Modal.css";

function Modal({ setOpenModal, movie }) {
  const base_url_for_images = "https://image.tmdb.org/t/p/original";

  console.log(movie);
  const handlePosterImageNotFound = (event) => {
    const { currentTarget } = event;
    currentTarget.onerror = null; // prevents looping
    currentTarget.src = imageNotFound;
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => setOpenModal(false)}> X </button>
        </div>
        <div className="modalContainer-card">
          <div className="modalContainer-card-image">
            <img
              key={movie.id}
              src={`${base_url_for_images}${
                movie.backdrop_path || movie.poster_path
              }`}
              onError={handlePosterImageNotFound}
              alt={movie.name || movie.title}
            />
          </div>
          <div className="body">
            <div className="title">
              <h1>{movie.name || movie.title}</h1>
            </div>
            <p>{movie.overview}</p>
            <div className="rating-container">
              <ReactStars
                edit={false}
                activeColor={"orange"}
                value={Number(movie.vote_average) / 2}
                color={"#dcdffd"}
                isHalf={true}
              />
              <span>({Number(movie.vote_average).toFixed(1)}/10)</span>
            </div>
          </div>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
