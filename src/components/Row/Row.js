import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import "./Row.css";
import Youtube from "react-youtube";
import RowItem from "../RowItem/RowItem";

function Row({ title, fetchUrl, isLargeImg }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(async () => {
    const response = await axios.get(fetchUrl);
    setMovies(response.data.results);
  }, [fetchUrl]);

  const deleteErrorMessage = () => {
    setErrorMessage("");
  };

  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row_posters">
        {movies.map((movie) => (
          <RowItem
            key={movie.id}
            movie={movie}
            trailerUrl={trailerUrl}
            setTrailerUrl={setTrailerUrl}
            isLargeImg={isLargeImg}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        ))}
      </div>
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
        {trailerUrl && (
          <Youtube className="video-wrapper" videoId={trailerUrl} />
        )}
      </div>
    </div>
  );
}

export default Row;
