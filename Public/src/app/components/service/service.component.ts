import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent implements OnInit {
  constructor(private api: ApiService){}

  services: any = [];

  ngOnInit(): void {
    this.getAllServices();
  }

  getAllServices()
  {
    this.api.selectAll("services").subscribe((res: any) => {
      this.services = res.results;
    })
  }

  selectService(serviceID: string)
  {
    console.log("selecting service: " + serviceID);
  }
}
