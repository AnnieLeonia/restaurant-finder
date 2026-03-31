import { useCallback, useEffect, useMemo, useState } from "react";

import { RestaurantsResponse } from "@/common/types";
import axios, { AxiosError } from "axios";

import { baseUrl } from "../constants";

export interface RestaurantRequestProps {
  lat: number;
  lng: number;
  keyword?: string;
  /** Search radius in meters (Google Places max 50_000). */
  distance: number;
}

const emptyResponse = (): RestaurantsResponse => ({
  results: [],
  total: 0,
  status: "",
});

const useFetchRestaurant = ({
  lat,
  lng,
  keyword,
  distance,
}: RestaurantRequestProps) => {
  const [data, setData] = useState<RestaurantsResponse>(emptyResponse());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  const options = useMemo(() => {
    const params = new URLSearchParams({
      latitude: String(lat),
      longitude: String(lng),
      radius: String(distance),
    });
    if (keyword) {
      params.set("keyword", keyword);
    }
    return {
      method: "GET" as const,
      url: `${baseUrl}/api/restaurants?${params.toString()}`,
      headers: {
        accept: "application/json",
      },
    };
  }, [lat, lng, keyword, distance]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.request<RestaurantsResponse>(options);
      setData(response.data);
    } catch (err: unknown) {
      setError(err as AxiosError);
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
