import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ServiceComponent } from './components/service/service.component';
import { DetailsComponent } from './components/details/details.component';
import { UserAuthGuard } from './guards/UserAuthGuard';
import { LogoutComponent } from './components/logout/logout.component';


export const routes: Routes = [
    {
        path: "", redirectTo: "login", pathMatch: "full"
    },
    {
        path: "login", component: LoginComponent
    },
    {
        path: "registration", component: RegistrationComponent
    },
    {
        path: "services", canActivate: [UserAuthGuard],
        children: 
        [
            {
                path: "", component: ServiceComponent
            },
            {
                path: "details/:id", component: DetailsComponent
            }
        ]
    },
    {
        path: "logout", component: LogoutComponent
    },
    {
        path: "**", component: PageNotFoundComponent
    }
];
