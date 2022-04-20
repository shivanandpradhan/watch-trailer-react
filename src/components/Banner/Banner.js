import axios from "../../utils/axios";
import React, { useState, useEffect } from "react";
import "./Banner.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

let responseData = [];

function Banner({ fetchUrl }) {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [button, setButton] = useState("Play");

  const [errorMessage, setErrorMessage] = useState("");

  const deleteErrorMessage = () => {
    setErrorMessage("");
  };

  useEffect(async () => {
    const response = await axios.get(fetchUrl);

    responseData = response.data.results;

    const random_movie =
      responseData[Math.floor(Math.random() * responseData.length)];

    setMovie(random_movie);
  }, []);

  function handleNext() {
    {errorMessage && setErrorMessage("")}

    setMovie(responseData[Math.floor(Math.random() * responseData.length)]);

    setTrailerUrl("");
    setButton("Play");
  }

  const handlePlay = (movie) => {
    button === "Play" ? setButton("Hide") : setButton("Play");

    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => {
          setButton("Play");
          setErrorMessage("Trailer Requested Not Found. Try Next")
        });
    }
  };

  return (
    <>
      <header
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://images.tmdb.org/t/p/original${movie?.backdrop_path}")`,
          backgroundPosition: "center center",
        }}
      >
        <div className="banner-contents">
          <h1 className="banner-title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner-buttons">
            <button className="banner-button" onClick={() => handlePlay(movie)}>
              {button}
            </button>
            <button className="banner-button" onClick={handleNext}>
              Next
            </button>
          </div>
          <p className="banner-description">{movie?.overview}</p>
        </div>
      </header>
      <div className="youtube-video">
        {errorMessage && (
          <div className="error-message">
            <h3>{errorMessage}</h3>
            <button
              className="delete_error_button"
              onClick={deleteErrorMessage}
            >
              X
            </button>
          </div>
        )}
        {trailerUrl && <Youtube videoId={trailerUrl} />}
      </div>
    </>
  );
}

export default Banner;
