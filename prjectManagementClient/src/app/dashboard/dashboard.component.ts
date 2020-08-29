import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {ProjectService} from "../project";
import {Project} from "../_models/project";
import {UserService} from "../user/services/user.service";
import {User} from "../_models";
import {TaskService} from "../task";
import {Subject} from "rxjs/index";
import {DataTableDirective} from "angular-datatables";
import {Task} from "../_models/task";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private projectService: ProjectService,
              private userService: UserService, private taskService: TaskService) {
  }

  loading = false;
  error = '';
  projects: Project[];
  employees: User[];
  tasks: Task[];
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtAllTaskOptions: DataTables.Settings = {};
  dtAllTaskTrigger: Subject<any> = new Subject();
  filteredTasks = {project: 'All', employee: 'All', taskStatus: 'All'};
  currentFilterdTasks = [];

  ngOnInit(): void {
    if (!window.localStorage.getItem('currentUser')) {
      this.router.navigate(['login']);
      return;
    }
    this.loading = true;
    //load the list of project
    this.projectService.getProjects()
      .subscribe(data => {
        this.projects = data;
        this.loading = false;
      }, error => {
        this.error = error;
        this.loading = false;
        alert(error);
      });

    //load list of employees
    this.userService.getEmployees()
      .subscribe(data => {
        this.employees = data;
        this.loading = false;
      }, error => {
        this.error = error;
        this.loading = false;
        alert(error);
      });

    //load all tasks
    this.taskService.getAllTask()
      .subscribe(data => {
        this.tasks = data;
        this.currentFilterdTasks = this.tasks;
        this.loading = false;
        this.dtAllTaskTrigger.next();
      }, error => {
        this.error = error;
        this.loading = false;
        alert(error);
      });
  }

  onChangeProject(value) {
    console.log(this.tasks);
    this.filteredTasks = {
      project: this.filteredTasks.project, employee: this.filteredTasks.employee,
      taskStatus: this.filteredTasks.taskStatus
    };
    this.doFilterForTasks(this.filteredTasks, this.tasks);
  }

  onChangeEmp(value) {
    console.log(this.tasks);
    this.filteredTasks = {
      project: this.filteredTasks.project, employee: this.filteredTasks.employee,
      taskStatus: this.filteredTasks.taskStatus
    };
    this.doFilterForTasks(this.filteredTasks, this.tasks);
  }

  onChangeStatus(value) {
    console.log(this.tasks);
    this.filteredTasks = {
      project: this.filteredTasks.project, employee: this.filteredTasks.employee,
      taskStatus: this.filteredTasks.taskStatus
    };
    this.doFilterForTasks(this.filteredTasks, this.tasks);
  }

  doFilterForTasks(filters: any, tasks: any): void {
    if(this.isForAllItem(filters)){
      this.currentFilterdTasks = this.tasks; //Reset Task List
      return;
    }
    const keys = Object.keys(filters);
    const filterTask = task => {
      let result = keys.map(key => {
        if (filters[key] !== "All") {
          if (task[key]) {
            if(key == "project" || key == "employee"){
              return task[key].id == filters[key].id
            }
            return String(task[key]).toLowerCase() == (String(filters[key]).toLowerCase())
          }
          else{
            return false
          }
        }
      });
// To Clean Array from undefined if the age is passed so the map will fill the gap with (undefined)
      result = result.filter(it => it !== undefined);

      console.log(JSON.stringify(result))

      return result.reduce((acc, cur: any) => {
        return acc & cur
      }, 1)
    }
    this.currentFilterdTasks = this.tasks.filter(filterTask);
  }

  isForAllItem(filter: any): boolean {
    let i =0;
    for (let field in filter) {
      if (filter[field]) {
        if (filter[field] === 'All') {
          i++;
        }
      }
    }
    if(i == 3)
      return true;
    return false
  }
}
