import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "../services/task.service";
import {UserService} from "../../user/services/user.service";
import {User} from "../../_models";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html'
})
export class AddTaskComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private route: ActivatedRoute,
              private taskService: TaskService, private userService: UserService)
  { }

  addForm: FormGroup;
  error = '';
  loading = false;
  submitted = false;
  employees: User[];
  ngOnInit() {
    if(!window.localStorage.getItem('currentUser')) {
      this.router.navigate(['login']);
      return;
    }
    this.loading = true;

    //TODO RETURNS only USERS WITH ROLE Emp
    this.userService.getUsers()
      .subscribe( data => {
        this.employees =  data;
        this.loading = false;
      },error => {
        this.error = error;
        this.loading = false;
        alert(error);
      });
    let projectId = this.route.snapshot.paramMap.get('projectId');
    this.addForm = this.formBuilder.group({
      numberLogement: ['', Validators.required],
      treatmentDate: ['', Validators.required],
      siteName: ['', Validators.required],
      projectId	: [parseInt(projectId)],
      employeeId: ['', Validators.required],
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
    this.taskService.createTask(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['list-task']);
      },
        error => {
          this.error = error;
          this.loading = false;
          alert(error);
      });
  }

}
