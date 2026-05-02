import { useState } from 'react';
import css from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const closeModal = () => setSelectedMovie(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setMovies([]);
    setError(null);

    try {
      const results = await fetchMovies({ query });
      if (results.length === 0) {
        toast.error('No movies found for your request.');
        return;
      }
      setMovies(results);
    } catch {
      setError('There was an error, please try again...');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}

      {error ? (
        <ErrorMessage message={error} />
      ) : (
        !loading &&
        movies.length > 0 && (
          <MovieGrid
            movies={movies}
            onSelect={movie => setSelectedMovie(movie)}
          />
        )
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}

      <Toaster position="top-center" />
    </div>
  );
};

export default App;
