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
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
 



export default function App() {
    const [query, setQuery] = useState('');
   const [page, setPage] = useState(1);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const { data, isLoading, isError } = useQuery({
        queryKey: ['movie', query, page],
        queryFn: () => fetchMovies(query, page),
        enabled: query !== ''
    });

    const totalPages = data?.total_pages ?? 0;

    const handleSearch = async (newQuery: string) => {
        if (newQuery.trim() === '') {
            toast('Please enter your search query');
            return;
        }

        if (data && data.results.length === 0) {
            toast('No movies found for your request.');
            return;
        }

        setQuery(newQuery);
        setPage(1);
          
   
    };

    return (
        <div className={css.app}>
            <SearchBar onSubmit={handleSearch} />
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            {data && data.results.length > 0 && (
                <>
                    {totalPages > 1 && (
                        <ReactPaginate
                            pageCount={totalPages}
                            pageRangeDisplayed={5}
                            marginPagesDisplayed={1}
                            onPageChange={({ selected }) => setPage(selected + 1)}
                            forcePage={page - 1}
                            containerClassName={css.pagination}
                            activeClassName={css.active}
                            nextLabel="→"
                            previousLabel="←"
                            renderOnZeroPageCount={null}
                        />
                    )}
                    <MovieGrid movies={data.results} onSelect={setSelectedMovie} />
                    
                </>
            )}
            {selectedMovie && (<MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />)}
            <Toaster/>
        </div>
    )
}