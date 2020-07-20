import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {UserCredentials} from './user-credentials.model';
import {Project} from "./project.model";
import {Task} from "./task.model";

@model()
export class User extends Entity {

    @property({
        type: 'number',
        generated: true,
        id: true,
    })
    id?: number;

    @property({
        type: 'string',
        required: true,
        index: {
            unique: true
        }
    })
    email: string;

    @property({
        type: 'string',
        required: true,
        index: {
            unique: true
        }
    })
    registrationNumber: string;

    @property({
        type: 'string',
        required: true,
        index: {
            unique: true
        }
    })
    cin: string;

    @property({
        type: 'string',
    })
    firstName?: string;

    @property({
        type: 'string',
    })
    lastName?: string;

    @property({
        type: 'string',
        required: true,
    })
    gender: string;

    @property({
        type: 'string',
        required: true,
        index: {
            unique: true
        }
    })
    phone: string;

    @property({
        type: 'string',
        required: true,
    })
    address: string;

    @property({
        type: 'string',
        required: true,
    })
    dateOfBirth: string;

    @property({
        type: 'string',
        required: true,
    })
    dateOfHire: string;

    @property({
        type: 'string',
        required: true,
    })
    placeOfBirth: string;


    @hasOne(() => UserCredentials)
    userCredentials: UserCredentials;

    @hasMany(() => Project, {keyTo: 'projectManagerId'})
    projects: Project[];

    @hasMany(() => Task, {keyTo: 'employeeId'})
    tasks: Task[];


    @property({
        type: 'array',
        itemType: 'string',
    })
    roles?: string[];

    constructor(data?: Partial<User>) {
        super(data);
    }
}