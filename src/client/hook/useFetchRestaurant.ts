import { useCallback, useEffect, useMemo, useState } from "react";

import axios from "axios";

export interface RestaurantResponse {
  results: RestaurantResult[];
  total: number;
  status: string;
  statuses: Status[];
}

export interface RestaurantResult {
  name: string;
  rating: string;
  address: string;
  open_now?: boolean;
  photos: string[];
  location: Location;
  distance: Distance;
  types: string[];
  price_level?: number;
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

const useFetchRestaurant = () => {
  const [data, setData] = useState<RestaurantResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = useMemo(
    () => ({
      method: "GET",
      url: "https://eat.codies.se/api/restaurants?latitude=55.5914965&longitude=13.0001475&keyword=sushi",
      headers: {
        accept: "application/json",
      },
    }),
    [],
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
