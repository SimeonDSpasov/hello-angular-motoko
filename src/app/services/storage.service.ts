import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  public getItem(item: string): string | null {
    const value = sessionStorage.getItem(item);

    return value ? JSON.parse(value) : null;
  }

  public setItem(item: string, value: any): void {
    sessionStorage.setItem(item, JSON.stringify(value));
  }

  public clear(): void {
    sessionStorage.clear();
  }

}
