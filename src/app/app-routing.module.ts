import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UserComponent } from './pages/user/user.component';
import { adminGuard } from './guards/admin.guard';
import { userGuard } from './guards/user.guard';

const routes: Routes = [
  { path : '', component : HomeComponent, pathMatch : 'full' },

  { path : 'signup', component : SignupComponent, pathMatch : 'full' },

  { path : 'login', component : LoginComponent, pathMatch : 'full' },

  {
    path:'admin',
    component:AdminComponent,
    pathMatch:'full',
    canActivate:[adminGuard]
  },
  {
    path:'user-dashboard',
    component:UserComponent,
    pathMatch:'full',
    canActivate:[userGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
