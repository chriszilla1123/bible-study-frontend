import {Component} from "@angular/core";
import {ConfigService} from "../../service/config/config.service";
import {Channel} from "../../model/channel.model";
import {NotificationService} from "../../service/notification/notification.service";
import {NotificationLevel} from "../../enum/notification-level.enum";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent {
  channels: Channel[] = [];
  editingEnabled: boolean = false; //Set true when editing is enabled
  saveInProgress: boolean = false; //Set true when a save request is in progress

  constructor(
    private configService: ConfigService,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit() {
    this.fetchChannels();
  }

  fetchChannels() {
    this.configService.getMediaMetadata().subscribe({
      next: (response: any) => {
        this.channels = response;
      },
      error: (error: unknown) => {
        console.log(error);
      }
    });
  }

  saveChanges() {
    if (this.saveInProgress) {
      return;
    }
    this.saveInProgress = true;
    let channelsCopy = JSON.parse(JSON.stringify(this.channels));
    channelsCopy = channelsCopy.filter((channel: Channel) => {
      return channel != null && this.validateChannel(channel)
    })
    this.configService.updateChannels(channelsCopy).subscribe({
      next: (response: Channel[]) => {
        this.editingEnabled = false;
        this.channels = response;
        this.notificationService.notify(NotificationLevel.SUCCESS, "Success", "Channel configuration saved successfully")
      },
      error: (error: any) => {
        this.notificationService.notify(NotificationLevel.ERROR, "Error", error.error, 5000);
        console.log(error);
        this.fetchChannels();
        this.saveInProgress = false;
      }
    })
  }

  validateChannel(channel: Channel): boolean {
    return channel.channelName != null && channel.channelId != null && channel.channelDir != null
      && channel.channelName.length > 0 && channel.channelId.length > 0 && channel.channelDir.length > 0;
  }

  enableEditing() {
    this.editingEnabled = true;
    this.saveInProgress = false;
  }

  discardChanges() {
    this.editingEnabled = false;
    this.fetchChannels();
  }

  moveChannelUp(index: number) {
    if (index == 0) {
      return;
    }
    let temp: Channel = this.channels[index - 1];
    this.channels[index - 1] = this.channels[index];
    this.channels[index] = temp;
  }

  moveChannelDown(index: number) {
    if (index == this.channels.length - 1) {
      return;
    }
    let temp: Channel = this.channels[index + 1];
    this.channels[index + 1] = this.channels[index];
    this.channels[index] = temp;
  }

  deleteChannel(index: number) {
    delete this.channels[index];
  }

  addChannel() {
    this.channels.push({
      channelId: "",
      channelName: "",
      channelDir: "",
      videos: []
    });
  }

}