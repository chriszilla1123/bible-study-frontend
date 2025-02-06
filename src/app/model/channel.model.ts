import {Video} from "./video.model";

export class Channel {
  channelName: string;
  channelId: string;
  channelDir: string;
  videos: Video[];

  constructor(channelName: string, channelId: string, channelDir: string, videos: Video[]) {
    this.channelName = channelName;
    this.channelId = channelId;
    this.channelDir = channelDir;
    this.videos = videos;
  }

  toString(): string {
    return `${this.channelName} - ${this.channelId} - ${this.channelDir}`;
  }
}