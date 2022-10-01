import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecordinPage } from './recordin.page';

const routes: Routes = [
  {
    path: '',
    component: RecordinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordinPageRoutingModule {}
