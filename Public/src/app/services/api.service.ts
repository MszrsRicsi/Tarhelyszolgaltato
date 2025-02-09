import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import environment from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  server = `http://localhost:3000/api`;

  getToken():String | null{
    return localStorage.getItem(environment.tokenName);
  }

  tokenHeader(){
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return { headers }
  }

  login(table: string, user: object)
  {
    return this.http.post(`${this.server}/${table}/login`, user);
  }

  register(table: string, user: object)
  {
    return this.http.post(`${this.server}/${table}/register`, user);
  }

  selectAll(table:string){
    return this.http.get(`${this.server}/${table}`, this.tokenHeader());
  }

  select(table:string, id:number){
    return this.http.get(`${this.server}/${table}/${id}`, this.tokenHeader());
  }

  delete(table:string, id:number){
    return this.http.delete(`${this.server}/${table}/${id}`);
  }

  insert(table:string, data: object){
    return this.http.post(`${this.server}/${table}`, data);
  }

  buyService(userID: string, serviceID: string)
  {
    return this.http.post(`${this.server}/subscriptions/${userID}/${serviceID}`, [], this.tokenHeader());
  }

  getSubscriptionByUserID(userID: string)
  {
    return this.http.get(`${this.server}/subscriptions/${userID}`, this.tokenHeader());
  }

  deleteSubscription(userID: string, id: string)
  {
    return this.http.delete(`${this.server}/subscriptions/${userID}/${id}`, this.tokenHeader());
  }

  getAllRelated()
  {
    return this.http.get(`${this.server}/subscriptions/get/AllRelated`, this.tokenHeader());
  }

  modifySericeName(serviceID: string, data: object)
  {
    return this.http.patch(`${this.server}/services/${serviceID}`, data ,this.tokenHeader());
  }
}
