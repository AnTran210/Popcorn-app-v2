import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-adminpage',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './adminpage.component.html',
  styleUrl: './adminpage.component.scss',
})
export class AdminpageComponent {
  fb = inject(FormBuilder);
  
  movieForm = this.fb.group({
    id: ['', Validators.required],
    title: ['', Validators.required],
    genres: this.fb.array([this.fb.control('', Validators.required)]),
    type: ['', Validators.required],
    poster: [null, Validators.required], 
    background: [null, Validators.required],
    sources: this.fb.array([
        this.fb.group({
            episode: [null, Validators.required],
            url: ['', Validators.required]
        })
    ])
  });

  // Getter để truy cập FormArray dễ dàng trong template
  get genres(): FormArray {
    return this.movieForm.get('genres') as FormArray;
  }

  get sources(): FormArray {
    return this.movieForm.get('sources') as FormArray;
  }

  // Các phương thức thêm/xóa
  addGenre(): void {
    this.genres.push(this.fb.control('', Validators.required));
  }

  removeGenre(i: number): void {
    this.genres.removeAt(i);
  }

  addSource(): void {
    this.sources.push(this.fb.group({
      episode: [null, Validators.required],
      url: ['', Validators.required]
    }));
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

  onSubmit(): void {
    if (this.movieForm.valid) {
      console.log('Dữ liệu form:', this.movieForm.value);
      // Khi gửi form, bạn sẽ có các đối tượng File trong movieForm.value
      // Bạn cần gửi các file này lên server thông qua FormData
      const formData = new FormData();
      // formData.append('id', this.movieForm.get('id').value);
      // formData.append('title', this.movieForm.get('title').value);
      // ... thêm các trường khác

      // Thêm các đối tượng File vào FormData
      // formData.append('poster', this.movieForm.get('poster').value);
      // formData.append('background', this.movieForm.get('background').value);
      
      // Xử lý gửi FormData đến API
      // Ví dụ: this.http.post('your-api-url', formData).subscribe(...)
    }
  }
}
