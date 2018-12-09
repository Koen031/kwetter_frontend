import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer
export const User_ROUTES: Routes = [
  {
    path: '',
    loadChildren: './pages/user/index/user.module#UserModule'
  },
];