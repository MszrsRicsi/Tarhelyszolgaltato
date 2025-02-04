import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, DialogModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent implements OnInit {
  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ){}

  services: any = [];

  visible = false;

  ngOnInit(): void {
    this.getAllServices();
  }

  getAllServices()
  {
    this.api.selectAll("services").subscribe((res: any) => {
      this.services = res.results;
    })
  }

  selectService()
  {
    this.visible = true;
  }

  closePopup()
  {
    this.visible = false;
  }

  buyService(serviceID: string)
  {
    this.api.buyService(this.auth.getLoggedInUser().id, serviceID).subscribe((res: any) => {});
    this.router.navigate(["/services/details"]);
    this.closePopup();
  }
}
