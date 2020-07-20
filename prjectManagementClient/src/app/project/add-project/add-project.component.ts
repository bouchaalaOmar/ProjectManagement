import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ProjectService} from "../services/project.service";
import {Project} from "../../_models/project";
import {User} from "../../_models";
import {UserService} from "../../user/services/user.service";
import {Customer} from "../../_models/customer";
import {CustomerService} from "../../customer";
@Component({
  selector: 'app-add-user',
  templateUrl: './add-project.component.html'
})
export class AddProjectComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private projectService: ProjectService,
              private userService: UserService, private customerService: CustomerService) { }

  addForm: FormGroup;
  error = '';
  loading = false;
  submitted = false;
  users: User[];
  customers: Customer[];
  ngOnInit() {
    if(!window.localStorage.getItem('currentUser')) {
      this.router.navigate(['login']);
      return;
    }
    this.loading = true;

    //TODO RETURNS only USERS WITH ROLE PM
    this.userService.getUsers()
      .subscribe( data => {
        this.users =  data;
        this.loading = false;
      },error => {
        this.error = error;
        this.loading = false;
        alert(error);
      });

    this.customerService.getCustomers()
      .subscribe( data => {
        this.customers =  data;
        this.loading = false;
      },error => {
        this.error = error;
        this.loading = false;
        alert(error);
      });

    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      customerId: ['', Validators.required],
      projectManagerId: ['', Validators.required]
    });
  }

  get f() { return this.addForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
    }
    this.loading = true;
    this.projectService.createProject(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['list-project']);
      },
        error => {
          this.error = error;
          this.loading = false;
          alert(error);
      });
  }

}
