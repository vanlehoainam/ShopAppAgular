import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface SanPham {
  maSP: number;
  ten_SP: string;
  gia: number;
  anh_SP: string;
  soLuong: number;
  moTa: string;
  ghiChu?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  spList: SanPham[] = [];
  createForm!: FormGroup;
  editForm!: FormGroup;
  editingProductId: number | null = null;
  showForm = false;

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllSP();

  }


  getAllSP() {
    this.http.get<SanPham[]>("https://localhost:8080/api/SanPham/GetAll").subscribe(
      (res) => {
        this.spList = res;
      },
      (error) => {
        console.error('Đã xảy ra lỗi:', error);
      }
    );
  }

}
