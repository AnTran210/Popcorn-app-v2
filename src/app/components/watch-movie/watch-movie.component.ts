import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailService } from '../../services/movie-detail.service';
import { Movie } from '../../models/movie.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-watch-movie',
  imports: [],
  templateUrl: './watch-movie.component.html',
  styleUrl: './watch-movie.component.scss'
})
export class WatchMovieComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  movieService = inject(MovieDetailService);
  movie: Movie | undefined;
  safeUrl!: SafeResourceUrl;
  currentEp: number = 1;

  constructor(private sanitizer: DomSanitizer) {
    const movieId = String(this.route.snapshot.params['id']);
    this.movie = this.movieService.getMovieById(movieId);
    this.loadMovie();
  }

  loadMovie() {
    const url = String(this.movie?.sources[0].url);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  goToEp(epNumber: number): void {
    this.currentEp = epNumber;
    const url = String(this.movie?.sources[epNumber - 1].url);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
