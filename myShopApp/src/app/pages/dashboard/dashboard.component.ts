import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  http = inject(HttpClient);
  fb = inject(FormBuilder);

  userList: any[] = [];
  editForm!: FormGroup;
  editingUserId: number | null = null;

  ngOnInit(): void {
    this.getAllUser();
    this.editForm = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      Role: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  getAllUser() {
    this.http.get("https://localhost:8080/api/User/GetAll").subscribe(
      (res: any) => {
        console.log('Phản hồi API:', res);
        this.userList = res.$values;
        console.log('Danh sách người dùng:', this.userList);
      },
      (error) => {
        console.error('Đã xảy ra lỗi:', error);
      }
    );
  }

  editUser(user: any) {
    this.editingUserId = user.id;
    this.editForm.patchValue({
      fullName: user.fullName,
      username: user.userName,
      email: user.email,
      Role: user.Role,
      phone: user.phone
    });
  }

  saveUser() {
    if (this.editingUserId !== null) {
      this.http.put(`https://localhost:8080/api/User/Update?Id=${this.editingUserId}`, this.editForm.value).subscribe(
        () => {
          this.getAllUser();
          this.editingUserId = null;
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
    }
  }

  deleteUser(id: number) {
    this.http.delete(`https://localhost:8080/api/User/Delete?ID=${id}`).subscribe(
      () => {
        this.getAllUser();
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );
  }
}
