import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  spList: any[] = [];

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllSP();

  }


  getAllSP() {
    this.http.get("https://localhost:8080/api/SanPham/GetAll").subscribe(
      (res: any) => {
        this.spList = res.$values.map((product: any) => {
          if (product.anh_SP) {
            product.anh_SP = 'https://localhost:8080/data/images' + product.anh_SP.split('\\').pop();
          }
          return product;
        });
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );
  }
}