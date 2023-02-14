import { Component } from '@angular/core';
import { RequestService } from '../request.service';
import { Item } from './item';

@Component({
  selector: 'app-data',
  templateUrl: './app-data.component.html',
  styleUrls: ['./app-data.component.scss']
})
export class AppDataComponent {
  constructor(private service: RequestService) { }
  response: any;

  private days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  public ITEMS: Item[] = [];

  ngOnInit() {
    this.service.getRequest()
      .subscribe(response => {
        this.response = response;
        this.formatResults(this.response.list);
      });
  }

  getWindDirection(degree: number) {
    const degreePerDirection = 360 / 8;
    const offsetAngle = degree + degreePerDirection / 2;

    return offsetAngle >= 0 * degreePerDirection &&
      offsetAngle < 1 * degreePerDirection
      ? "N"
      : offsetAngle >= 1 * degreePerDirection &&
        offsetAngle < 2 * degreePerDirection
        ? "NE"
        : offsetAngle >= 2 * degreePerDirection &&
          offsetAngle < 3 * degreePerDirection
          ? "E"
          : offsetAngle >= 3 * degreePerDirection &&
            offsetAngle < 4 * degreePerDirection
            ? "SE"
            : offsetAngle >= 4 * degreePerDirection &&
              offsetAngle < 5 * degreePerDirection
              ? "S"
              : offsetAngle >= 5 * degreePerDirection &&
                offsetAngle < 6 * degreePerDirection
                ? "SW"
                : offsetAngle >= 6 * degreePerDirection &&
                  offsetAngle < 7 * degreePerDirection
                  ? "W"
                  : "NW";
  }

  formatResults(response: any) {
    let filteredList = response.filter((item: any, index: number) => {
      if (
        index === 0 ||
        index === 8 ||
        index === 16 ||
        index === 24 ||
        index === 32
      ) {
        return item;
      }
    });

    for (let item of filteredList) {
      let temp = item.main.temp - 273.15;
      temp = Math.round(temp * 100 / 100);
      let date = new Date(item.dt_txt.substring(0, 10));
      let dayNumber = date.getDay();
      let day = this.days[dayNumber];
      let windDirection = this.getWindDirection(item.wind.deg);
      let windSpeed = Math.round((item.wind.speed * 2.2369362920544) * 100 / 100);

      this.ITEMS.push({
        day: day,
        temp: temp,
        weather: item.weather[0].main,
        iconClassName: `icon-${item.weather[0].icon}`,
        windDirection: windDirection,
        windSpeed: windSpeed,
        humidity: item.main.humidity
      })
    }
  }
}
