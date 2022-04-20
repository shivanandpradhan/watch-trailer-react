import React, { Fragment, useState } from 'react'
import movieTrailer from 'movie-trailer';
import ReactStars from "react-rating-stars-component";
import "./RowItem.css"


const base_url_for_images = "https://image.tmdb.org/t/p/original";

function RowItem({movie, setTrailerUrl, trailerUrl, isLargeImg, setErrorMessage, errorMessage}) {

    const [status, setStatus] = useState("watch")

    const handleClick = async (movie) => {

        let url = "";
        try {
            
            url = await movieTrailer(movie?.title || movie?.name || movie?.original_name);
            const urlParams = new URLSearchParams(new URL(url).search);
            const newTrailerUrl = urlParams.get("v")

            if (trailerUrl === ""){
                {errorMessage && setErrorMessage("")}
                setStatus('close');
                setTrailerUrl(newTrailerUrl);
            }
            else if (trailerUrl === newTrailerUrl){
                setStatus("watch");
                setTrailerUrl("")
                return;
            }
            else {
                setErrorMessage("Please Close watching Video first.")
            }

        } catch (error) {
            setErrorMessage(`Trailer requested by you is not found.`)
        }
        
      };

  return (
    <Fragment>
        <div className="row_poster_item">
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row_poster ${isLargeImg && "row_posterLarge"}`}
              src={`${base_url_for_images}${
                isLargeImg ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
            <h5>{movie.name || movie.title}</h5>
            <div className="poster_rating_and_button">
              <div>
                <div className="rating">
                  <ReactStars
                    edit={false}
                    activeColor={"orange"}
                    value={Number(movie.vote_average) / 2}
                    color={"#dcdffd"}
                    isHalf={true}
                  />
                  <span>({movie.vote_average}/10)</span>
                </div>
                <p>{movie.release_date || movie.first_air_date}</p>
              </div>
              <div>
                <button
                  className="watch_btn"
                  onClick={() => handleClick(movie)}
                >
                  {status}
                </button>
              </div>
            </div>
          </div>
    </Fragment>
  )
}

export default RowItem