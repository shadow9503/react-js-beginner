import Movie from "../components/Movie";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useTheme } from "../context/themeProvider";

function Home() {
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(true);
  const [movies, setMovies] = useState([]);
  const [bottom, setBottom] = useState(null);
  const [page, setPage] = useState(1);
  const bottomObserver = useRef(null);

  const getMovies = async () => {
    setFetching(true);
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=5.8&sort_by=year&page=${page}`
      )
    ).json();
    setMovies([...movies, ...json.data.movies]);
    setLoading(false);
    setFetching(false);
    console.log("fetched");
  };

  useEffect(() => {
    getMovies();
  }, [page]); // page값 주시

  // create observer
  useEffect(() => {
    const options = {
      threshold: 0.5,
      rootMargin: "100%",
      root: document.getElementById("movelist"),
    };
    const callback = (entries) => {
      if (entries[0].isIntersecting) {
        setPage((current) => current + 1);
      }
    };
    bottomObserver.current = new IntersectionObserver(callback, options);
  }, []);

  useEffect(() => {
    const observer = bottomObserver.current;
    if (bottom) {
      observer.observe(bottom);
    }
    return () => {
      if (bottom) {
        observer.unobserve(bottom);
      }
    };
  }, [bottom]);

  return (
    <div>
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img src={process.env.PUBLIC_URL + "/loading.gif"} />
          <h1>불러오는 중</h1>
        </div>
      ) : (
        <div
          id="movielist"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 2fr",
            gridGap: "20px",
          }}
        >
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))}
          <div ref={setBottom}></div>
        </div>
      )}
      <div
        style={{
          width: "100%",
          textAlign: "center",
          fontSize: "20px",
        }}
      >
        {fetching && loading == false ? (
          <img src={process.env.PUBLIC_URL + "/loading.gif"} />
        ) : null}
      </div>
    </div>
  );
}

export default Home;
