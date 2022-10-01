import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';


@Component({
  selector: 'app-recordin',
  templateUrl: './recordin.page.html',
  styleUrls: ['./recordin.page.scss'],
})
export class RecordinPage implements OnInit {

  datas: Array<{ string: any }> = [];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getData()
  }

  getData() {

    // เรียก function findAll จาก apiService
    this.apiService.findAll('/transaction?perMount=true').subscribe((res) => {
      //นำข้อมูลที่ได้เก็บไว้ที่ตัวแปร employees
      this.datas = res.message;
      console.log(res)
    });
  }

  formatNumber(num: number) {
    return num.toFixed(2).toString().replace(/\B(?<!.\d*)(?=(\d{3})+(?!\d))/g, ",")
  }

}
