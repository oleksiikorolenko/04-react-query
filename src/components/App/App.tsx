import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import css from './App.module.css';
import { useState } from "react";
import SearchBar from '../SearchBar/SearchBar';
 



export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const handleSearch = async (query: string) => {
       setMovies([]);
        setLoading(true);
        setError(false);

        try {
            const results = await fetchMovies(query);
            if (results.length === 0) {
                toast('No movies found for your request.');
            }
            setMovies(results);
        } catch {
            setError(true);
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className={css.app}>
            <SearchBar onSubmit={handleSearch} />
            {loading && <Loader />}
            {error && <ErrorMessage />}
            {movies.length > 0 && (<MovieGrid movies={movies} onSelect={setSelectedMovie} />)}
            {selectedMovie && (<MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />)}
            <Toaster/>
        </div>
    )
}