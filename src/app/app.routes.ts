import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { TvShowsComponent } from './tv-shows/tv-shows.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { MoviesComponent } from './movies/movies.component';
import { WatchMovieComponent } from './components/watch-movie/watch-movie.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
    },
    { 
        path: 'dashboard', 
        component: DashboardComponent 
    },
    {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories',
        canActivate: [AuthGuard],
    },
    {
        path: 'movieDetail/:id',
        component: MovieDetailComponent,
        title: 'Movie Detail',
        canActivate: [AuthGuard],
    },
    {
        path: 'watchMovie/:id',
        component: WatchMovieComponent,
        title: 'Wath Movie',
        canActivate: [AuthGuard],
    },
    {
        path: 'tv-shows',
        component: TvShowsComponent,
        title: 'TV Shows',
        canActivate: [AuthGuard],
    },
    {
        path: 'movies',
        component: MoviesComponent,
        title: 'Movies',
        canActivate: [AuthGuard],
    },
    {
        path: '**',
        redirectTo: '/dashboard',
    },
];
