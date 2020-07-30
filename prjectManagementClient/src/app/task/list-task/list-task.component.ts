import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "../services/task.service";
import {Task} from "../../_models/task";
import { DataTableDirective } from 'angular-datatables';
import {Subject} from "rxjs/index";
import {Project} from "../../_models/project";
import {TaskStatus} from "../../_models/taskStatus";
import {first} from "rxjs/operators";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.sass']
})
export class ListTaskComponent implements OnInit {

  tasks: Task[];
  error = '';
  loading = false;
  project: Project;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTaskOptions: DataTables.Settings = {};
  dtTaskTrigger: Subject<any> = new Subject();

  constructor(private router: Router, private taskService: TaskService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    if(!window.localStorage.getItem('currentUser')) {
      this.router.navigate(['login']);
      return;
    }
    this.loading = true;
    this.project= JSON.parse(window.localStorage.getItem("selectedProjectId"));
    this.taskService.getTasks(this.project.id, null)
      .subscribe( data => {
        this.tasks =  data;
        this.loading = false;
        this.dtTaskTrigger.next();
        },error => {
          this.error = error;
          this.loading = false;
          alert(error);
        });
  }

  deleteTask(task: Task): void {
    this.loading = true;
    this.taskService.deleteTask(task.id)
      .subscribe( data => {
        this.tasks = this.tasks.filter(u => u !== task);
        this.loading = false;

      },error => {
        this.error = error;
        this.loading = false;
        alert(error);
      });
  };

  editTask(task: Task): void {
    window.localStorage.removeItem("editTaskId");
    window.localStorage.setItem("editTaskId", task.id.toString());
    this.router.navigate(['edit-task']);
  };

  addTask(): void {
    this.router.navigate(['add-task', { projectId: this.project.id}]);
  };

  validateTask(task: Task): void{
    this.loading = true;
    let taskToValidate = new Task();
    taskToValidate.id = task.id;
    taskToValidate.numberLogement = task.numberLogement;
    taskToValidate.treatmentDate = task.treatmentDate;
    taskToValidate.siteName = task.siteName;
    if(task.sadirahStatus != null){taskToValidate.sadirahStatus = task.sadirahStatus;}
    taskToValidate.employeeId = task.employeeId;
    taskToValidate.taskStatus = TaskStatus.VALIDATED;
    if(task.lastModifiedDate != null){taskToValidate.lastModifiedDate = task.lastModifiedDate;}
    if(task.comment){taskToValidate.comment = task.comment;}
    let currentDate = new Date();
    taskToValidate.validationDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    taskToValidate.taskStatus = TaskStatus.VALIDATED;
    taskToValidate.projectId = task.projectId;
    this.taskService.updateTask(taskToValidate)
      .pipe(first())
      .subscribe(
        data => {
          alert('Task updated successfully.');
          this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
            this.router.navigate(['list-task']);
          });

        },
        error => {
          this.error = error;
          this.loading = false;
          alert(error);
        });
  }
}
