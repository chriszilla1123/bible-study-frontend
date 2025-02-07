import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'filterFileExtensions',
})
export class FilterFileExtensionsPipe implements PipeTransform {
  transform(value: string): string {
    if(!value) {
      return value;
    }
    return value.replace('.mp3', '');
  }
}