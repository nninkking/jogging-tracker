import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { RecordService } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'table-pagination-component',
  templateUrl: './table-pagination-component.component.html',
  styleUrls: ['./table-pagination-component.component.sass'],
  
})
export class TablePaginationComponentComponent implements OnInit {
  displayedColumns: string[] = ['No', 'Date', 'Distance', 'Time', 'Average', 'Action'];
    fromDate :Date ;
    toDate: Date ;
    record: FormGroup;
    loading = false;
    submitted = false;
    closeResult: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor( private formBuilder: FormBuilder, private recordservice: RecordService, private modalService: NgbModal, private router: Router) { }
  dataSource:any
  allRecords:any[]
  ngOnInit() {
     this.record = this.formBuilder.group({
            distance: 0,
            time: 0
        });
     this.recordservice.getlist().subscribe((data: any) => this.setData(data.records))      
  }
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
  get f() { return this.record.controls; }
  setData(data: any[])
   {
    this.allRecords = data;
    this.show(data)
  }
   onSubmit() {
        this.submitted = true;
        this.loading = true;
        this.recordservice.create({ distance: this.f.distance.value, time: this.f.time.value }).subscribe((data :any) => {
            this.show(data.records)
            this.loading = false;
            this.submitted = true;
          },
          error => {
            this.loading = false;
         });
        this.closeResult = `Closed with: Save click`;
        this.modalService.dismissAll('Save click');
    }
    show(data :any[]){
        this.dataSource = new MatTableDataSource<PeriodicElement>(data);
        this.dataSource.paginator = this.paginator;
    }
    onValueChangefrom(value: Date): void {
      this.fromDate = value;
      var records = this.allRecords;
      if(this.fromDate)
      {
        records = records.filter((record) => {
          return  new Date(record.created_at) >= new Date(this.fromDate)
        })
      }
      if(this.toDate)
      {
        records = records.filter((record) => {
          return  new Date(record.created_at) <= new Date(this.toDate)
        })
      }
      this.show(records)
    }
    onValueChangeto(value: Date): void {
      this.toDate = value;
      var records = this.allRecords;

      if(this.fromDate)
      {
        records = records.filter((record) => {
          return  new Date(record.created_at) >= new Date(this.fromDate)
        })
      }
      if(this.toDate)
      {
        records = records.filter((record) => {
          return  new Date(record.created_at) <= new Date(this.toDate)
        })
      }
      this.show(records)
    }
    onDelete(id:number){
        this.recordservice.delete(id).subscribe((data :any) => {
            this.show(data.records)
        }, error => {

        });
    }
   onUpdate(element:any){
         this.router.navigate(['/record/update', { element: element }])
   }


}
export interface PeriodicElement {
	Date: string;
	No: number;
	Distance: number;
	Time: number;
	Average: number;
  Action: any;
}

