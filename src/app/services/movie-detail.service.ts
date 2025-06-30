import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';
import moviesData from '../../../public/movies.json';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailService {
  protected movieList: Movie[] = moviesData as Movie[];
  constructor() { }

  getAllMovies(): Movie[] {
    return this.movieList;
  }

  getMovieById(id: String): Movie | undefined {
    return this.movieList.find(movie => 
      movie.id === id);
  }
}
