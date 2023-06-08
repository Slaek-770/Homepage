import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProductsComponent } from "./products/products.component";

const routes: Routes = [
  {
    path: 'home',
    component: DashboardComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: '**', // 404
    component: DashboardComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
