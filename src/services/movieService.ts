import axios from "axios";
import type { Movie } from "../types/movie";

const API_URL = 'https://api.themoviedb.org/3/search/movie';
const myKey = import.meta.env.VITE_API_KEY;

interface TMDBResponse {
    results: Movie[];
  }

export const fetchMovies = async (query: string): Promise<Movie[]> => {
    const response = await axios.get<TMDBResponse>(API_URL, {
        params: { query },
        headers: {
            Authorization: `Bearer ${myKey}`,
        }
    });
    
    return response.data.results;
    
}