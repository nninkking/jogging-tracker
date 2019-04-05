import { Component, OnInit } from '@angular/core';
import { RecordService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  templateUrl: './record-update.component.html',
  styleUrls: ['./record-update.component.sass']
})
export class RecordUpdateComponent implements OnInit {
  record_id:any ;
  UpadateForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor( private route: ActivatedRoute, private recordservice: RecordService ,private formBuilder: FormBuilder,private router: Router) { }
  ngOnInit() {
	this.route.paramMap.subscribe(params => {
	    this.record_id = params.get("id")
	    console.log(this.record_id)
	  })
    this.UpadateForm = this.formBuilder.group({
		    distance: ['', Validators.required],
		    time: ['', Validators.required]
        });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
 get f() { return this.UpadateForm.controls; }
 onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.recordservice.update(this.record_id, {distance: this.f.distance.value, time: this.f.time.value }).subscribe((data :any) => {
    		this.submitted = true;
    		console.log("retrun datas", data);
    		this.router.navigate([this.returnUrl]);
      },
      error => {
     });
	}
}
