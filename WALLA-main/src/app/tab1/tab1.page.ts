import { Component } from '@angular/core';
import { ApiService } from './../api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  //สร้างตัวแปรสำหรับเก็บข้อมูลที่ดึงมาจาก API
  datas: Array<{ string: any }> = [];
  balanceIncome: number;
  balanceExpense: number;

  //ใน constructor กำหนด ให้ apiService เป็นตัวแปรแบบ private และ เรียกใช้งาน ApiService
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    //เรียก function getData เมื่อ App เริ่มทำงาน
    this.getData();
  }

  getData() {
    // เรียก function findAll จาก apiService
    this.apiService.findAll('/transaction?perMount=true').subscribe((res) => {
      //นำข้อมูลที่ได้เก็บไว้ที่ตัวแปร employees
      this.datas = res.message;
      console.log(res.message);
    });

    // เรียก function findAll จาก apiService
    this.apiService
      .findAll('/transaction?perMount=true&income=true')
      .subscribe((res) => {
        //นำข้อมูลที่ได้เก็บไว้ที่ตัวแปร employees
        this.balanceIncome = Number(res.totalAmount || 0);
        console.log(this.balanceIncome);
      });

    // เรียก function findAll จาก apiService
    this.apiService
      .findAll('/transaction?perMount=true&expense=true')
      .subscribe((res) => {
        //นำข้อมูลที่ได้เก็บไว้ที่ตัวแปร employees
        this.balanceExpense = Number(-res.totalAmount || 0);
        console.log(this.balanceExpense);
      });
  }

  deleteEmployee(id: number) {
    // เรียก function delete จาก apiService ส่งค่า id เพิ่มลบข้อมูล
    this.apiService.delete(id).subscribe((res) => {
      //เรียก function getData เพื่อแสดงข้อมูลล่าสุด
      this.getData();
    });
  }

  formatNumber(num: number) {
    return num
      .toFixed(2)
      .toString()
      .replace(/\B(?<!.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }
}
