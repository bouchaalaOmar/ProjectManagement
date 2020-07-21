import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ProjectService} from "../services/project.service";
import {Project} from "../../_models/project";
import {DataTableDirective} from 'angular-datatables';
import {Subject} from "rxjs/index";

@Component({
  selector: 'app-pm-project',
  templateUrl: './pm-project.component.html',
  styleUrls: ['./pm-project.component.sass']
})
export class PmProjectComponent implements OnInit {

  projects: Project[];
  error = '';
  loading = false;
  currentUser = null;


  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtPmProjectOptions: DataTables.Settings = {};
  dtPmProjectTrigger: Subject<any> = new Subject();

  constructor(private router: Router, private projectService: ProjectService) {
  }

  ngOnInit() {
    this.currentUser = window.localStorage.getItem('currentUser');
    if (!this.currentUser) {
      this.router.navigate(['login']);
      return;
    }

    this.currentUser = JSON.parse(this.currentUser);

    this.loading = true;
    this.projectService.getProjectsByProjectManager(this.currentUser.info.id)
      .subscribe(data => {
        this.projects = data;
        this.loading = false;
        this.dtPmProjectTrigger.next();
      }, error => {
        this.error = error;
        this.loading = false;
        alert(error);
      });
  }

}
