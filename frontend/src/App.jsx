import React, { useEffect, useState } from "react";
import Search from "./component/search";
import Spinner from "./component/spiner";
import MovieCard from "./component/MovieCard";
import {useDebounce} from 'react-use'





//Getting popular movies from TMDB API
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTION = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearch,setDebounced] =useState('')

  useDebounce(()=>setDebounced(searchTerm),600,[searchTerm])

  const fetchMovie = async (query= "" ) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query?`${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` :
      `${API_BASE_URL}/discover/movie?`;
      const response = await fetch(endpoint, API_OPTION);
      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.status_message || "Something went wrong");
        setMovieList([]);
        return;
      }

      setMovieList(data.results);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie(debouncedSearch);
  }, [debouncedSearch]);

//getting trending from from personal server
const [trendingMovies,setTrendingMovies]=useState([])
useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch("https://mern-stack-movie-app-with-working-finding-trendi-production.up.railway.app/api/trendingMovies");
        const data = await response.json();
        setTrendingMovies(data);   
        console.log(trendingMovies)    
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchTrendingMovies();
  }, []);


  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="./hero-img.png" alt="Hero Banner" />
            <h1>
              Find <span className="text-gradient">Movies</span> you'll Enjoy Without Hasssle
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
                {trendingMovies.map((movie,index) => (
                    <li key={movie.id}>
                    <p>{index+1}</p>
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster}`} alt={movie.title}/>
          </li>
        ))}
            </ul>
          </section>
          <section className="all-movies">
            <h2>Popular Movies</h2>
            {isLoading ? (<Spinner/>)  : 
            errorMessage ? (<p className="text-red-500">{errorMessage}</p>) : 
            ( <ul>
                {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie}/>  
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default App;
