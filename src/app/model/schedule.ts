import {Media} from "./media.model";

export class Schedule {
  media: Media;
  startTime: Date;
  endTime: Date;

  constructor(media: Media, startTime: Date, endTime: Date) {
    this.media = media;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}