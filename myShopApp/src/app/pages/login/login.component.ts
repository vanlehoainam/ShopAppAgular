import { Component, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  logiObj: any = {
    emailorusername: "",
    password: ""
  };
  router = inject(Router);

  constructor(private http: HttpClient) { }

  onLogin() {
    // Gửi yêu cầu POST đến URL API
    const url = `https://localhost:8080/api/User/login?emailorusername=${encodeURIComponent(this.logiObj.emailorusername)}&password=${encodeURIComponent(this.logiObj.password)}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<any>(url, this.logiObj).subscribe((res: any) => {
      console.log('API response:', res);
      if (res && res.data) {

        //alert("Login success!");
        localStorage.setItem("token", res.data.token);
        //this.router.navigate(['/dashboard']);
        switch (res.data.role) {
          case 'nhanvien':
            alert("Đăng nhập thành công với vai trò Nhân Viên.");
            this.router.navigate(['/dashboard']);
            break;
          case 'khachhang':
            alert("Đăng nhập thành công với vai trò Khách Hàng.");
            this.router.navigate(['/home']);
            break;
          default:
            alert("Đăng nhập thành công.");
            this.router.navigate(['/dashboard']);
        }
      } else {
        alert(res.message);
      }
    }, (error) => {
      alert("Login failed: " + error.message);
    });
  }
}

