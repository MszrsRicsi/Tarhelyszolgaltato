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
          label: "Services",
          route: "services",
          icon: "",
        },
        {
          label: "Logout",
          route: "logout",
          icon: ""
        }
      ] : [
        {
          label: "Login",
          route: "login",
          icon: "",
        },
        {
          label: "Registration",
          route: "registration",
          icon: "",
        },
      ])
    ];
  }
}