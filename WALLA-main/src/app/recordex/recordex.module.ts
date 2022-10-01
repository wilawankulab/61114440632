import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordexPageRoutingModule } from './recordex-routing.module';

import { RecordexPage } from './recordex.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordexPageRoutingModule
  ],
  declarations: [RecordexPage]
})
export class RecordexPageModule {}
