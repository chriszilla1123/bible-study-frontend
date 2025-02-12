import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {DownloadService} from "../../service/download/download.service";
import {Playlist} from "../../model/playlist.model";
import {ConfigService} from "../../service/config/config.service";
import {PlayerCommunicationService} from "../../service/player-communication/player-communication.service";
import {PlayerCommunicationModel} from "../../model/player-communication.model";

@Component({
  selector: "app-playlist-browser",
  templateUrl: "./playlist-browser.component.html",
  styleUrls: ["./playlist-browser.component.css"]
})
export class PlaylistBrowserComponent implements OnInit{
  playlists: Playlist[] = [];

  constructor(
    private downloadService: DownloadService,
    private configService: ConfigService,
    private changeDetectorRef: ChangeDetectorRef,
    private playerCommunicationService: PlayerCommunicationService,
  ) {

  }

  ngOnInit() {
    this.getMediaMetadata();
    this.disableRightClickOnPlayer();
  }

  getMediaMetadata(): void {
    console.log("Attempting to fetch metadata");
    this.configService.getMediaMetadata().subscribe({
      next: (mediaMetadata: Playlist[]) => {
        this.playlists = mediaMetadata;
      },
      error: (err: unknown) => {
        console.error("Error attempting to fetch metadata");
        console.error(err);
      }
    })
  }

  onMediaClicked(playlist: Playlist, mediaIndex: number) {
    // this.mediaSource = this.configService.getMediaUrl(playlistName, mediaName);
    this.playerCommunicationService.emitEvent(new PlayerCommunicationModel(playlist, mediaIndex))
  }

  disableRightClickOnPlayer() {
    // @ts-ignore
    document.getElementById("audioPlayer").addEventListener("contextmenu", function(event) {
      event.preventDefault();
    });
    // @ts-ignore
    document.addEventListener("contextmenu", function(event) {
      event.preventDefault();
    });
    // @ts-ignore
    document.getElementById("audioPlayer").addEventListener("touchstart", function(event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    });
  }
}