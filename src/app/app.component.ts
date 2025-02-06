import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AppModule} from './app.module';
import {LoginService} from './service/login/login.service';
import {LoginCredentials} from './model/login-credentials.model';
import {ToastModule} from "primeng/toast";
import {NotificationService} from "./service/notification/notification.service";
import {NotificationLevel} from "./enum/notification-level.enum";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AppModule,
    RouterOutlet,
    ToastModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(
    private router: Router,
    private loginService: LoginService,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit() {
    console.log("Bible Study Web Interface started...");

    // this.loginService.getAndValidateStoredCredentials().subscribe({
    //   next: (loginCredentials: LoginCredentials) => {
    //     console.log("Validated login credentials and server is up");
    //     this.notificationService.notify(NotificationLevel.SUCCESS, "Login Successful", "Welcome back, " + loginCredentials.username);
    //   },
    //   error: (error: unknown) => {
    //     console.log("Navigating to login page after credentials failed to validate with message: " + error);
    //     this.router.navigate(['/login']);
    //   }
    // })
  }
}
