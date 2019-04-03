import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient, private location: Location, private router: Router) { }


    login(email: string, password: string) {
        const httpOptions = {
          headers: new HttpHeaders({ 
            'Access-Control-Allow-Origin':'*',
            'Authorization':'authkey',
            'userid':'1',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
          })
        };
        return this.http.post(`${environment.apiUrl}auth/signin`, { email: email, password: password } , httpOptions)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes

                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));
    }
    
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.location.replaceState('/')
        this.router.navigate(['/login'])
    }
}