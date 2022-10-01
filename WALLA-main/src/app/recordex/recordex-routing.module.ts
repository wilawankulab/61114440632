import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecordexPage } from './recordex.page';

const routes: Routes = [
  {
    path: '',
    component: RecordexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordexPageRoutingModule {}
