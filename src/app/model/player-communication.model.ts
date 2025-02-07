import {Playlist} from "./playlist.model";

export class PlayerCommunicationModel {
  playlist: Playlist;
  index: number;

  constructor(playlist: Playlist, index: number) {
    this.playlist = playlist;
    this.index = index;
  }
}