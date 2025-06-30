import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailService } from '../../services/movie-detail.service';
import { Movie } from '../../models/movie.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-detail',
  imports: [],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  movieService = inject(MovieDetailService);
  movie: Movie | undefined;
  safeUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    const movieId = String(this.route.snapshot.params['id']);
    this.movie = this.movieService.getMovieById(movieId);
  }

  ngOnInit() {
    const url = String(this.movie?.sources[0].url);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
