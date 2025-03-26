import { Routes } from '@angular/router';
import { CredentiaComponent } from './credentia.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const credentiaRoutes: Routes = [
  { path: 'auth', component: CredentiaComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'login', component: LoginComponent}
];
