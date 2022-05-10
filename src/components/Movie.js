import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";
import { useState } from "react";

function Movie({ id, coverImg, title, year, summary, genres }) {
  const [image, setImage] = useState(coverImg);
  const [imgId, setImgId] = useState("");
  const onMouseOver = (e) => {
    setImgId(styles.movie__img_hover);
  };
  const onMouseLeave = (e) => {
    setImgId("");
  };
  const handleImgError = (e) => {
    e.target.src = `${process.env.PUBLIC_URL}/default.png`;
  };
  return (
    <Link
      to={`/movie/${id}`}
      className={styles.movie}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      <img
        src={coverImg}
        onError={handleImgError}
        className={`${styles.movie__img} ${imgId}`}
      />
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <h2 className={styles.movie__title}>{title}</h2>
          <h5 style={{ color: "#7a7a7a" }}>more</h5>
        </div>

        <h3 className={styles.movie__year}>{year}</h3>
        <p className={styles.movie__summary}>
          {summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}
        </p>
        <ul className={styles.movie__genres}>
          {genres.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
