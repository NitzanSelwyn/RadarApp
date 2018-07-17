import { Injectable } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    intercept(req, next) {
        var authRequest = req.clone({
            headers: req.headers.set('Authorization', 'token')
        })
        return next.handle(authRequest);
    }

}