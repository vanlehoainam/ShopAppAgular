import { Component, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  registerObj: any = {
    fullname: "",
    username: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    confirmPassword: ""
  };
  router = inject(Router);

  constructor(private http: HttpClient) { }

  onRegister() {
    if (this.registerObj.password !== this.registerObj.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const url = 'https://localhost:8080/api/User/Create';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<any>(url, this.registerObj, { headers }).subscribe(
      (res: any) => {
        if (res.data) {
          alert("Registration success!");
          this.router.navigate(['/login']);
        } else {
          alert(res.message);
        }
      },
      (error) => {
        alert("Registration failed: " + error.message);
      }
    );
  }
}