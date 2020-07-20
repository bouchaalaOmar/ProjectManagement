import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {CustomerService} from "../services/customer.service";
import {Customer} from "../../_models/customer";
import { DataTableDirective } from 'angular-datatables';
import {Subject} from "rxjs/index";

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.sass']
})
export class ListCustomerComponent implements OnInit {

  customers: Customer[];
  error = '';
  loading = false;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtCustomerOptions: DataTables.Settings = {};
  dtCustomerTrigger: Subject<any> = new Subject();

  constructor(private router: Router, private customerService: CustomerService) { }

  ngOnInit() {
    if(!window.localStorage.getItem('currentUser')) {
      this.router.navigate(['login']);
      return;
    }
    this.loading = true;
    this.customerService.getCustomers()
      .subscribe( data => {
        this.customers =  data;
        this.loading = false;
        this.dtCustomerTrigger.next();
        },error => {
          this.error = error;
          this.loading = false;
          alert(error);
        });
  }

  deleteCustomer(customer: Customer): void {
    this.loading = true;
    this.customerService.deleteCustomer(customer.id)
      .subscribe( data => {
        this.customers = this.customers.filter(u => u !== customer);
        this.loading = false;

      },error => {
        this.error = error;
        this.loading = false;
        alert(error);
      });
  };

  editCustomer(customer: Customer): void {
    window.localStorage.removeItem("editCustomerId");
    window.localStorage.setItem("editCustomerId", customer.id.toString());
    this.router.navigate(['edit-customer']);
  };

  addCustomer(): void {
    this.router.navigate(['add-customer']);
  };
}
