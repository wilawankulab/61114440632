import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
})
export class IncomePage implements OnInit {

  date: string;
  payee: string;
  amount: number;
  category: string;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
  }

  setValue() {
    console.log({
      date: this.date,
      payee: this.payee,
      amount: this.amount,
      category: this.category

    })

    // เรียก function findAll จาก apiService 
    this.apiService.create('/transaction', {
      "date": this.date,
      "payee": this.payee,
      "amount": this.amount,
      "category": this.category,
      "type": "income"
    }).subscribe((res) => {
      console.log('result', res)
      if (res.code === 200) {
        this.router.navigate(['/tabs/tab1']).then(() => window.location.reload())
      }

    });
  }

}
