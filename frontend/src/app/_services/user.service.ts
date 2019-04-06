import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../_models';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any>(`${environment.apiUrl}users`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/users/` + id);
    }

    register(user: any) {
        return this.http.post<any>(`${environment.apiUrl}auth/signup`, {user: user});
    }
    create(user: any) {
        return this.http.post<any>(`${environment.apiUrl}users/`, {user: user});
    }


    update(user: User) {
        return this.http.put(`${environment.apiUrl}/users/` + user.id, user);
    }

    delete(id: any) {
        return this.http.delete<any>(`${environment.apiUrl}/users/` + id);
    }
}