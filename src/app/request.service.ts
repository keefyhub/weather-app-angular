import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiKey = "b949a98c4939fc9af1f13538f5467c2a";
  private city = "littlehampton, uk";
  private url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&appid=${this.apiKey}`;

  constructor(private httpClient: HttpClient) { }

  getRequest(){
    return this.httpClient.get(this.url);
  }
}
