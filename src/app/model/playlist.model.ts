import {Media} from "./media.model";

export class Playlist {
  name: string;
  media: Media[];

  constructor(name: string, media: Media[]) {
    this.name = name;
    this.media = media;
  }
}