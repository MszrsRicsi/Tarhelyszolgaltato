import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private auth: AuthService){}

  loggedIn = this.auth.isUserLoggedIn();

  items: any = [
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
];
}
