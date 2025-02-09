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
  selectedServiceID: any;
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

  selectService(serviceId:any)
  {
    this.visible = true;
    this.selectedServiceID = serviceId;
  }

  closePopup()
  {
    this.visible = false;
  }

  buyService()
  {
    this.api.buyService(this.auth.getLoggedInUser().id, this.selectedServiceID).subscribe(() => {
      this.closePopup();
      this.router.navigate(["/services/details"]);
    });
  }
}
