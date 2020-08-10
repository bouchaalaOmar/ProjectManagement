import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {TaskService} from "../services/task.service";
import {Task} from "../../_models/task";
import {DataTableDirective} from 'angular-datatables';
import {Subject} from "rxjs/index";
import {Project} from "../../_models/project";
import {DatePipe} from "@angular/common";
import {first} from "rxjs/operators";
import {SadirahStatus} from "../../_models/sadirahStatus";
import {TaskStatus} from "../../_models/taskStatus";

@Component({
  selector: 'app-make-task',
  templateUrl: './make-task.component.html',
  styleUrls: ['./make-task.component.sass']
})
export class MakeTaskComponent implements OnInit {

  tasks: Task[];
  error = '';
  loading = false;
  project: Project;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtMakeTaskOptions: DataTables.Settings = {};
  dtMakeTaskTrigger: Subject<any> = new Subject();
  currentUser = null;
  isEditSelected = false;
  message = "";


  constructor(private router: Router, private taskService: TaskService,
              private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.currentUser = window.localStorage.getItem('currentUser');
    if (!this.currentUser) {
      this.router.navigate(['login']);
      return;
    }
    this.currentUser = JSON.parse(this.currentUser);

    this.loading = true;
    this.taskService.getTasks(null, this.currentUser.info.id)
      .subscribe(data => {
        this.tasks = data;
        this.loading = false;
        this.dtMakeTaskTrigger.next();
      }, error => {
        this.error = error;
        this.loading = false;
        alert(error);
      });
  }


  goToTasksdDetails(task: Task): void {
    window.localStorage.removeItem("editTaskId");
    window.localStorage.setItem("editTaskId", task.id.toString());
    this.router.navigate(['edit-task']);
  };

  selectEditTask(task: Task): void {
    this.isEditSelected = true;
  }

  cancelTask(task: Task): void {
    this.isEditSelected = false;
  }

  saveTask(task): void {
    this.isEditSelected = false;
    let taskToEdit = this.simpleClone(task);
    this.editTask(taskToEdit);
  }

  editTask(task) {
    this.loading = true;
    let currentDate = new Date();
    task.lastModifiedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    delete(task["employee"]);
    delete(task["project"]);
    for (var key in task) {
      if (task.hasOwnProperty(key) && task[key] == null) {
        delete(task[key]);
      }
    }
    this.taskService.updateTask(task)
      .pipe(first())
      .subscribe(
        data => {
          alert('Task updated successfully.');
        },
        error => {
          this.error = error;
          this.loading = false;
          alert(error);
        });
  }

  simpleClone(obj: any) {
    return Object.assign({}, obj);
  }
}
