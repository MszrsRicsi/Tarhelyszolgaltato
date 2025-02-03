import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  constructor(
    private api: ApiService,
    private router: Router
  ){}

  user = {
    name: "",
    email: "",
    password: "",
    confirm: ""
  }

  register()
  {
    this.api.register("users", this.user).subscribe((res: any) => {
      if (res.success == true)
      {
        this.user = {
          name: "",
          email: "",
          password: "",
          confirm: ""
        }
        
        this.router.navigate(["/login"]);
      }
    });
  }
}
