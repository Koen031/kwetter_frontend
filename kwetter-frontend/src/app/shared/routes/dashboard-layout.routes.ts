import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer
export const Dashboard_ROUTES: Routes = [
  {
    path: '',
    loadChildren: './pages/dashboard/dashboard.module#DashboardModule'
  }
];