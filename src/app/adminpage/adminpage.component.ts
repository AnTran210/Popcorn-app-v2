import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Source } from '../models/movie.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adminpage',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './adminpage.component.html',
  styleUrl: './adminpage.component.scss',
})
export class AdminpageComponent {
  categories: string[] = [
    'Action',
    'Adventure',
    'Animation',
    'Biography',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'Film Noir',
    'History',
    'Horror',
    'Music',
    'Mystery',
    'Romance',
    'Sci-Fi',
    'Sport',
    'Thriller',
    'War',
  ];

  fb = inject(FormBuilder);

  movieForm = this.fb.group({
    id: ['', Validators.required],
    title: ['', Validators.required],
    genres: this.fb.array([]),
    type: ['', Validators.required],
    poster: [null, Validators.required],
    background: [null, Validators.required],
    sources: this.fb.array([
      this.fb.group({
        episode: [null, Validators.required],
        url: ['', Validators.required],
      }),
    ]),
  });

  // Getter để truy cập FormArray dễ dàng trong template
  get genres(): FormArray {
    return this.movieForm.get('genres') as FormArray;
  }

  get sources(): FormArray {
    return this.movieForm.get('sources') as FormArray;
  }

  onCategoryChange(event: any) {
    const genresFormArray: FormArray = this.genres;
    if (event.target.checked) {
      // Nếu được chọn, thêm giá trị vào FormArray
      genresFormArray.push(this.fb.control(event.target.value));
    } else {
      // Nếu bỏ chọn, tìm và xóa giá trị khỏi FormArray
      const index = genresFormArray.controls.findIndex(
        (control) => control.value === event.target.value
      );
      if (index !== -1) {
        genresFormArray.removeAt(index);
      }
    }
  }

  addSource(): void {
    this.sources.push(
      this.fb.group({
        episode: ['', Validators.required],
        url: ['', Validators.required],
      })
    );
  }

  removeSource(i: number): void {
    this.sources.removeAt(i);
  }

  // Phương thức xử lý khi người dùng chọn file
  onFileChange(event: any, field: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // Cập nhật giá trị của FormControl tương ứng với đối tượng File
      this.movieForm.get(field)?.setValue(file);
    }
  }

  http = inject(HttpClient);

  onSubmit(): void {
    if (this.movieForm.valid) {
      const formData = new FormData();

      // Thêm các trường dữ liệu văn bản vào FormData
      const id = this.movieForm.get('id')?.value;
      if (id) formData.append('id', id);
      const title = this.movieForm.get('title')!.value;
      if (title) formData.append('title', title);
      const type = this.movieForm.get('type')!.value;
      if (type) formData.append('type', type);
      const genres = this.movieForm.get('genres')?.value as string[];
      if (genres) genres.forEach((genre) => formData.append('genres', genre));

      // Thêm các đối tượng File vào FormData
      const poster = this.movieForm.get('poster')?.value;
      if (poster) formData.append('poster', poster);
      const background = this.movieForm.get('background')?.value;
      if (background) formData.append('background', background);

      // Thêm FormArray sources
      const sources = this.movieForm.get('sources')?.value;
      if (sources) {
        sources.forEach((source, index) => {
          formData.append(`sources[${index}].episode`, source.episode?? '');
          formData.append(`sources[${index}].url`, source.url?? '');
        });
      }

      this.http.post('https://localhost:7114/api/movie/new', formData).subscribe({
        next: (response) => console.log('Thành công:', response),
        error: (error) => console.error('Lỗi:', error)
      });
    }
  }
}
