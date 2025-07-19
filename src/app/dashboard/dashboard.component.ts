import { Component, inject, signal } from '@angular/core';
import { MovieItemComponent } from '../components/movie-item/movie-item.component';
import { Movie } from '../models/movie.model';
import { MovieDetailService } from '../services/movie-detail.service';
import { HeaderComponent } from '../components/header/header.component';
import { catchError } from 'rxjs';
import { ChatboxComponent } from '../components/chatbox/chatbox.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, MovieItemComponent, ChatboxComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  movieService = inject(MovieDetailService);
  movieItemList = signal<Movie[]>([]);

  ngOnInit() {
    this.movieService.getAllMovies()
    .pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      })
    )
    .subscribe((movies) => {
      this.movieItemList.set(movies);
    })
  }
}
