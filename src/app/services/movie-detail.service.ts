import { inject, Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';
import moviesData from '../../../public/movies.json';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailService {
  http = inject(HttpClient);
  PopcornApi_HostAddress = "https://localhost:7194";
  protected movieList: Movie[] = moviesData as Movie[];
  constructor() { }

  getAllMovies() {
    const url = `${this.PopcornApi_HostAddress}/api/movie`;
    return this.http.get<Movie[]>(url);
  }

  getMoviesByType(type: string) {
    const url = `${this.PopcornApi_HostAddress}/api/movie/type?query=${type}`;
    return this.http.get<Movie[]>(url);
  }

  getMoviesByGenre(genre: string) {
    const url = `${this.PopcornApi_HostAddress}/api/movie/genre?query=${genre}`;
    return this.http.get<Movie[]>(url);
  }

  getMovieById(id: String) {
    const url = `${this.PopcornApi_HostAddress}/api/movie/${id}`;
    return this.http.get<Movie>(url);
  }
}
