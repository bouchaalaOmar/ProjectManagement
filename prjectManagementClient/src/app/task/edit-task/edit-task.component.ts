import {Component, OnInit, Inject} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {TaskService} from "../services/task.service";
import {UserService} from "../../user/services/user.service";
import {Role, User} from "../../_models";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  editForm: FormGroup;
  error = '';
  loading = false;
  submitted = false;
  employees: User[];
  role: string;
  isEmp = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private taskService: TaskService,
              private userService: UserService, private datePipe: DatePipe) {
  }

  ngOnInit() {
    let currentUser = window.localStorage.getItem('currentUser')
    if (!currentUser) {
      this.router.navigate(['login']);
      return;
    }
    this.role = JSON.parse(currentUser).info.roles[0];
    this.isEmp = this.role && this.role == Role.Emp;
    let taskId = window.localStorage.getItem("editTaskId");
    if (!taskId) {
      this.router.navigate(['list-task']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [''],
      numberLogement: [{value: ''} ,Validators.required],
      treatmentDate: ['', Validators.required],
      siteName: ['', Validators.required],
      projectId: [''],
      employeeId: ['', Validators.required],
      sadirahStatus: [''],
      taskStatus: [''],
      lastModifiedDate: [''],
      comment: [''],
      validationDate: [''],
    });
    this.loading = true;

    if(!this.isEmp){
      //TODO RETURNS only USERS WITH ROLE PM
      this.userService.getUsers()
        .subscribe(data => {
          this.employees = data;
          this.loading = false;
        }, error => {
          this.error = error;
          this.loading = false;
          alert(error);
        });
    }

    this.taskService.getTaskById(+taskId)
      .subscribe(data => {
          this.editForm.setValue(data);
          console.log("task info " + data);
          this.loading = false;
        },
        error => {
          this.error = error;
          this.loading = false;
          alert(error);
        });
  }

  get f() {
    return this.editForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    let data = this.editForm.value;
    for (var key in data) {
      if (data.hasOwnProperty(key) && data[key] == null) {
        delete(data[key]);
      }
    }
    this.taskService.updateTask(data)
      .pipe(first())
      .subscribe(
        data => {
          alert('Task updated successfully.');
          if(this.isEmp){
            this.router.navigate(['make-task']);
          }
          else{
            this.router.navigate(['list-task']);
          }

        },
        error => {
          this.error = error;
          this.loading = false;
          alert(error);
        });
  }

  onChangeTaskStatus(){
    let currentDate = new Date();
    //(<FormControl> this.editForm.controls['lastModifiedDate']).setValue("new value");

    this.editForm.patchValue({"lastModifiedDate": this.datePipe.transform(currentDate, 'yyyy-MM-dd')});
  }

}
