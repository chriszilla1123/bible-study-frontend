import {Component, EventEmitter, Output} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {LoginCredentials} from "../../model/login-credentials.model";
import {LoginService} from "../../service/login/login.service";
import {NotificationService} from "../../service/notification/notification.service";
import {NotificationLevel} from "../../enum/notification-level.enum";

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  @Output() formSubmit = new EventEmitter<LoginCredentials>();
  form: FormGroup;
  username = new FormControl('');
  password = new FormControl('');


  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private notificationService: NotificationService,
  ) {
    this.form = this.formBuilder.group({
      username: [''],
      password: ['']
    })
  }

  onSubmit() {
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;
    this.loginService.validateAndStoreCredentials(username, password).subscribe({
      next: (response: LoginCredentials) => {
        this.notificationService.notify(NotificationLevel.SUCCESS, "Login Successful", "Welcome back, " + username);
        this.formSubmit.emit(response);
      },
      error: (error: unknown) => {
        this.notificationService.notify(NotificationLevel.ERROR, "Error", "Invalid username/password");
        console.log(error);
      }
    })
  }
}