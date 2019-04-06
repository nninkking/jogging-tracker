
import { Component, OnInit } from '@angular/core';
import { UserService ,AuthenticationService} from './_services';
import { User } from './_models';
@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  currentUser : User;
  public show: boolean = false;
  constructor(private authService: AuthenticationService, private userService: UserService) 
  {}

  ngOnInit() {
  	
  }
  ngDoCheck() {
  	this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  	if(this.currentUser)
  	{
  		this.show = true;
  	}else{
  		this.show = false;
  	}
  }
  logout(){
    this.authService.logout()
  }
}
