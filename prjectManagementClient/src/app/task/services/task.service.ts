import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from "rxjs/index";
import {environment} from "../../../environments/environment";
import {Task} from "../../_models/task";


@Injectable({providedIn: 'root'})
export class TaskService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Task[]>(`${environment.apiUrl}/tasks`);
  }

  getById(id: number) {
    return this.http.get<Task>(`${environment.apiUrl}/tasks/${id}`);
  }


  getTasks(projectId: number, employeeId: number): Observable<Task[]> {
    if (projectId == null) {
      return this.http.get<Task[]>(`${environment.apiUrl}/tasks?filter[include][0][relation]=employee&filter[include][1][relation]=project&filter[where][employeeId]=${employeeId}`);
    }
    else {
      return this.http.get<Task[]>(`${environment.apiUrl}/tasks?filter[include][0][relation]=employee&filter[where][projectId]=${projectId}`);
    }
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${environment.apiUrl}/tasks/${id}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${environment.apiUrl}/tasks`, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${environment.apiUrl}/tasks/${task.id}`, task);
  }

  deleteTask(id: number): Observable<Task> {
    return this.http.delete<Task>(`${environment.apiUrl}/tasks/${id}`);
  }
}
