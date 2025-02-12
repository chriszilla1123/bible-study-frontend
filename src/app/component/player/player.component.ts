import {Playlist} from "../../model/playlist.model";
import {ConfigService} from "../../service/config/config.service";
import {Component, OnInit} from "@angular/core";
import {PlayerCommunicationService} from "../../service/player-communication/player-communication.service";
import {PlayerCommunicationModel} from "../../model/player-communication.model";
import {Schedule} from "../../model/schedule";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.css"]
})
export class PlayerComponent implements OnInit {
  queue: Playlist | null = null;
  radioQueue: Schedule[] | null = null;
  onMediaIndex: number = 0;
  onMediaSource: string = "";
  isLive: boolean = false;

  //UI labels
  nowPlayingLabel: string = "";
  playlistLabel: string = "";

  constructor(
    private configService: ConfigService,
    private playerCommunicationService: PlayerCommunicationService
  ) {

  }

  ngOnInit(): void {
    //Listens to events fired when user clicks on the the media on the playlist-browser
    this.playerCommunicationService.event$.subscribe((data: PlayerCommunicationModel) => {
      this.startPlaylistPlayback(data);
    })

    this.autoPlay();
  }

  startPlaylistPlayback(model: PlayerCommunicationModel) {
    this.queue = model.playlist;
    this.onMediaIndex = model.index;
    this.onMediaSource = this.queue.media[this.onMediaIndex].src;
    this.isLive = false;
    this.nowPlayingLabel = this.queue.media[this.onMediaIndex].name;
    this.playlistLabel = this.queue.media[this.onMediaIndex].playlistName;

    this.setPlayerControls(true);
  }

  startRadio() {
    this.isLive = true;
    this.configService.getRadioSchedule().subscribe((scheduleList: Schedule[]) => {
      this.radioQueue = scheduleList;
      let now: number = Date.now();
      for (let [index, schedule] of this.radioQueue.entries()) {
        if(schedule.endTime.getTime() > now) {
          //This is the media we need to play
          this.onMediaIndex = index;
          this.onMediaSource = schedule.media.src;
          this.nowPlayingLabel = this.radioQueue[this.onMediaIndex].media.name;
          this.playlistLabel = this.radioQueue[this.onMediaIndex].media.playlistName;

          this.setRadioPositionWhenLoaded();

          break;
        }
      }
    })

    this.setPlayerControls(false);
  }

  stopPlayback() {
    this.queue = null;
    this.onMediaIndex = 0;
    this.onMediaSource = "";
    this.isLive = false;
    this.nowPlayingLabel = "";
    this.playlistLabel = "";
    this.setPlayerControls(false);
  }

  autoPlay() {
    //Event listener to play the next media in the queue when the current one is finished
    const element = document.getElementById("audioPlayer") as HTMLAudioElement;
    if (element) {
      element.addEventListener("ended", () => {
        this.onMediaIndex++
        if(this.isLive && this.radioQueue && this.radioQueue[this.onMediaIndex]) {
          this.onMediaSource = this.radioQueue[this.onMediaIndex].media.src
          this.nowPlayingLabel = this.radioQueue[this.onMediaIndex].media.name;
        }
        else if (!this.isLive && this.queue && this.queue.media[this.onMediaIndex]) {
          this.onMediaSource = this.queue.media[this.onMediaIndex].src;
          this.nowPlayingLabel = this.queue.media[this.onMediaIndex].name;
        } else {
          //Reached queue end
          this.stopPlayback();
        }
      });
    }
  }

  setRadioPositionWhenLoaded() {
    const element = document.getElementById("audioPlayer") as HTMLAudioElement;
    if (element) {
      element.addEventListener("loadeddata", () => {
        if(this.radioQueue != null) {
          let now: number = Date.now() / 1000; //seconds
          let startTime: number = this.radioQueue[this.onMediaIndex].startTime.getTime() / 1000;
          element.currentTime = now - startTime;
        }
      },
        {once: true}
      )
    }
  }

  setPlayerControls(enable: boolean) {
    const element = document.getElementById("audioPlayer") as HTMLAudioElement;
    if (element) {
      element.controls = enable;
    }
  }
}