import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { ApiService } from "../services/api.service";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})

export class ServiceGuard implements CanActivate {
  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    try {
      const res: any = await this.api.getSubscriptionByUserID(this.auth.getLoggedInUser().id).toPromise();
      
      if (res.results != null) {
        this.router.navigate(['/services/details']);
        return false; // Ha van előfizetés, ne engedje tovább
      }

      return true; // Ha nincs előfizetés, engedje tovább
    } catch {
      return false; // Hiba esetén ne engedje tovább
    }
  }
}