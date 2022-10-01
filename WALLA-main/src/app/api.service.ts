import { Injectable } from '@angular/core';

//import HttpClient สำหรับ เชือมต่อ URL API ภายนอก
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //กำหนด URL API ที่ต้องการดึงข้อมูล
  URL_API = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  //สร้าง function สำหรับเรียกดูข้อมูลทั้งหมด
  findAll(url: any) {
    let token = localStorage.getItem('accessToken')
    return this.http.get<any>(`${this.URL_API}${url}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    });
  }

  //สร้าง function สำหรับเรียกดูข้อมูลครั้งละ 1 รายการ
  findOne(id: number) {
    return this.http.get<any>(`${this.URL_API}?id=${id}`);
  }

  //สร้าง function สำหรับบันทึกข้อมูล
  create(url: any, data: {}) {
    let token = localStorage.getItem('accessToken')
    return this.http.post<any>(`${this.URL_API}${url}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    });
  }

  update(objData: {}, id: number) {
    return this.http.put(`${this.URL_API}?id=${id}`, objData);
  }

  delete(id: number) {
    return this.http.delete(`${this.URL_API}?id=${id}`);
  }

  //สร้าง function สำหรับ signin signup
  auth(url: any, data: {}) {
    return this.http.post<any>(`${this.URL_API}${url}`, data);
  }

  //สร้าง function สำหรับ signin signup
  me(url: any) {
    let token = localStorage.getItem('accessToken')
    return this.http.get<any>(`${this.URL_API}${url}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    });
  }
}
