import { inject, Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';
import moviesData from '../../../public/movies.json';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailService {
  http = inject(HttpClient);
  PopcornApi_HostAddress = "https://localhost:7114";
  protected movieList: Movie[] = moviesData as Movie[];
  constructor() { }

  getAllMovies() {
    const username = localStorage.getItem('username');
    const url = `${this.PopcornApi_HostAddress}/api/movie?username=${username}`;
    return this.http.get<Movie[]>(url);
  }

  getMoviesByType(type: string) {
    const username = localStorage.getItem('username');
    const url = `${this.PopcornApi_HostAddress}/api/movie/type?query=${type}&username=${username}`;
    return this.http.get<Movie[]>(url);
  }

  getMoviesByGenre(genre: string) {
    const username = localStorage.getItem('username');
    const url = `${this.PopcornApi_HostAddress}/api/movie/genre?query=${genre}&username=${username}`;
    return this.http.get<Movie[]>(url);
  }

  getMovieById(id: String) {
    const username = localStorage.getItem('username');
    const url = `${this.PopcornApi_HostAddress}/api/movie/${id}?username=${username}`;
    return this.http.get<Movie>(url);
  }
}
