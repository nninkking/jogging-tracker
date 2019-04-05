import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Location } from '@angular/common'
import { Record } from '../_models';
@Injectable()
export class RecordService {
    constructor(private http: HttpClient) { }

    getlist(){
        return this.http.get(`${environment.apiUrl}records`)
    }
    create(record:any) {
        return this.http.post(`${environment.apiUrl}records`, { 
            record: record})
    }
    update(id:number, record: any) {
        return this.http.put(`${environment.apiUrl}/records/` + id, record);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/records/` + id);
    }
    
}