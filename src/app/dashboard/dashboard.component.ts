import { Component, inject } from '@angular/core';
import { MovieItemComponent } from '../components/movie-item/movie-item.component';
import { Movie } from '../models/movie.model';
import { MovieDetailService } from '../services/movie-detail.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MovieItemComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  movieService = inject(MovieDetailService);
  movieItemList: Movie[] = [];

  ngOnInit() {
    this.movieItemList = this.movieService.getAllMovies();
  }

  startIndex = 0;
  visibleCount = 6;

  get visibleItems() {
    return this.movieItemList.slice(this.startIndex, this.startIndex + this.visibleCount);
  }

  next() {
    if (this.startIndex + this.visibleCount < this.movieItemList.length) {
      this.startIndex+=this.visibleCount;
      alert(String(document.getElementById('trending')?.style.getPropertyValue("max-width")));
    }
  }

  prev() {
    if (this.startIndex > 0) {
      this.startIndex-=this.visibleCount;
    }
  }
}
