import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DownloadOptionsFormComponent} from "./forms/download-options-form/download-options-form.component";
import {MainComponent} from "./component/main/main.component";
import {LoginComponent} from "./component/login/login.component";
import {LoginFormComponent} from "./forms/login-form/login-form.component";
import {MenubarModule} from "primeng/menubar";
import {HeaderComponent} from "./component/header/header.component";
import {ButtonModule} from "primeng/button";
import {CommonModule} from "@angular/common";
import {ConfigComponent} from "./component/config/config.component";
import {TableModule} from "primeng/table";
import {PlaylistBrowserComponent} from "./component/playlist-browser/playlist-browser.component";
import {AccordionModule} from "primeng/accordion";
import {TooltipModule} from "primeng/tooltip";
import {DialogModule} from "primeng/dialog";
import {PlayerComponent} from "./component/player/player.component";

@NgModule({
  declarations: [
    HeaderComponent,
    MainComponent,
    PlayerComponent,
    PlaylistBrowserComponent,
    LoginComponent,
    ConfigComponent,
    LoginFormComponent,
    DownloadOptionsFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    MenubarModule,
    ButtonModule,
    AccordionModule,
    TooltipModule,
    DialogModule,
  ],
  exports: [
    HeaderComponent,
    MainComponent,
    LoginComponent,
    ConfigComponent,
    LoginFormComponent,
    DownloadOptionsFormComponent,
  ],
})
export class AppModule {

}