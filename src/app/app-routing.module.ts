import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdressenComponent } from './components/verwaltung/adressen/adressen.component';
import { ParameterComponent } from './components/verwaltung/parameter/parameter.component';
import { AnlaesseComponent } from './components/verwaltung/anlaesse/anlaesse.component';
import { AuthGuard } from './service';
import { ListComponent } from './components/users/list/list.component';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';


@NgModule({
  imports: [RouterModule.forRoot([
    {
    path: '', component: AppLayoutComponent,
    children: [
      { path: '', component: DashboardComponent},
      { path: 'verwaltung/adressen', component: AdressenComponent, canActivate: [AuthGuard], data: {role: 'user'} },
      { path: 'verwaltung/anlaesse', component: AnlaesseComponent, canActivate: [AuthGuard], data: {role: 'user'} },
      { path: 'verwaltung/parameter', component: ParameterComponent, canActivate: [AuthGuard], data: {role: 'user'} },
      { path: 'users', component: ListComponent, canActivate: [AuthGuard], data: {role: 'admin'} },
      { path: 'account', 
        children: [
          { path: 'login', component: LoginComponent },
          { path: 'register', component: RegisterComponent, canActivate: [AuthGuard], data: {role: 'admin'} }

      ] },
    ]
  }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
