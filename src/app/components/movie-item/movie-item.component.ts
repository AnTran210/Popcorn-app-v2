import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.scss'
})
export class MovieItemComponent {
  @Input() movie!:Movie;
}
