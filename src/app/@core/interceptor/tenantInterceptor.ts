import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TenantInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let companyId = localStorage.getItem('companyId');

    if (companyId) {
      request = request.clone({
        setHeaders: {
          CompanyId: `${companyId}`
        }
      });
    }

    return next.handle(request);
  }
}
