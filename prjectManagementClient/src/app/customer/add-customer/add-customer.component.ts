import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CustomerService} from "../services/customer.service";
@Component({
  selector: 'app-add-user',
  templateUrl: './add-customer.component.html'
})
export class AddCustomerComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private customerService: CustomerService,)
  { }

  addForm: FormGroup;
  error = '';
  loading = false;
  submitted = false;

  ngOnInit() {
    if(!window.localStorage.getItem('currentUser')) {
      this.router.navigate(['login']);
      return;
    }
    this.loading = true;

    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      manager: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required]
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
    this.customerService.createCustomer(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['list-customer']);
      },
        error => {
          this.error = error;
          this.loading = false;
          alert(error);
      });
  }

}
