import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {User} from "./user.model";
import {UserWithRelations} from "@loopback/authentication-jwt";
import {Task} from "./task.model";
import {Customer} from "./customer.model";

@model()
export class Project extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
    })
    id?: number;

    @property({
        type: 'string',
        required: true,
    })
    name: string;

    @property({
        type: 'string',
        required: true,
    })
    description: string;

    @property({
        type: 'string',
        required: true,
    })
    startDate: string;

    @belongsTo(() => Customer, {name: 'customer'})
    customerId: number;

    @belongsTo(() => User, {name: 'manager'})
    projectManagerId: number;

    @hasMany(() => Task, {keyTo: 'taskId'})
    tasks: Task[];

    constructor(data?: Partial<Project>) {
        super(data);
    }
}

export interface ProjectRelations {
    user?: UserWithRelations;

}

export type ProjectWithRelations = Project & ProjectRelations;
