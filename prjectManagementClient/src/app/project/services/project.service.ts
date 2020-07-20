import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Observable} from "rxjs/index";
import {environment} from "../../../environments/environment";
import {Project} from "../../_models/project";


@Injectable({ providedIn: 'root' })
export class ProjectService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Project[]>(`${environment.apiUrl}/projects`);
  }

  getById(id: number) {
    return this.http.get<Project>(`${environment.apiUrl}/projects/${id}`);
  }


  getProjects() : Observable<Project[]> {
    return this.http.get<Project[]>(`${environment.apiUrl}/projects`);
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${environment.apiUrl}/projects/${id}`);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${environment.apiUrl}/projects`, project);
  }

  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(`${environment.apiUrl}/projects/${project.id}`, project);
  }

  deleteProject(id: number): Observable<Project> {
    return this.http.delete<Project>(`${environment.apiUrl}/projects/${id}`);
  }
}
