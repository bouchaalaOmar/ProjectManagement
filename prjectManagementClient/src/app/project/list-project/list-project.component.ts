import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ProjectService} from "../services/project.service";
import {Project} from "../../_models/project";
import { DataTableDirective } from 'angular-datatables';
import {Subject} from "rxjs/index";

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.sass']
})
export class ListProjectComponent implements OnInit {

  projects: Project[];
  error = '';
  loading = false;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtProjectOptions: DataTables.Settings = {};
  dtProjectTrigger: Subject<any> = new Subject();

  constructor(private router: Router, private projectService: ProjectService) { }

  ngOnInit() {
    if(!window.localStorage.getItem('currentUser')) {
      this.router.navigate(['login']);
      return;
    }
    this.loading = true;
    this.projectService.getProjects()
      .subscribe( data => {
        this.projects =  data;
        this.loading = false;
        this.dtProjectTrigger.next();
        },error => {
          this.error = error;
          this.loading = false;
          alert(error);
        });
  }

  deleteProject(project: Project): void {
    this.loading = true;
    this.projectService.deleteProject(project.id)
      .subscribe( data => {
        this.projects = this.projects.filter(u => u !== project);
        this.loading = false;

      },error => {
        this.error = error;
        this.loading = false;
        alert(error);
      });
  };

  editProject(project: Project): void {
    window.localStorage.removeItem("editProjectId");
    window.localStorage.setItem("editProjectId", project.id.toString());
    this.router.navigate(['edit-project']);
  };

  addProject(): void {
    this.router.navigate(['add-project']);
  };
}
