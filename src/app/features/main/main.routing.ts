import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

const children: Routes = [
  { path: '', redirectTo: 'user' },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
];

const routes: Routes = [
  { path: '', component: MainComponent, children: children },
];

export const MainRoutes = RouterModule.forChild(routes);
