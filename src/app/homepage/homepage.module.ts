import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageRoutingModule } from "./homepage-routing.module";
import { HomepageComponent } from './homepage.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HeaderComponent } from "./header/header.component";
import { MatIconModule } from "@angular/material/icon";
import { ProductsComponent } from "./products/products.component";

@NgModule({
  declarations: [
    HeaderComponent,
    DashboardComponent,
    ProductsComponent,
    HomepageComponent
  ],
  imports: [
    MatIconModule,
    CommonModule,
    HomepageRoutingModule,
  ],
  exports: [
    MatIconModule
  ]
})
export class HomepageModule { }
