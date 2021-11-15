import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http : HttpClient) { }

  post_something(data :any, table :string ){
    return this.http.post<any>('http://localhost:3000/'+table,data)
    .pipe(map((res:any )=>{
      return res
    }))
  }
  public get_something(table :string){
    return this.http.get<any>('http://localhost:3000/'+table)
    .pipe(map((res:any )=>{
      return res
    }))
  }

  public get_something_observable(table :string) : Observable<any[]>{
    return this.http.get<any>('http://localhost:3000/'+table)
  }

  update_something(data :any ,id : number,table :string){
    return this.http.put<any>('http://localhost:3000/'+table+'/'+id,data)
    .pipe(map((res:any )=>{
      return res
    }))
  }
  delete_something(id : number,table :string){
    return this.http.delete<any>("http://localhost:3000/"+table+"/"+id)
    .pipe(map((res:any )=>{
      return res
    }))
  }

  get_onething(table :string, id:number){
    return this.http.get<any>('http://localhost:3000/'+table+'/'+id)
    .pipe(map((res:any )=>{
      return res
    }))
  }

  search_something(table : string, search: string, attribut: string){
    return this.http.request('GET',"http://localhost:3000/"+table+"?"+attribut+"="+search)
    .pipe(map((res:any)=>{
      return res
    }))
  }

}
