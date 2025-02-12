export class Media {
  name: string;
  playlistName: string;
  src: string;

  constructor(name: string, playlistName: string, src: string) {
    this.name = name;
    this.playlistName = playlistName;
    this.src = src;
  }
}