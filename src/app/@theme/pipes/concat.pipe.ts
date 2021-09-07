import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'concat' })
export class ConcatPipe implements PipeTransform {

  transform(input: string): string {
    if (input.length <= 20) {
      return  input;
    } else {
      return input.substr(0, 20 - 1);
    }
  }
}
