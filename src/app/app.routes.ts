import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        title: 'Dashboard',
    },
    {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories',
    },
    {
        path: 'movieDetail/:id',
        component: MovieDetailComponent,
        title: 'Movie Detail',
    },
];
