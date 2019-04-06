import { Component, OnInit } from '@angular/core';
import { UserService ,AuthenticationService} from '../_services';
import { User } from '../_models';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  currentUser : User;

  public show: boolean = false;
  constructor(private authService: AuthenticationService, private userService: UserService) {
  	this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  	if(this.currentUser)
  	{
  		this.show = true;
  	}else{
  		this.show = false;
  	}
  }

  ngOnInit() {
  	console.log('hello')
  }
  isAdmin(){

  	
  }
  logout(){
    this.authService.logout()
  }
}
