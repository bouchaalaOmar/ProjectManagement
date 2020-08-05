import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.sass']
})
export class AddUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: UserService) { }

  addForm: FormGroup;
  error = '';
  loading = false;
  submitted = false;
  roles: any;

  ngOnInit() {
    if(!window.localStorage.getItem('currentUser')) {
      this.router.navigate(['login']);
      return;
    }
    this.roles = [];
    this.addForm = this.formBuilder.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      roles: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      cin: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      dateOfHire: ['', Validators.required],
      placeOfBirth: ['', Validators.required]
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
    this.addForm.value.password = Math.random().toString(36).slice(-8);
    this.roles.push( this.addForm.value.roles );
    this.addForm.value.roles =  this.roles;
    this.apiService.createUser(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['list-user']);
      },
        error => {
          this.roles = [];
          this.error = error;
          this.loading = false;
          alert(error);
      });
  }

}
