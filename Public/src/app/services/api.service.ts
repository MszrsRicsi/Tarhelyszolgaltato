import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  server = `http://localhost:3000/api/`;

  login(table: string, user: object)
  {
    return this.http.post(`${this.server}/${table}/login`, user);
  }

  register(table: string, user: object)
  {
    return this.http.post(`${this.server}/${table}/register`, user);
  }

  selectAll(table:string){
    return this.http.get(`${this.server}/${table}`);
  }

  select(table:string, id:number){
    return this.http.get(`${this.server}/${table}/${id}`);
  }

  delete(table:string, id:number){
    return this.http.delete(`${this.server}/${table}/${id}`);
  }

  insert(table:string, data: object){
    return this.http.post(`${this.server}/${table}`, data);
  }
}
