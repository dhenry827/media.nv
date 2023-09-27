import React, {useState, useEffect} from 'react'

import './Movies.css'

const Movies = () => {
  const [movies, setMovies] = useState([])
  const [movieInfo, setMovieInfo] = useState({})
  const [hidden, setHidden] = useState(true)

  const getMovies = async() => {
    let response = await fetch('https://www.omdbapi.com/?s=spider-man&apikey=4ad02d8d')
    let data = await response.json()
    console.log(data)
    setMovies(data.Search)
  }

  const getMovieInfo = async(id) => {
    let response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=4ad02d8d`)
    let data = await response.json()
    setMovieInfo(data)
    
    if(hidden){
      setHidden(false)
    }

    if(movies[index]){
      setHidden = true
    }
  }

  useEffect(() => {
    getMovies()
  },[]) 
  
  return (
    <div id='mainCont'>
      <div className='infoCont' style={{display: hidden ? 'none' : 'flex' }}>
        <div>
          <img className='infoPoster' src={movieInfo.Poster} />
        </div>
        <div>
          <h1 className='infoTitle'>{movieInfo.Title} ({movieInfo.Year}) {movieInfo.Rated}</h1>
          <h3 className='info'>Director: {movieInfo.Director}</h3>
          <h3 className='info'>Genre: {movieInfo.Genre}</h3>
          <h3 className='info'>Runtime: {movieInfo.Runtime}</h3>
          <h3 className='info'>Rating: {movieInfo.imdbRating}</h3>
          <h4 className='info'>Synopsis:</h4><p>{movieInfo.Plot}</p>
        </div>
      </div>
      <div id='movieCont'>
      {movies.map((movie, index) => {
        return (
          <div key={index} className='movie'>
              <img src={movie.Poster} alt="" className='moviePoster'/>
              <h3><a className={index} href='#' onClick={(e) => {getMovieInfo(movie.imdbID)}}>{movie.Title} </a>({movie.Year})</h3>
          </div>
        ) 
      })}
      </div>
    </div>
  )
}

export default Movies