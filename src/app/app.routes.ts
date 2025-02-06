import {Routes} from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {MainComponent} from './component/main/main.component';
import {ConfigComponent} from './component/config/config.component';

export const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'config', component: ConfigComponent},
];
