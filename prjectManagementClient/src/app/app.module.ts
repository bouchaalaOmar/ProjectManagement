import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Pipe, PipeTransform} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { DataTablesModule } from 'angular-datatables';

import {AddUserComponent} from "./user/add-user/add-user.component";
import {EditUserComponent} from "./user/edit-user/edit-user.component";
import {ListUserComponent} from "./user/list-user/list-user.component";

import {AddProjectComponent} from "./project/add-project/add-project.component";
import {EditProjectComponent} from "./project/edit-project/edit-project.component";
import {ListProjectComponent} from "./project/list-project/list-project.component";
import {PmProjectComponent} from "./project/pm-project/pm-project.component";

import {AddCustomerComponent} from "./customer/add-customer/add-customer.component";
import {EditCustomerComponent} from "./customer/edit-customer/edit-customer.component";
import {ListCustomerComponent} from "./customer/list-customer/list-customer.component";

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AddTaskComponent, EditTaskComponent, ListTaskComponent} from "./task";
import {DatePipe} from "@angular/common";
import {MakeTaskComponent} from "./task/make-task/make-task.component";
import {BsDatepickerConfig, BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ProfileUserComponent} from "./user/profile-user/profile-user.component";
import {DashboardComponent} from './dashboard/dashboard.component';

// used to create fake backend
// import { fakeBackendProvider } from './_helpers';

export function getDatepickerConfig(): BsDatepickerConfig {
  return Object.assign(new BsDatepickerConfig(), {
    dateInputFormat: 'YYYY-MM-DD'
  });
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddUserComponent,
    EditUserComponent,
    ListUserComponent,
    ProfileUserComponent,
    AddProjectComponent,
    EditProjectComponent,
    ListProjectComponent,
    PmProjectComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    ListCustomerComponent,
    AddTaskComponent,
    EditTaskComponent,
    ListTaskComponent,
    MakeTaskComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    DataTablesModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: BsDatepickerConfig, useFactory: getDatepickerConfig },
    DatePipe

    // provider used to create fake backend
    //fakeBackendProvider

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
