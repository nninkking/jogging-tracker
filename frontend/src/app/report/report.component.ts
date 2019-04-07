import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ReportService } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.sass']
})
export class ReportComponent implements OnInit {
  displayedColumns: string[] = ['Date', 'Distance', 'Time', 'Average'];
    fromDate :Date ;
    toDate: Date ;
    record: FormGroup;
    loading = false;
    submitted = false;
    closeResult: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor( private formBuilder: FormBuilder, private reportservice: ReportService, private modalService: NgbModal, private router: Router) { }
  dataSource:any
  allRecords:any[]
  ngOnInit() {
  	console.log("ngoninit start:");
     this.record = this.formBuilder.group({
        distance: 0,
        time: 0
      });
  }



  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  setData(records: any[])
  {
    this.allRecords = records;
    this.show(records)
  }
  comparedate( data1: any, data2: any )
  {
    for( var i = 0; i < 10; i++ )
    {
      if( data1[i] != data2[i] )
        return false;
    }
    return true;
  }

  show(data :any[]){
    this.dataSource = new MatTableDataSource<PeriodicElement>(data);
    this.dataSource.paginator = this.paginator;
  }
  onValueChangefrom(value: Date): void {
    this.fromDate = value;
    if( this.fromDate && this.toDate )
    {
      this.reportservice.getlist(this.fromDate, this.toDate).subscribe((data: any) => this.setData(data.reports)); 
      var records = this.allRecords;
    }

    records = this.Toreport(records);

    this.show(records)
  }
  downLoadFile(data: any, type: string) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    const blob = new Blob([data], {type}),
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = "report.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  }
  Toreport(value: any): any{
    return value;
  }
  onValueChangeto(value: Date): void {
    this.toDate = value;
    var records = this.allRecords;
    if( this.fromDate && this.toDate )
    {
      this.reportservice.getlist(this.fromDate, this.toDate).subscribe((data: any) => this.setData(data.reports)); 
      var records = this.allRecords;
    }
    
    records = this.Toreport(records);
    this.show(records)
  }
  ExportToCSV() : void {
    this.reportservice.postlist(this.fromDate, this.toDate).subscribe((response: any) => this.downLoadFile(response.csvdata, "application/csv"));
    // console.log("To make csv file");
  }

}

export interface PeriodicElement {
	Date: string;
	No: number;
	Distance: number;
	Time: number;
	Average: number;
}
