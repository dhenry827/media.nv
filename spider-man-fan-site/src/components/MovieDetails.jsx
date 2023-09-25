import React, {useState, useEffect} from 'react'


const MovieDetails = () => {
  const [movieInfo, setMovieInfo] = useState({})

  const getMovieInfo = async(id) => {
    let response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=4ad02d8d`)
    let data = await response.json()
    console.log(data)
    setMovieInfo(data)
  }

  // useEffect(() => {
  //   getMovieInfo()
  // },[])

  return (
    <div>
      <div>
        <img src={movieInfo.Poster} />
      </div>
      <div>
        <h2>{movieInfo.Title} ({movieInfo.Year}) {movieInfo.Rated}</h2>
        <h3>Director: {movieInfo.Director}</h3>
        <h3>Genre: {movieInfo.Genre}</h3>
        <h3>Runtime: {movieInfo.Runtime}</h3>
        <h3>Rating: {movieInfo.imdbRating}</h3>
        <h4>Synopsis:</h4><p>{movieInfo.Plot}</p>
      </div>
      
    </div>
  )
}

export default MovieDetails