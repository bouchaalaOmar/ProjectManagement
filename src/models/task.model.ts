import {belongsTo, Entity, model, property} from '@loopback/repository';
import {User} from "./user.model";
import {Project, ProjectWithRelations} from "./project.model";

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
        required: false,
        nullable: true
    })
    sadirahStatus: string;

    @property({
        type: 'string',
        required: false,
        nullable: true
    })
    taskStatus: string;
    @property({
        type: 'string',
        required: false,
        nullable: true
    })
    lastModifiedDate: string;
    @property({
        type: 'string',
        required: false,
        nullable: true
    })
    comment: string;
    @property({
        type: 'string',
        required: false,
        nullable: true
    })
    validationDate: string;
    @property({
        type: 'boolean',
        required: false,
        nullable: true
    })
    APD: string;
    @property({
        type: 'boolean',
        required: false,
        nullable: true
    })
    DOE: string;
    @property({
        type: 'boolean',
        required: false,
        nullable: true
    })
    Modelisation : string;
    @property({
        type: 'string',
        required: false,
        nullable: true
    })
    PDS: string;
    @property({
        type: 'string',
        required: false,
        nullable: true
    })
    SRO: string;

    @belongsTo(() => Project, {name: 'project'})
    projectId: number;

    @belongsTo(() => User, {name: 'employee'})
    employeeId: number;

    // Define well-known properties here

    // Indexer property to allow additional data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [prop: string]: any;
    constructor(data?: Partial<Task>) {
        super(data);
    }
}

export interface TaskRelations {
    // describe navigational properties here
    project?: ProjectWithRelations;
}

export type TaskWithRelations = Task & TaskRelations;
