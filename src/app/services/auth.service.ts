import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router'; // Import Router để chuyển hướng trong AuthGuard nếu cần

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  // BehaviorSubject sẽ lưu trữ giá trị username hiện tại và phát ra khi nó thay đổi.
  // Khởi tạo nó với giá trị hiện tại từ localStorage hoặc null.
  private _usernameSubject: BehaviorSubject<string | null>;
  public username$: Observable<string | null>; // Observable mà các component sẽ subscribe

  // Lưu trữ các subscription để hủy khi service bị hủy
  private subscriptions: Subscription = new Subscription();

  constructor(private router: Router) { // Inject Router nếu AuthGuard dùng AuthService
    const initialUsername = localStorage.getItem('username');
    this._usernameSubject = new BehaviorSubject<string | null>(initialUsername);

    this.username$ = this._usernameSubject.asObservable().pipe(
      distinctUntilChanged() // Chỉ phát ra giá trị nếu nó thực sự thay đổi
    );

    // Lắng nghe sự kiện 'storage' của window để đồng bộ hóa các tab/cửa sổ khác
    // Sử dụng bind(this) để đảm bảo 'this' trong handleStorageChange là AuthService instance
    this.subscriptions.add(
      new Observable<StorageEvent>(observer => {
        const handler = (event: StorageEvent) => observer.next(event);
        window.addEventListener('storage', handler);
        return () => window.removeEventListener('storage', handler);
      }).subscribe(this.handleStorageChange.bind(this))
    );
  }

  // Phương thức để cập nhật username trong localStorage và thông báo qua Subject
  setUsername(username: string | null): void {
    if (username) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username'); // Xóa username nếu là null
    }
    this._usernameSubject.next(username); // Phát ra giá trị mới cho các subscriber
  }

  // Lấy username hiện tại một cách tức thời (không thông qua Observable)
  getCurrentUsername(): string | null {
    return this._usernameSubject.getValue();
  }

  // Kiểm tra trạng thái đăng nhập
  isLoggedIn(): boolean {
    // Có thể thêm logic kiểm tra token hết hạn ở đây
    return !!this.getCurrentUsername(); // Trả về true nếu có username
  }

  // Xử lý sự kiện storage (khi localStorage thay đổi từ tab/cửa sổ khác)
  private handleStorageChange(event: StorageEvent): void {
    if (event.key === 'username') {
      // Cập nhật Subject với giá trị mới từ localStorage (hoặc null nếu bị xóa)
      this._usernameSubject.next(event.newValue);
    }
  }

  // Hủy tất cả các subscription khi service bị hủy
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}