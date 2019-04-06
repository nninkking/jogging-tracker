import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})

export class UserComponent implements OnInit {
  displayedColumns = ['id', 'email', 'firstname', 'lastname', 'role', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

   
  users: any;
  isAdmin: boolean;
  constructor(private router: Router, private userservice: UserService) { 
     // this.dataSource = new MatTableDataSource(this.users);
  }

  ngOnInit() {
    console.log("user Component!")
    console.log(this.userservice.getAll())
    this.userservice.getAll()
      .subscribe( data => {
        console.log(data)
        this.dataSource = new MatTableDataSource(data.users);
      });
      this.isAdmin = JSON.parse(window.localStorage.getItem('currentUser')).user.role == 'admin'
  }

  deleteUser(user: any): void {
    this.userservice.delete(user)
      .subscribe( data => {
          this.dataSource = new MatTableDataSource(data.users);
      })
  };

  editUser(user: any): void {
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", user.id.toString());
    this.router.navigate(['edit-user']);
  };

  addUser(): void {
    this.router.navigate(['add-user']);
  };

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}


export interface PeriodicElement {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  role: number;
  action: any;
}

