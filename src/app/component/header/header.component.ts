import {Component} from "@angular/core";
import {MenuItem} from "primeng/api";
import {ConfigService} from "../../service/config/config.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  items: MenuItem[];

  constructor(
    private configService: ConfigService,
  ) {
    this.items = [
      {label: "Home", routerLink: [""]},
      // {label: "Config", routerLink: ["/config"]},
      // {label: "Login", routerLink: ["/login"]},
    ];
  }
}