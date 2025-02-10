import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ButtonModule, MessagesModule, FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  providers: [MessageService]
})
export class DetailsComponent implements OnInit{
  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private message: MessageService
  ){}

  hasService: boolean = false;

  service: any = [];
  messages: Message[] = [];

  ngOnInit(): void {
    this.api.getSubscriptionByUserID(this.auth.getLoggedInUser().id).subscribe((res: any) => {
      if (res.results != null)
      {

        this.hasService = true;
        this.api.select("services", res.results.csomagID).subscribe((subRes: any) => {
          this.service = subRes.results;
        });
      }
      console.log(res)
      if (res) {
        this.messages =[ { severity: 'success', summary: 'A bejelentkezési adatokat emailben elküldtük' }];
      }
    });
  }

  revokeService(serviceID: string)
  {
    this.api.deleteSubscription(this.auth.getLoggedInUser().id, serviceID).subscribe((res: any) => {
      this.router.navigate(["/services"]);
    });
  }
}
