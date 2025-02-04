import { Injectable } from '@angular/core';
import environment from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private router: Router){}

  private isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$: Observable<boolean> = this.isLoggedIn.asObservable();

  private hasToken()
  {
    return !!localStorage.getItem(environment.tokenName);
  }

  saveTokenAndLogin(token:string)
  {
    localStorage.setItem(environment.tokenName, token);
    this.isLoggedIn.next(true);
  }

  deleteTokenAndLogout()
  {
    localStorage.removeItem(environment.tokenName);
    this.isLoggedIn.next(false);
    this.router.navigate(["/login"]);
  }

  getLoggedInUser()
  {
    const token = localStorage.getItem(environment.tokenName);

    if (token)
    {
      const decodedUTF8Payload = new TextDecoder('utf-8').decode(
        new Uint8Array(atob(token.split('.')[1]).split('').map(char => char.charCodeAt(0)))
      );
      
      if (Date.now() > JSON.parse(decodedUTF8Payload).exp * 1000)
      {
        this.deleteTokenAndLogout();
      }

      return JSON.parse(decodedUTF8Payload);
    }

    return null;
  }

  isUserLoggedIn(){
    return this.isLoggedIn.value;
  }
}