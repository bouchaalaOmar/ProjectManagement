import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {User} from "../../_models";
import { DataTableDirective } from 'angular-datatables';
import {Subject} from "rxjs/index";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})

export class ListUserComponent implements OnInit {

  users: User[];
  error = '';
  loading = false;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtUserOptions: DataTables.Settings = {};
  dtUserTrigger: Subject<any> = new Subject();


  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    if(!window.localStorage.getItem('currentUser')) {
      this.router.navigate(['login']);
      return;
    }
    this.loading = true;
    this.userService.getUsers()
      .subscribe( data => {
        this.users =  data;
        this.loading = false;
        this.dtUserTrigger.next();
        },error => {
          this.error = error;
          this.loading = false;
          alert(error);
        });
  }


  deleteUser(user: User): void {
    this.loading = true;
    this.userService.deleteUser(user.id)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
        this.loading = false;
      },error => {
        this.error = error;
        this.loading = false;
        alert(error);
      });
  };

  editUser(user: User): void {
    window.localStorage.removeItem("editUserId");
    window.localStorage.setItem("editUserId", user.id.toString());
    this.router.navigate(['edit-user']);
  };

  addUser(): void {
    this.router.navigate(['add-user']);
  };
}
