import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common'
import { User } from '../_models';
import { UserService ,AuthenticationService} from '../_services';
import { Router } from '@angular/router';


@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(
        private userService: UserService, 
        private authService: AuthenticationService,
        private location: Location,
        private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    }

    ngOnInit() {
        // this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        });
    }

    logout(){
        this.authService.logout()
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }
}