import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from "../_services";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      let errorMessage = '';
      if ([401, 403].indexOf(err.status) !== -1) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        console.log("logout");
        this.authenticationService.logout();
        location.reload(true);
      }


      if (err.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${err.error.message}`;

      } else {
        // server-side error
        errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;

      }


      errorMessage = err.error.message || err.statusText;
      return throwError(errorMessage);
    }))
  }
}
