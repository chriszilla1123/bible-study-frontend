export class DownloadRequestModel {
  dryRun: boolean;

  constructor(dryRun: boolean) {
    this.dryRun = dryRun;
  }
}