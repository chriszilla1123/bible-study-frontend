import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {DownloadQueueModel} from "../../model/download-queue.model";
import {DownloadService} from "../../service/download/download.service";
import {interval, Observable, Subscription, switchMap} from "rxjs";
import {formatDistance, formatRelative} from "date-fns";
import {DownloadStatus} from "../../enum/download-status.enum";
import {Video} from "../../model/video.model";
import {Playlist} from "../../model/playlist.model";
import {ConfigService} from "../../service/config/config.service";

@Component({
  selector: "app-playlist-browser",
  templateUrl: "./playlist-browser.component.html",
  styleUrls: ["./playlist-browser.component.css"]
})
export class PlaylistBrowserComponent implements OnInit, OnDestroy{
  downloadQueue: DownloadQueueModel = new DownloadQueueModel([], [], [], []);
  downloadStatus: DownloadStatus[] = [DownloadStatus.INPROGRESS, DownloadStatus.PENDING, DownloadStatus.SUCCESS]
  queueUpdateSubscription: Subscription = new Subscription;
  queueUpdateInterval = 1000 // 1000ms = 1 second
  queueItemTextMaxLength = 25;

  //
  playlists: Playlist[] = [];
  // mediaSource: string = "http://localhost:8080/media/fetch?playlistName=The Lord of the Rings&mediaName=01. Concerning Hobbits.mp3"; //todo move to player.component
  mediaSource: string = "";
  //

  constructor(
    private downloadService: DownloadService,
    private configService: ConfigService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {

  }

  ngOnInit() {
    // this.startPolling();
    console.log("ngOnInit");
    this.getMediaMetadata();
    this.disableRightClickOnPlayer();
  }

  ngOnDestroy() {
    // this.stopPolling();
  }

  getMediaMetadata(): void {
    console.log("Attempting to fetch metadata");
    this.configService.getMediaMetadata().subscribe({
      next: (mediaMetadata: Playlist[]) => {
        this.playlists = mediaMetadata;
        console.log(this.playlists);
      },
      error: (err: unknown) => {

      }
    })
  }

  setMediaSource(playlistName: string, mediaName: string) {
    this.mediaSource = this.configService.getMediaUrl(playlistName, mediaName);
    console.log(this.mediaSource);
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

  startPolling(): void {
    console.info("Starting polling of download queue every " + (this.queueUpdateInterval / 1000) + " seconds");
    this.queueUpdateSubscription = interval(this.queueUpdateInterval)
      .pipe(switchMap(() => this.updateDownloadQueue()))
      .subscribe({
        next: (response: DownloadQueueModel) => {
          let updateFound: boolean = false;
          if(this.isQueueChanged(this.downloadQueue.inProgressDownloads, response.inProgressDownloads)) {
            this.downloadQueue.inProgressDownloads = response.inProgressDownloads;
            updateFound = true;
          }
          if(this.isQueueChanged(this.downloadQueue.pendingDownloads, response.pendingDownloads)) {
            this.downloadQueue.pendingDownloads = response.pendingDownloads;
            updateFound = true;
          }
          if(this.isQueueChanged(this.downloadQueue.completedDownloads, response.completedDownloads)) {
            this.downloadQueue.completedDownloads = response.completedDownloads;
            updateFound = true;
          }
          if(this.isQueueChanged(this.downloadQueue.failedDownloads, response.failedDownloads)) {
            this.downloadQueue.failedDownloads = response.failedDownloads;
            updateFound = true;
          }
          if(updateFound) {
            this.changeDetectorRef.detectChanges();
          }
          // if(this.isQueueChanged(this.downloadQueue, response)) {
          //   this.downloadQueue = response
          //   this.changeDetectorRef.detectChanges();
          // }
        },
        error: (error: unknown) => {
          console.error(error);
        }
      })
  }

  stopPolling(): void {
    console.info("Stopping download queue polling");
    if(this.queueUpdateSubscription) {
      this.queueUpdateSubscription.unsubscribe();
    }
  }

  isQueueChanged(queue1: Video[], queue2: Video[]): boolean {
    return JSON.stringify(queue1) !== JSON.stringify(queue2);
  }

  updateDownloadQueue(): Observable<DownloadQueueModel> {
    return this.downloadService.getDownloadQueue();
  }

  formatDownloadDate(date: Date): string {
    return formatDistance(date, new Date(), { addSuffix: true })
  }

  formatDownloadDate_Long(date: Date): string {
    return formatRelative(date, new Date());
  }
}