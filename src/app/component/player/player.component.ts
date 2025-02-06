// import {Playlist} from "../../model/playlist.model";
// import {ConfigService} from "../../service/config/config.service";
// import {Media} from "../../model/media.model";
// import {Component} from "@angular/core";
//
// @Component({
//   selector: "app-player",
//   templateUrl: "./player.component.html",
//   styleUrls: ["./player.component.css"]
// })
// export class PlayerComponent {
//   queue: Playlist = new Playlist;
//   onMedia: number = 0;
//
//   constructor(
//     private configService: ConfigService,
//   ) {
//
//   }
//
//   getNowPlaying(): Media {
//     return this.queue.media[this.onMedia];
//   }
//
//   getMediaUrl(playlistName: string, mediaName: string) {
//     return this.configService.getMediaUrl(playlistName, mediaName);
//   }
// }