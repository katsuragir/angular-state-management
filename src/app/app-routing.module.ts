import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './root/root.component';
import { ItemsViewComponent } from './items-view/items-view.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';


const routes: Routes = [
  {
    path: '',
    component: RootComponent
  },
  {
    path: 'product/list',
    component: ItemsViewComponent
  },
  {
    path: 'product/detail/:id',
    component: ItemDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
