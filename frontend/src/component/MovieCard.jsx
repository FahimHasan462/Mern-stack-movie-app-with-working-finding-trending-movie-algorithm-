const MovieCard = ({movie:{title,poster_path,release_date,vote_average,original_language,id}}) => 
{
    const handleClick =async() =>    
    {   const API_OPTION = {method: "POST",
        headers: {accept: "application/json","Content-Type": "application/json"},
        body: JSON.stringify({id: id, title: title, poster:poster_path})};   

        const response = await fetch('http://localhost:3002/api/trendingMovies',API_OPTION);
        const data =  await response.json();
        console.log(data.message);
    };
        return (  
        <div onClick={handleClick} className="movie-card cursor-pointer">
            <img src={poster_path? `https://image.tmdb.org/t/p/w500/${poster_path}`:'/no-moive.png'} alt={title} />
            <div className="mt-4">
                <h3>{title}</h3></div>
            <div className="content">
                <div className="rating">
                    <img src="star.png" alt="star icon" />
                    <p>{vote_average? vote_average.toFixed(1):"N/A"}</p>
                </div>
                <span>•</span>
                <p className="lang">{original_language}</p>
                <span>•</span>
                <p className="year">{release_date? release_date.split('-')[0]: 'N/A'}</p>

            </div>
        </div> 
        );
    }
 
export default MovieCard;