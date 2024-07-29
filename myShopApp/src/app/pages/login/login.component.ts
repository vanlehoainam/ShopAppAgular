import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

    this.http.post<any>(url, this.logiObj).subscribe((res: any) => {
      if (res.result) {
        alert("Login success!");
        localStorage.setItem("token", res.data.token);
        this.router.navigate(['/dashboard']);
      } else {
        alert(res.message);
      }
    }, (error) => {
      alert("Login failed: " + error.message);
    });
  }
}