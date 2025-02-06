import {HttpClient} from "@angular/common/http";
import {Observable, Observer} from "rxjs";
import {environment} from "../../../environments/environment";
import {Channel} from "../../model/channel.model";
import {Injectable} from "@angular/core";
import {DownloadQueueModel} from "../../model/download-queue.model";
import {DownloadRequestModel} from "../../model/download-request.model";

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  constructor(private httpClient: HttpClient) {}

  downloadArchive(requestModel: DownloadRequestModel): Observable<Channel[]> {
    return new Observable<Channel[]>((observer: Observer<Channel[]>) => {
      this.httpClient.post(environment.url + "/download", requestModel).subscribe({
        next: (response: any) => {
          observer.next(response);
          observer.complete();
        },
        error: (error: unknown) => {
          console.error(error);
        }
      });
    });
  }

  getDownloadQueue(): Observable<DownloadQueueModel> {
    return new Observable<DownloadQueueModel>((observer: Observer<DownloadQueueModel>) => {
      this.httpClient.get(environment.url + "/download/queue").subscribe({
        next: (response: any) => {
          observer.next(response);
          observer.complete();
        },
        error: (error: unknown) => {
          console.error(error);
        }
      });
    });
  }
}