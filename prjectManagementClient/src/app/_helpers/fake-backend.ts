﻿// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { Observable, of, throwError } from 'rxjs';
// import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
//
// import { User, Role } from '../_models';
//
// const users: User[] = [
//     {id: 1, email: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', roles: Role.Admin,
//       address: "sahloul", cin: "112545", dateOfBirth: "05/05/1995", dateOfHire: "05/04/2018", gender:"M",
//       phone: "27021547", placeOfBirth:"tunis", registrationNumber:"12555"},
//     {id: 2, email: 'user', password: 'user', firstName: 'Normal', lastName: 'User', roles: Role.Emp,
//       address: "sahloul", cin: "112545", dateOfBirth: "05/05/1995", dateOfHire: "05/04/2018", gender:"M",
//       phone: "27021547", placeOfBirth:"tunis", registrationNumber:"12555"}
// ];
//
// @Injectable()
// export class FakeBackendInterceptor implements HttpInterceptor {
//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         const { url, method, headers, body } = request;
//
//         // wrap in delayed observable to simulate server api call
//         return of(null)
//             .pipe(mergeMap(handleRoute))
//             .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
//             .pipe(delay(500))
//             .pipe(dematerialize());
//
//         function handleRoute() {
//             switch (true) {
//                 case url.endsWith('/users/authenticate') && method === 'POST':
//                     return authenticate();
//                 case url.endsWith('/users') && method === 'GET':
//                     return getUsers();
//                 case url.match(/\/users\/\d+$/) && method === 'GET':
//                     return getUserById();
//                 default:
//                     // pass through any requests not handled above
//                     return next.handle(request);
//             }
//
//         }
//
//         // route functions
//
//         function authenticate() {
//             const { email, password } = body;
//             const user = users.find(x => x.email === email && x.password === password);
//             if (!user) return error('Username or password is incorrect');
//             return ok({
//                 email: user.email,
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 roles: user.roles,
//                 token: `fake-jwt-token.${user.id}`
//             });
//         }
//
//         function getUsers() {
//             if (!isAdmin()) return unauthorized();
//             return ok(users);
//         }
//
//         function getUserById() {
//             if (!isLoggedIn()) return unauthorized();
//
//             // only admins can access other user records
//             if (!isAdmin() && currentUser().id !== idFromUrl()) return unauthorized();
//
//             const user = users.find(x => x.id === idFromUrl());
//             return ok(user);
//         }
//
//         // helper functions
//
//         function ok(body) {
//             return of(new HttpResponse({ status: 200, body }));
//         }
//
//         function unauthorized() {
//             return throwError({ status: 401, error: { message: 'unauthorized' } });
//         }
//
//         function error(message) {
//             return throwError({ status: 400, error: { message } });
//         }
//
//         function isLoggedIn() {
//             const authHeader = headers.get('Authorization') || '';
//             return authHeader.startsWith('Bearer fake-jwt-token');
//         }
//
//         function isAdmin() {
//             return isLoggedIn() && currentUser().roles === Role.Admin;
//         }
//
//         function currentUser() {
//             if (!isLoggedIn()) return;
//             const id = parseInt(headers.get('Authorization').split('.')[1]);
//             return users.find(x => x.id === id);
//         }
//
//         function idFromUrl() {
//             const urlParts = url.split('/');
//             return parseInt(urlParts[urlParts.length - 1]);
//         }
//     }
// }
//
// export const fakeBackendProvider = {
//     // use fake backend in place of Http service for backend-less development
//     provide: HTTP_INTERCEPTORS,
//     useClass: FakeBackendInterceptor,
//     multi: true
// };
