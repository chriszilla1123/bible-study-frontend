import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {PlayerCommunicationModel} from "../../model/player-communication.model";

@Injectable({
  providedIn: 'root',
})
export class PlayerCommunicationService {
  private eventSubject: Subject<PlayerCommunicationModel> = new Subject<PlayerCommunicationModel>();

  event$ = this.eventSubject.asObservable();

  emitEvent(data: PlayerCommunicationModel) {
    this.eventSubject.next(data);
  }
}