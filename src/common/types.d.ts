import Geolocation from "./geolocation";

export interface Restaurant {
  name: string;
  rating: string;
  address: string;
  photos: string[];
  types: string[];
  open_now?: boolean;
  price_level: number;
  location: Geolocation;
  distance: Distance;
}

export interface RestaurantsResponse {
  results: Restaurant[];
  total: number;
  status: string;
  statuses: { [key: string]: any };
}

export interface Distance {
  meters: number;
  minutes: number;
}

export interface PlaceSearchResponse {
  results: Establishment[];
  status: string;
  next_page_token: string;
  [key: string]: any;
}

export interface Establishment {
  business_status: "OPERATIONAL" | "CLOSED_TEMPORARILY" | "CLOSED_PERMANENTLY";
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours?: OpeningHours;
  photos?: Photo[];
  place_id: string;
  plus_code: PlusCode;
  price_level: number;
  rating: number;
  reference: string;
  scope: string;
  types: string[];
  user_ratings_total: number;
  vicinity: string;
}

export interface Geometry {
  location: Location;
  viewport: Viewport;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Viewport {
  northeast: Location;
  southwest: Location;
}

export interface OpeningHours {
  open_now: boolean;
}

export interface Photo {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}

export interface PlusCode {
  compound_code: string;
  global_code: string;
}

export enum Scope {
  Google = "GOOGLE",
}
