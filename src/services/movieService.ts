import axios from "axios";
import type { Movie } from "../types/movie";
import toast from "react-hot-toast";

const API_URL = 'https://api.themoviedb.org/3/search/movie';
const myKey = import.meta.env.VITE_API_KEY;

if (!myKey) {
    toast('VITE_TMDB_API_KEY is not defined')
}

interface TMDBResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    }

export const fetchMovies = async (query: string, page: number): Promise<TMDBResponse> => {
    const response = await axios.get<TMDBResponse>(API_URL, {
        params: { query, page },
        headers: {
            Authorization: `Bearer ${myKey}`,
        },
        

    });
    
    return response.data;
    
}