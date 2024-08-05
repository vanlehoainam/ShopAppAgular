import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class AdminComponent implements OnInit {
  productList: any[] = [];
  productForm!: FormGroup;
  editingProductId: number | null = null;

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.initializeForm();
  }

  initializeForm() {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      price: [null, Validators.required],
      img: [''],
      quantity: [null, Validators.required],
      description: [''],
      note: ['']
    });
  }

  getAllProducts() {
    this.http.get("https://localhost:8080/api/Product/GetAll").subscribe(
      (res: any) => {
        this.productList = res.$values.map((product: any) => {
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

  saveProduct() {
    if (this.productForm.valid) {
      if (this.editingProductId) {
        // Update product
        this.http.put(`https://localhost:8080/api/Product/Update?Id=${this.editingProductId}`, this.productForm.value).subscribe(
          () => {
            this.getAllProducts();
            this.resetForm();
          },
          (error) => {
            console.error('Error occurred:', error);
          }
        );
      } else {
        // Add new product
        this.http.post('https://localhost:8080/api/Product/Create', this.productForm.value).subscribe(
          () => {
            this.getAllProducts();
            this.resetForm();
          },
          (error) => {
            console.error('Error occurred:', error);
          }
        );
      }
    }
  }

  editProduct(product: any) {
    this.editingProductId = product.id;
    this.productForm.patchValue(product);
  }

  deleteProduct(id: number) {
    this.http.delete(`https://localhost:8080/api/Product/Delete?ID=${id}`).subscribe(
      () => {
        this.getAllProducts();
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );
  }

  resetForm() {
    this.productForm.reset();
    this.editingProductId = null;
  }
}
