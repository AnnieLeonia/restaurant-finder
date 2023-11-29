import { useCallback, useEffect, useMemo, useState } from "react";

import axios from "axios";

import { baseUrl } from "../constants";

export interface RestaurantResponse {
  results: RestaurantResult[];
  total: number;
  status: string;
  statuses: Status[];
}

export interface RestaurantResult {
  name: string;
  rating: number;
  reviews: number;
  address: string;
  open_now?: boolean;
  photos: string[];
  types: string[];
  price_level?: number;
  location: Location;
  distance: Distance;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Distance {
  meters: number;
  minutes: number;
}

export interface Status {
  results: number;
  next_page_token: boolean;
  html_attributions: any[];
  status: string;
}

export interface RestaurantRequestProps {
  lat: number;
  lng: number;
  keyword?: string;
  distance?: number;
}

const useFetchRestaurant = ({
  lat,
  lng,
  keyword,
  distance,
}: RestaurantRequestProps) => {
  const [data, setData] = useState<RestaurantResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = useMemo(
    () => ({
      method: "GET",
      url: `${baseUrl}/api/restaurants?latitude=${lat}&longitude=${lng}
      ${keyword ? `&keyword=${keyword}` : ""}
      ${distance ? `&radius=${distance}` : "&radius=30000"}`,
      headers: {
        accept: "application/json",
      },
    }),
    [lat, lng, keyword, distance],
  );

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.request<RestaurantResponse>(options);

      setData(response.data.results);
      setIsLoading(false);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, fetchData };
};

export default useFetchRestaurant;
