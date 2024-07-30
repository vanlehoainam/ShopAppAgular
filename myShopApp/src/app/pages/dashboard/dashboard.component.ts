// import { JsonPipe } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component, inject, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   //standalone:true,
//   //imports: [JsonPipe],
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent implements OnInit {

//   http = inject(HttpClient);
//   userList: any[] = [];

//   ngOnInit(): void {
//     this.getAllUser();
//   }

//   getAllUser() {
//     this.http.get("https://localhost:8080/api/User/GetAll").subscribe((Res: any) => {
//       this.userList = Res.data;
//     })
//   }
// }
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; // New imports

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
<<<<<<< HEAD
  // standalone:true,
  // imports: [JsonPipe],
=======
  //standalone:true,
  //imports: [JsonPipe],
>>>>>>> f2353261042e40421b9a036a0ee91cfd4e4173db
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  http = inject(HttpClient);
<<<<<<< HEAD
  fb = inject(FormBuilder); // New: Inject FormBuilder

  userList: any[] = [];
  editForm: FormGroup; // New: Form group for editing user details
  editingUserId: number | null = null; // New: Track which user is being edited
=======
  userList: any[] = [];
>>>>>>> f2353261042e40421b9a036a0ee91cfd4e4173db

  ngOnInit(): void {
    this.getAllUser();
    // New: Initialize the form group
    this.editForm = this.fb.group({
      fullName: [''],
      username: [''],
      email: [''],
      phone: ['']
    });
  }

  getAllUser() {
    this.http.get("https://localhost:8080/api/User/GetAll").subscribe((Res: any) => {
      this.userList = Res.data;
<<<<<<< HEAD
    });
  }

  // New: Method to start editing a user
  editUser(user: any) {
    this.editingUserId = user.id;
    this.editForm.patchValue({
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      phone: user.phone
    });
  }

  // New: Method to save the edited user details
  saveUser() {
    if (this.editingUserId !== null) {
      this.http.put(`https://localhost:8080/api/User/Update/${this.editingUserId}`, this.editForm.value).subscribe(() => {
        this.getAllUser();
        this.editingUserId = null; // Reset editing state
      });
    }
  }

  // New: Method to delete a user
  deleteUser(id: number) {
    this.http.delete(`https://localhost:8080/api/User/Delete/${id}`).subscribe(() => {
      this.getAllUser();
    });
=======
    })
>>>>>>> f2353261042e40421b9a036a0ee91cfd4e4173db
  }
}

