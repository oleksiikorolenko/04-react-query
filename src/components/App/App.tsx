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
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import { useEffect } from 'react';
 



export default function App() {
    const [query, setQuery] = useState('');
   const [currentPage, setCurrentPage] = useState(1);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const { data, isLoading, isError, isSuccess, isFetching } = useQuery({
        queryKey: ['movie', query, currentPage],
        queryFn: () => fetchMovies(query, currentPage),
        placeholderData: keepPreviousData,
        enabled: query !== ''
        
    });

    useEffect(() => {
        if (isSuccess && data && data.results.length === 0) {
          toast('No movies found');
        }
      }, [isSuccess, data]);

    const totalPages = data?.total_pages ?? 0;

    const handleSearch = async (newQuery: string) => {
        if (newQuery.trim() === '') {
            toast('Please enter your search query');
            return;
        }
setQuery(newQuery);
        setCurrentPage(1);
          };

    return (
        <div className={css.app}>
            <SearchBar onSubmit={handleSearch} />
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            {isSuccess && data && data.results.length > 0 && (
                <>
                    {totalPages > 1 && (
                        <ReactPaginate
                            pageCount={totalPages}
                            pageRangeDisplayed={5}
                            marginPagesDisplayed={1}
                            onPageChange={({ selected }) => setCurrentPage(selected + 1)}
                            forcePage={currentPage - 1}
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
            {isFetching && !isLoading}
            {selectedMovie && (<MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />)}
            <Toaster/>
        </div>
    )
}