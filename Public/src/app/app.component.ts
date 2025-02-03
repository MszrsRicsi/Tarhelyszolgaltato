import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'Public';

  items: any = [{
    label: "Services",
    route: "services",
    icon: "",
  },
  {
    label: "IDK",
    route: "idk1",
    icon: "",
  },
  {
    label: "IDK",
    route: "idk2",
    icon: ""
  }
];
}
