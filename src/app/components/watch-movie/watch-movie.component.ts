import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailService } from '../../services/movie-detail.service';
import { Movie } from '../../models/movie.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-watch-movie',
  imports: [],
  templateUrl: './watch-movie.component.html',
  styleUrl: './watch-movie.component.scss'
})
export class WatchMovieComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  movieService = inject(MovieDetailService);
  private sanitizer = inject(DomSanitizer);
  movie = signal<Movie>({
    "id": "mv022",
    "title": "The Serpent's Coil",
    "genres": [
      "Thriller",
      "Crime"
    ],
    "type": "Movie",
    "posterUrl": "https://example.com/posters/serpents_coil.jpg",
    "backgroundUrl": "https://example.com/backgrounds/serpents_coil_bg.jpg",
    "sources": [
      {
        "episode": 1,
        "url": "https://example.com/movies/serpents_coil_full.mp4"
      }
    ]
  });
  safeUrl!: SafeResourceUrl;
  currentEp: number = 1;

  ngOnInit() {
    const movieId = String(this.route.snapshot.params['id']);
    this.movieService.getMovieById(movieId)
        .pipe(
          catchError((err) => {
            console.log(err);
            throw err;
          })
        )
        .subscribe((movie) => {
          this.movie.set(movie);
           this.loadMovie();
        })
  }

  loadMovie() {
    const url = String(this.movie().sources[0].url);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  goToEp(epNumber: number): void {
    this.currentEp = epNumber;
    const url = String(this.movie().sources[epNumber - 1].url);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
