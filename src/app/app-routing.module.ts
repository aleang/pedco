import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountriesComponent } from './countries/countries.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlogComponent } from './blog/blog.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { PhotoComponent } from './photo/photo.component';

const routes: Routes = [
  { path: 'map', component: CountriesComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'photo', component:PhotoComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
