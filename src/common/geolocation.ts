import { Distance, Location } from "./types";
import { calculateWalkingTime } from "./utils";

export class Geolocation {
  public lat: number;
  public lng: number;

  constructor(location: Location) {
    this.lat = location.lat;
    this.lng = location.lng;
  }

  public distance(other: { lat: number; lng: number }): Distance {
    const { lat: lat1, lng: lng1 } = this;
    const { lat: lat2, lng: lng2 } = other;

    if (!lat1 || !lng1 || !lat2 || !lng2) return { meters: 0, minutes: 0 };

    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    return { meters: Math.round(d), minutes: calculateWalkingTime(d) };
  }

  public nearbyGeolocations(radius: number): Geolocation[] {
    const earthRadius = 6371000;
    const unit = ((radius / earthRadius) * 180) / Math.PI;
    const straight = (unit * Math.sqrt(3)) / 2;
    const diagonal = (unit * 3) / 2;

    return [
      new Geolocation({ lat: this.lat + straight * 2, lng: this.lng }),
      new Geolocation({ lat: this.lat - straight * 2, lng: this.lng }),
      new Geolocation({ lat: this.lat + straight, lng: this.lng - diagonal }),
      new Geolocation({ lat: this.lat + straight, lng: this.lng + diagonal }),
      new Geolocation({ lat: this.lat - straight, lng: this.lng - diagonal }),
      new Geolocation({ lat: this.lat - straight, lng: this.lng + diagonal }),
    ];
  }

  public toString() {
    return `${this.lat},${this.lng}`;
  }

  public truncate() {
    return new Geolocation({
      lat: Math.round(this.lat * 100) / 100,
      lng: Math.round(this.lng * 100) / 100,
    });
  }
}

export default Geolocation;
