import {TaskStatus} from "./taskStatus";
import {SadirahStatus} from "./sadirahStatus";

export class Task {
  id: number;
  numberLogement: number;
  treatmentDate: string;
  siteName: string;
  sadirahStatus: SadirahStatus;
  taskStatus: TaskStatus;
  projectId	: number;
  employeeId: number;
  lastModifiedDate: string;
  comment: string;
  validationDate: string;
}
