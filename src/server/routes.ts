import * as express from "express";
import * as NodeCache from "node-cache";
import fetch from "node-fetch";

import Geolocation from "../common/geolocation";
import {
  PlaceSearchResponse,
  Restaurant,
  RestaurantsResponse,
} from "../common/types";
import { uniqueArray } from "../common/utils";
import { getStringQueryParam } from "./utils";

const apiKey = process.env.GOOGLE_PLACES_API_KEY;

if (!apiKey) {
  throw new Error("Missing Google Places API key");
}

// Google API endpoints
const placeSearchUrl =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const photoApiUrl = "https://maps.googleapis.com/maps/api/place/photo";

const router = express.Router();

const cache = new NodeCache({ stdTTL: 60 * 60 * 24 * 30 }); // 30 days
const photoUrls = new NodeCache({ stdTTL: 60 * 60 * 24 * 30 }); // 30 days

router.get("/api/hello", (req, res) => {
  res.json("Good day to you, sir!");
});

router.get("/api/restaurants", async (req, res) => {
  try {
    const latitude = getStringQueryParam(req, "latitude");
    const longitude = getStringQueryParam(req, "longitude");
    const radius = getStringQueryParam(req, "radius") || "1500";
    const keyword = getStringQueryParam(req, "keyword") || "";
    if (!latitude || !longitude) {
      throw new Error("Parameters latitude and longitude are required");
    }

    const origin = new Geolocation({ lat: +latitude, lng: +longitude });
    const locations: Geolocation[] = [];
    if (process.env.NODE_ENV !== "development") {
      locations.push(...origin.nearbyGeolocations(+radius));
    }

    const restaurants: Restaurant[] = [];
    let status = "OK";
    const statuses: { [key: string]: any } = [];
    let location = origin;
    let pagetoken = "";

    const cacheKey = `${origin.truncate().toString()},${radius},${keyword}`;
    const cachedData = cache.get<RestaurantsResponse>(cacheKey);

    if (cachedData) {
      cachedData.results.forEach(restaurant => {
        restaurant.distance = origin.distance(restaurant.location);
      });
      return res.json({ cached: true, ...cachedData });
    }

    while (true) {
      const params = new URLSearchParams({
        location: location.toString(),
        radius, // meters
        type: "restaurant",
        keyword,
        key: apiKey,
        pagetoken,
      });

      const searchApiUrl = `${placeSearchUrl}?${params.toString()}`;
      const response = await fetch(searchApiUrl);
      const data: PlaceSearchResponse = await response.json();
      const { results, next_page_token, ...rest } = data;

      if (data.status !== "OK") {
        status = data.status;
      } else if (pagetoken && !next_page_token && results.length === 20) {
        status = "MAX_RESULTS_LIMIT";
      }

      statuses.push({
        results: results.length,
        next_page_token: !!next_page_token,
        ...rest,
      });
      restaurants.push(
        ...results
          .filter(
            establishment => establishment.business_status === "OPERATIONAL",
          )
          .map(establishment => ({
            name: establishment.name,
            rating:
              establishment.rating + ` (${establishment.user_ratings_total})`,
            address: establishment.vicinity,
            open_now: establishment.opening_hours?.open_now,
            price_level: establishment.price_level,
            photos: (establishment.photos || []).map(
              photo => `/api/photo/${photo.photo_reference}`,
            ),
            location: new Geolocation(establishment.geometry.location),
            distance: origin.distance(establishment.geometry.location),
            types: establishment.types,
          })),
      );

      if (!next_page_token && !locations.length) {
        break;
      }

      await new Promise(resolve => setTimeout(resolve, 2000));

      if (next_page_token) {
        pagetoken = next_page_token;
      } else {
        location = locations.pop()!;
        pagetoken = "";
      }
    }

    const uniqueRestaurants = uniqueArray(restaurants, r =>
      r.location.toString(),
    );
    const sortedRestaurants = uniqueRestaurants.sort((a, b) =>
      a.name.localeCompare(b.name),
    );

    const data = {
      results: sortedRestaurants,
      total: sortedRestaurants.length,
      status,
      statuses,
    };

    cache.set<RestaurantsResponse>(cacheKey, data);
    return res.json(data);
  } catch (error: any) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ message: error.message });
  }
});

router.get("/api/photo/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const cachedUrl = photoUrls.get<string>(id);
    const params = new URLSearchParams({
      photoreference: id,
      maxheight: "400",
      key: apiKey,
    });
    const url = cachedUrl || `${photoApiUrl}?${params.toString()}`;
    const image = await fetch(url);
    photoUrls.set(id, url);

    const buffer = await image.arrayBuffer();
    const blob = await Buffer.from(buffer);

    return res.send(blob);
  } catch (error: any) {
    console.error("Error fetching data:", error);
    photoUrls.del(req.params.id);
    return res.status(500).json({ message: error.message });
  }
});

export default router;
