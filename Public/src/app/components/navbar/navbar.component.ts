import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
 
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  constructor(
    private auth: AuthService,
  ){}
 
  isLoggedIn: any = false
 
  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe((res: any) => {
      this.isLoggedIn = res
      this.setupMenu();
    })
  }
 
  items: any = [];
 
  setupMenu(){
    this.items = [
      ...(this.isLoggedIn ? [
        {
          label: "Szolgáltatások",
          route: "services",
          icon: "",
        },
        ...(this.auth.getLoggedInUser().role == "admin") ? [
          {
            label: "Adminisztráció",
            route: "admin",
            icon: ""
          },
        ]: [],
        {
          label: "Kijelentkezés",
          route: "logout",
          icon: ""
        }
      ] : [
        {
          label: "Bejelentkezés",
          route: "login",
          icon: "",
        },
        {
          label: "Regisztráció",
          route: "registration",
          icon: "",
        },
      ])
    ];
  }
}