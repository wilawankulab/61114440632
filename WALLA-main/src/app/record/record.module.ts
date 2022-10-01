import { ExpensePageModule } from './../expense/expense.module';
import { IncomePageModule } from './../income/income.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordPageRoutingModule } from './Record-routing.module';

import { RecordPage } from './record.page';

import { SuperTabsModule} from '@ionic-super-tabs/angular'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordPageRoutingModule,
    SuperTabsModule,
    IncomePageModule,
    ExpensePageModule
  ],
  declarations: [RecordPage]
})
export class RecordPageModule {}
