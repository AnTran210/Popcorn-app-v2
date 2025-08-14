import { Component, Inject, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailService } from '../../services/movie-detail.service';
import { Movie } from '../../models/movie.model';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { catchError } from 'rxjs';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-movie-detail',
  imports: [RouterLink, HeaderComponent],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
})
export class MovieDetailComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  private movieService = inject(MovieDetailService);
  private sanitizer = inject(DomSanitizer);
  private router = inject(Router);
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
  relatedMovies = signal<Movie[]>([]);
  safeUrl!: SafeResourceUrl;
  

  constructor() {
    
  }

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
    })
    this.movieService.getAllMovies()
    .pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      })
    )
    .subscribe((movies) => {
      this.relatedMovies.set(movies);
    })
    const vidUrl = String(this.movie().sources[0].url);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(vidUrl);
  }

  gotoOther(str : String) {
    this.router.navigate(['/movieDetail', str]);
  }
}
