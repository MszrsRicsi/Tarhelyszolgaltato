import { Component, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TabViewModule, TableModule, ButtonModule, DialogModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private api: ApiService
  ){}

  services: any = [];

  subscriptions: any = [];

  visible: boolean = false;

  selectedServiceID: string = "";

  newServiceName: string = "";

  ngOnInit(): void {
    this.getServies();
    this.getSubscriptions();
  }
  
  getServies()
  {
    this.api.selectAll("services").subscribe((res: any) => {
      this.services = res.results;
    });
  }

  getSubscriptions()
  {
    this.api.getAllRelated().subscribe((res: any) => {
      this.subscriptions = res.results;
    })
  }

  openServiceModifyWindow(serviceID: string)
  {
    this.selectedServiceID = serviceID;
    this.visible = true;
  }

  modifyService()
  {
    this.api.modifySericeName(this.selectedServiceID, {name: this.newServiceName}).subscribe(() => {
      this.getServies();
    });
    this.visible = false;
  }

  revokeService(userID: string, serviceID: string)
  {
    this.api.deleteSubscription(userID, serviceID).subscribe(() => {
      this.getSubscriptions();
    });
  }
}
