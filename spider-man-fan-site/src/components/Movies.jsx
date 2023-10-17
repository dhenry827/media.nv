import React, {useState, useEffect} from 'react'
import './Movies.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



const Movies = () => {
  const [search, setSearch] = useState('') 
  const [movies, setMovies] = useState([])
  const [movieInfo, setMovieInfo] = useState({})
  const [hidden, setHidden] = useState(true)
  const [found, setFound] = useState(false) 

  const getMovies = async(movie) => {
    let response = await fetch(`https://www.omdbapi.com/?s=${movie}&apikey=4ad02d8d`)
    let data = await response.json()
    setMovies(data.Search)

    if(!hidden){
    setHidden(true)
    }
    
  }

  const getMovieInfo = async(id) => {
    let response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=4ad02d8d`)
    let data = await response.json()
    setMovieInfo(data)
    
    
      setHidden(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getMovies(search)
  }

  useEffect(() => {
    getMovies('spider-man')
  },[]) 
  
  return (
    <div id='mainCont'>
    <div id='formCont'>
      <div id='siteHeader'>
        <h1>Media.NV</h1>
      </div>
    <Form id='searchForm' onSubmit={handleSubmit}>
        <Form.Group className="mb-3"> 
            <Form.Control 
              type="text" 
              placeholder="Search movies here" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            /> 
        </Form.Group>
        <Button variant="primary" type='submit'>
          Search
        </Button>
      </Form>
    </div>
    <div id='movieCont'>
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

      <div id='movieListCont'>
      {!movies ? (
          'Media Not Found :('
        ) :
        (movies.map((movie, index) => {
        return (
          <div key={index} className='movie'>
              <img src={movie.Poster} alt="" className='moviePoster'/>
              <h3><a className={index} href='#' onClick={(e) => {getMovieInfo(movie.imdbID)}}>{movie.Title} </a>({movie.Year})</h3>
          </div>
        ) 
      })
        )}
      </div>
    </div>
    </div>
  )
}

export default Movies