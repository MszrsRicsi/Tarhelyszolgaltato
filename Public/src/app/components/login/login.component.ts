import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private api: ApiService,
    private router: Router,
    private auth: AuthService
  ){}

  user = {
    email: "",
    password: ""
  }

  login()
  {
    this.api.login("users", this.user).subscribe((res: any) => {
      if (res.success == true)
        {
          this.user = {
            email: "",
            password: ""
          }
        }

        this.auth.saveTokenAndLogin(res.token);
        this.router.navigate(["/services"]);
    });
  }
}
