import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone:true,
  imports: [JsonPipe],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  http= inject(HttpClient);
  userList:any[]=[];

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser(){
    this.http.get("https://localhost:8080/api/User/GetAll").subscribe((Res:any)=>{
      this.userList=Res.data;
    })
  }
}
