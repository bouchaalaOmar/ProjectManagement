import { Role } from "./role";

export class User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    roles: Role[];
    registrationNumber: string;
    cin: string;
    gender: string;
    phone: string;
    address: string;
    dateOfBirth: string;
    dateOfHire: string;
    placeOfBirth: string;
    token?: string;
}
