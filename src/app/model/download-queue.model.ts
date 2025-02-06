import {Video} from "./video.model";

export class DownloadQueueModel {
  pendingDownloads: Video[];
  inProgressDownloads: Video[];
  completedDownloads: Video[];
  failedDownloads: Video[];

  constructor(pendingDownloads: Video[], inProgressDownloads: Video[], completedDownloads: Video[], failedDownloads: Video[]) {
    this.pendingDownloads = pendingDownloads;
    this.inProgressDownloads = inProgressDownloads;
    this.completedDownloads = completedDownloads;
    this.failedDownloads = failedDownloads;
  }
}