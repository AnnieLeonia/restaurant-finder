import { useCallback, useEffect, useMemo, useState } from "react";

import { RestaurantsResponse } from "@/common/types";
import axios from "axios";

import { baseUrl } from "../constants";

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
  const [data, setData] = useState<RestaurantsResponse>({
    results: [],
    total: 0,
    status: "",
  });
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
      const response = await axios.request<RestaurantsResponse>(options);
      setData(response.data);
      setIsLoading(false);
    } catch (err: any) {
      setError(err);
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
