import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <div>
          <h1>{movie.title_long}</h1>
          <img src={movie.medium_cover_image} alt={movie.slug} />
          <h4>평점</h4>
          <p>{movie.rating}</p>
          <p>{movie.summary}</p>
          <h4>인트로</h4>
          <p>{movie.description_intro}</p>
          <h4>장르</h4>
          <ul>
            {movie.genres && movie.genres.map((g) => <li key={g}>{g}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Detail;
