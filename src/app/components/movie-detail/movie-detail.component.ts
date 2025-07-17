import { Component, Inject, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailService } from '../../services/movie-detail.service';
import { Movie } from '../../models/movie.model';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-movie-detail',
  imports: [RouterLink],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
})
export class MovieDetailComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  private movieService = inject(MovieDetailService);
  private sanitizer = inject(DomSanitizer);
  private router = inject(Router);
  movie: Movie | undefined;
  relatedMovies = signal<Movie[]>([]);
  safeUrl!: SafeResourceUrl;
  

  constructor() {
    
  }

  ngOnInit() {
    const movieId = String(this.route.snapshot.params['id']);
    this.movie = this.movieService.getMovieById(movieId);
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
    const vidUrl = String(this.movie?.sources[0].url);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(vidUrl);
  }

  gotoOther(str : String) {
    this.router.navigate(['/movieDetail', str]);
  }
}
