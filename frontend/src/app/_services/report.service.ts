import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Location } from '@angular/common'
@Injectable()
export class ReportService {
    constructor(private http: HttpClient) { }

    getAlllist(){
        console.log("getAlllist")
        return this.http.get(`${environment.apiUrl}reports/all`)
    }
    getlist(from: any, to: any){
        return this.http.get(`${environment.apiUrl}reports`,{
            params: {
                from: from.toISOString(),
                to: to.toISOString(),
            }
        })
    }
    postlist(from: any, to: any){
    	console.log("postlist function arrived")
    	return this.http.post(`${environment.apiUrl}reports`,{
            params: {
                from: from.toISOString(),
                to: to.toISOString(),
            }
        })
    }
    
}