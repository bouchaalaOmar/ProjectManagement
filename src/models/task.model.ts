import {belongsTo, Entity, model, property} from '@loopback/repository';
import {User} from "./user.model";
import {Project, ProjectWithRelations} from "./project.model";
import {UserWithRelations} from "@loopback/authentication-jwt";

@model()
export class Task extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
    })
    id?: number;

    @property({
        type: 'number',
        required: true,
    })
    numberLogement: number;

    @property({
        type: 'string',
        required: true,
    })
    treatmentDate: string;

    @property({
        type: 'string',
        required: true,
    })
    siteName: string;

    @property({
        type: 'string',
        required: true,
    })
    sadirahStatus: string;

    @property({
        type: 'string',
        required: true,
    })
    taskStatus: string;

    @belongsTo(() => Project, {name: 'project'})
    projectId: number;

    @belongsTo(() => User, {name: 'user'})
    employeeId: number;

    constructor(data?: Partial<Task>) {
        super(data);
    }
}

export interface TaskRelations {
    // describe navigational properties here
    project?: ProjectWithRelations;
}

export type TaskWithRelations = Task & TaskRelations;
