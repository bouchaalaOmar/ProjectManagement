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
  constructor(private router: Router, private taskService: TaskService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.currentUser = window.localStorage.getItem('currentUser');
    if(!this.currentUser) {
      this.router.navigate(['login']);
      return;
    }
    this.currentUser = JSON.parse(this.currentUser);

    this.loading = true;
    this.taskService.getTasks(null,this.currentUser.info.id)
      .subscribe( data => {
        this.tasks =  data;
        this.loading = false;
        this.dtMakeTaskTrigger.next();
        },error => {
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


}
