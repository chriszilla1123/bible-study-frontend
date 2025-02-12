import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {Channel} from "../../model/channel.model";
import {Observable} from "rxjs";
import {Playlist} from "../../model/playlist.model";
import {Schedule} from "../../model/schedule";

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(
    private httpClient: HttpClient
  ) {

  }

  getMediaMetadata(): Observable<Playlist[]> {
    return new Observable<Playlist[]>((observer) => {
      this.httpClient.get<Playlist[]>(environment.url + "/media").subscribe({
        next: (response: Playlist[]) => {
          response.forEach(playlist => {
            if(playlist.media && playlist.media.length > 0) {
              playlist.media.forEach(media => {
                media.src = this.getMediaUrl(playlist.name, media.name);
              })
            }
          })
          observer.next(response);
          observer.complete();
        },
        error: (error: unknown) => {
          console.error(error);
          observer.error(error);
        }
      });
    })
  }

  getRadioSchedule(): Observable<Schedule[]> {
    return new Observable<Schedule[]>((observer) => {
      this.httpClient.get<Schedule[]>(environment.url + "/schedule").subscribe({
        next: (response: Schedule[]) => {
          response.forEach(schedule => {
            schedule.media.src = this.getMediaUrl(schedule.media.playlistName, schedule.media.name);
            schedule.startTime = new Date(Date.parse(schedule.startTime.toString()));
            schedule.endTime = new Date(schedule.endTime.toString());
          })
          observer.next(response);
          observer.complete();
        },
        error: (error: unknown) => {
          console.error(error);
          observer.error(error);
        }
      })
    })
  }

  getMediaUrl(playlistName: string, mediaName: string): string {
    return encodeURI(environment.url + "/media/fetch?playlistName=" + playlistName + "&mediaName=" + mediaName);
  }


  //TODO: delete these
  updateChannels(channels: Channel[]): Observable<Channel[]> {
    return new Observable<Channel[]>((observer) => {
      this.httpClient.put(environment.url + "/config/channels/update", channels).subscribe({
        next: (response: any) => {
          observer.next(response);
          observer.complete();
        },
        error: (error: unknown) => {
          console.error(error);
          observer.error(error);
        }
      });
    })
  }

  getYtdlVersion(): Observable<string> {
    return new Observable(observer => {
      this.httpClient.get(environment.url + "/config/ytdl/version", {responseType: 'text'}).subscribe({
        next: (response: any) => {
          observer.next(response);
          observer.complete();
        },
        error: (error: unknown) => {
          console.error(error);
          observer.error(error);
        }
      })
    })
  }
}