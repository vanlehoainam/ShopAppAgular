import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userList: any[] = [];
  createForm!: FormGroup;
  editForm!: FormGroup;
  editingUserId: number | null = null;
  showForm = false;

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllUser();
    this.initializeForms();
  }

  initializeForms() {
    this.createForm = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.editForm = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', [Validators.minLength(8)]]
    });
  }

  getAllUser() {
    this.http.get("https://localhost:8080/api/User/GetAll").subscribe(
      (res: any) => {
        this.userList = res.$values;
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );
  }

  editUser(user: any) {
    this.editingUserId = user.id;
    this.editForm.patchValue({
      fullName: user.fullName,
      username: user.userName,
      email: user.email,
      role: user.role,
      phone: user.phone,
      password: user.password
    });
    this.showForm = true;
  }

  createUser() {
    if (this.createForm.valid) {
      this.http.post('https://localhost:8080/api/User/Create', this.createForm.value).subscribe(
        () => {
          this.getAllUser();
          this.cancel();
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
    }
  }

  saveUser() {
    if (this.editForm.valid && this.editingUserId !== null) {
      const editFormValue = { ...this.editForm.value };

      this.http.put(`https://localhost:8080/api/User/Update?Id=${this.editingUserId}`, editFormValue).subscribe(
        () => {
          this.getAllUser();
          this.cancel();
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

  showCreateForm() {
    this.editingUserId = null;
    this.showForm = true;
  }

  cancel() {
    this.showForm = false;
    this.editForm.reset();
    this.createForm.reset();
    this.editingUserId = null;
  }
}
