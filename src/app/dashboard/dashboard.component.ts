import { Component, inject } from '@angular/core';
import { MovieItemComponent } from '../components/movie-item/movie-item.component';
import { Movie } from '../models/movie.model';
import { MovieDetailService } from '../services/movie-detail.service';
import { LoginComponent } from '../components/login/login.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MovieItemComponent, LoginComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  movieService = inject(MovieDetailService);
  movieItemList: Movie[] = [];

  ngOnInit() {
    this.movieItemList = this.movieService.getAllMovies();
  }
}
