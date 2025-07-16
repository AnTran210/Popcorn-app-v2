import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailService } from '../../services/movie-detail.service';
import { Movie, Genre } from '../../models/movie.model';
import { MovieItemComponent } from '../movie-item/movie-item.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-filter',
  imports: [HeaderComponent, MovieItemComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  movieService = inject(MovieDetailService);
  movieItemList: Movie[] = [];
  filteredMovies: Movie[] = [];
  genre: Genre = 'Action';
  numberOfPages = 0;
  pages: number[] = [];
  currentPage: number = 1;

  constructor() {
    this.movieItemList = this.movieService.getAllMovies();
    this.genre = this.route.snapshot.params['category'];
    this.movieItemList = this.movieItemList.filter(movie => movie.genres.includes(this.genre));
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
