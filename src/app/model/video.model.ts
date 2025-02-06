export class Video {
  id: string;
  title: string;
  url: string;
  download_date: string;
  directory: string;
  channelName: string;
  downloadStatus: string;

  constructor(id: string, title: string, url: string, download_date: string, directory: string, channelName: string, downloadStatus: string) {
    this.id = id;
    this.title = title;
    this.url = url;
    this.download_date = download_date;
    this.directory = directory;
    this.channelName = channelName;
    this.downloadStatus = downloadStatus;
  }

  toString(): string {
    return `${this.id} - ${this.title} - ${this.url} - ${this.download_date} - ${this.directory} - ${ this.channelName } - ${this.downloadStatus}`
  }
}