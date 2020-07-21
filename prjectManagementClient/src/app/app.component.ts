import {Component, OnInit} from '@angular/core';
import { AuthenticationService } from './_services';
import { User, Role } from './_models';
import {Router} from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent  implements OnInit{
  title = 'prjectManagementClient';
  currentUser: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.info.roles[0] === Role.Admin;
  }

  get isProjectManager() {
    return this.currentUser && this.currentUser.info.roles[0] === Role.Pm;
  }

  get isEmployee() {
    return this.currentUser && this.currentUser.info.roles[0] === Role.Emp;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    if(this.isAdmin){
      this.router.navigate(['/list-user']);
    }else if(this.isProjectManager){
      this.router.navigate(['/pm-project']);
    }
  }
}
