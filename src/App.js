import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <div className="container">
      <h1>🎬 Movie Library</h1>

      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie._id} className="movie-card">
            <h2>{movie.title}</h2>
            <p>
              <strong>Year:</strong> {movie.year}
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {movie.rating}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
