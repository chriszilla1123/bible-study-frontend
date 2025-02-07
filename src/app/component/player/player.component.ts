import {Playlist} from "../../model/playlist.model";
import {ConfigService} from "../../service/config/config.service";
import {Media} from "../../model/media.model";
import {Component, OnInit} from "@angular/core";
import {PlayerCommunicationService} from "../../service/player-communication/player-communication.service";
import {PlayerCommunicationModel} from "../../model/player-communication.model";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.css"]
})
export class PlayerComponent implements OnInit {
  queue: Playlist | null = null;
  onMediaIndex: number = 0;
  onMediaSource: string = "";
  isLive: boolean = false;

  constructor(
    private configService: ConfigService,
    private playerCommunicationService: PlayerCommunicationService
  ) {

  }

  ngOnInit(): void {
    this.playerCommunicationService.event$.subscribe((data: PlayerCommunicationModel) => {
      this.queue = data.playlist;
      this.onMediaIndex = data.index;
      this.onMediaSource = this.queue.media[this.onMediaIndex].src;
    })
  }

  getNowPlaying(): Media | null {
    if(this.queue) {
      return this.queue.media[this.onMediaIndex];
    }
    return null;
  }

  getMediaUrl(playlistName: string, mediaName: string) {
    return this.configService.getMediaUrl(playlistName, mediaName);
  }

  stopPlayback() {
    this.queue = null;
    this.onMediaIndex = 0;
    this.onMediaSource = "";
    this.isLive = false;
  }

  startRadio() {
    alert("Coming \"soon\" to a website near you!");
  }
}