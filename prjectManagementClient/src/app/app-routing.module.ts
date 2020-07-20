import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from "./login";
import {AppComponent} from "./app.component";
import {AuthGuard} from "./_helpers";
import {ListUserComponent} from "./user/list-user/list-user.component";
import {AddUserComponent} from "./user/add-user/add-user.component";
import {EditUserComponent} from "./user/edit-user/edit-user.component";
import {AddProjectComponent} from "./project/add-project/add-project.component";
import {EditProjectComponent} from "./project/edit-project/edit-project.component";
import {ListProjectComponent} from "./project/list-project/list-project.component";
import {AddCustomerComponent} from "./customer";
import {EditCustomerComponent} from "./customer/edit-customer/edit-customer.component";
import {ListCustomerComponent} from "./customer/list-customer/list-customer.component";


const routes: Routes = [
  {path: '', component: AppComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  { path: 'add-user', component: AddUserComponent },
  { path: 'edit-user', component: EditUserComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: 'add-project', component: AddProjectComponent },
  { path: 'edit-project', component: EditProjectComponent },
  { path: 'list-project', component: ListProjectComponent },
  { path: 'add-customer', component: AddCustomerComponent },
  { path: 'edit-customer', component: EditCustomerComponent },
  { path: 'list-customer', component: ListCustomerComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
