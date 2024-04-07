import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'countdown',
    standalone: true,
  })

  export class CountdownPipe implements PipeTransform {
    transform(value: Date): number {
        const now = new Date();
        const targetDate = new Date(value);
    
        // Calculate the difference in milliseconds
        const diff = targetDate.getTime() - now.getTime();
    
        // Convert milliseconds to seconds
        const secondsRemaining = Math.floor(diff / 1000);
    
        return secondsRemaining;
  }
}