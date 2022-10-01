import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordinPageRoutingModule } from './recordin-routing.module';

import { RecordinPage } from './recordin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordinPageRoutingModule
  ],
  declarations: [RecordinPage]
})
export class RecordinPageModule {}
