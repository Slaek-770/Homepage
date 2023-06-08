import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./homepage/dashboard/dashboard.component";
import { BasepageComponent } from "./basepage/basepage.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { BoardComponent } from "./quizpoker/board/board.component";

const routes: Routes = [
  {
    path: '',
    component: BasepageComponent
  },
  {
    path: '~',
    component: HomepageComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule)
      }
    ]
  },
  {
    path: 'quizpoker',
    component: BoardComponent
  },
  {
    path: '**', // 404
    component: DashboardComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
