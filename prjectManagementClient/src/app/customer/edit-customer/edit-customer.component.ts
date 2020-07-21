import {Component, OnInit, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {CustomerService} from "../services/customer.service";



@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.sass']
})
export class EditCustomerComponent implements OnInit {

  editForm: FormGroup;
  error = '';
  loading = false;
  submitted = false;


  constructor(private formBuilder: FormBuilder, private router: Router, private customerService: CustomerService) {
  }

  ngOnInit() {
    if(!window.localStorage.getItem('currentUser')) {
      this.router.navigate(['login']);
      return;
    }
    let customerId = window.localStorage.getItem("editCustomerId");
    if (!customerId) {
      this.router.navigate(['list-customer']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      manager: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.loading = true;
    this.customerService.getCustomerById(+customerId)
      .subscribe(data => {
          this.editForm.setValue(data);
          console.log("client info "+data);
          this.loading = false;
        },
        error => {
          this.error = error;
          this.loading = false;
          alert(error);
        });
  }
  get f() { return this.editForm.controls; }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.customerService.updateCustomer(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          alert('Customer updated successfully.');
          this.router.navigate(['list-customer']);
        },
        error => {
          this.error = error;
          this.loading = false;
          alert(error);
        });
  }

}
