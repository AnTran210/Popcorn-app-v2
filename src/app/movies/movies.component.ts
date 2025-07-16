import { Component, inject } from '@angular/core';
import { MovieItemComponent } from '../components/movie-item/movie-item.component';
import { Movie } from '../models/movie.model';
import { MovieDetailService } from '../services/movie-detail.service';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [HeaderComponent, MovieItemComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {
  movieService = inject(MovieDetailService);
  movieItemList: Movie[] = [];
  filteredMovies: Movie[] = [];
  numberOfPages = 0;
  pages: number[] = [];
  currentPage: number = 1;

  ngOnInit() {
    this.movieItemList = this.movieService.getAllMovies();
    this.movieItemList = this.movieItemList.filter(movie => movie.type == "Movie");
    this.numberOfPages = Math.ceil(this.movieItemList.length / 10);
    this.pages = Array.from({ length: this.numberOfPages }, (_, i) => i + 1);
    this.goToPage(1);
  }

  goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    const itemsPerPage = 10;
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    this.filteredMovies = this.movieItemList.slice(startIndex, endIndex);
  }
}
