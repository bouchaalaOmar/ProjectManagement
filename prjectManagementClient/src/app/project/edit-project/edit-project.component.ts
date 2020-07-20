import {Component, OnInit, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {ProjectService} from "../services/project.service";
import {User} from "../../_models";
import {UserService} from "../../user/services/user.service";
import {CustomerService} from "../../customer";
import {Customer} from "../../_models/customer";


@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.sass']
})
export class EditProjectComponent implements OnInit {

  users: User[];
  customers: Customer[];
  editForm: FormGroup;
  error = '';
  loading = false;
  submitted = false;


  constructor(private formBuilder: FormBuilder, private router: Router, private projectService: ProjectService,
              private userService: UserService, private customerService: CustomerService) {
  }

  ngOnInit() {
    let projectId = window.localStorage.getItem("editProjectId");
    if (!projectId) {
      this.router.navigate(['list-project']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      customerId: ['', Validators.required],
      projectManagerId: ['', Validators.required]
    });
    this.loading = true;
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
      });
    this.projectService.getProjectById(+projectId)
      .subscribe(data => {
          this.editForm.setValue(data);
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
    this.projectService.updateProject(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          alert('Project updated successfully.');
          this.router.navigate(['list-project']);
        },
        error => {
          this.error = error;
          this.loading = false;
          alert(error);
        });
  }

}
