import { ExpensePage } from './../expense/expense.page';
import { IncomePage } from './../income/income.page';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-record',
  templateUrl: './record.page.html',
  styleUrls: ['./record.page.scss'],
})
export class RecordPage {
  incomePage = IncomePage;
  expensePage = ExpensePage;

  constructor() { }

}
