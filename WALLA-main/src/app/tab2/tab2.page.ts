import { Component, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { ApiService } from './../api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  public chart: any;

  datas: Array<{ string: any }> = [];
  balanceIncome: any = 0;
  balanceExpense: any = 0;
  data: any = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getData();
  }

  createChart(income: any, expense: any) {
    this.chart = new Chart('MyChart', {
      type: 'doughnut', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: ['รายรับ', 'รายจ่าย'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [income, expense],
            backgroundColor: ['rgb(50,205,50)', 'rgb(255, 99, 132)'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 1.3,
      },
    });
  }

  async getData() {
    // เรียก function findAll จาก apiService
    await this.apiService
      .findAll('/transaction?perMount=true&income=true')
      .subscribe((res) => {
        //นำข้อมูลที่ได้เก็บไว้ที่ตัวแปร employees
        this.balanceIncome = Number(res.totalAmount || 0);
        this.data[0] = Number(res.totalAmount || 0);
        console.log(this.balanceIncome);
      });

    // เรียก function findAll จาก apiService
    await this.apiService
      .findAll('/transaction?perMount=true&expense=true')
      .subscribe((res) => {
        //นำข้อมูลที่ได้เก็บไว้ที่ตัวแปร employees
        this.balanceExpense = Number(-res.totalAmount || 0);
        this.data[1] = Number(res.totalAmount || 0);
        console.log(this.balanceExpense);
      });

    // เรียก function findAll จาก apiService
    await this.apiService
      .findAll('/transaction?perMount=true')
      .subscribe((res) => {
        //นำข้อมูลที่ได้เก็บไว้ที่ตัวแปร employees
        this.datas = res.message;
        console.log(res.message);

        this.createChart(this.balanceIncome, this.balanceExpense);
      });
  }
}
