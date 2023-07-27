import { Request } from "express";

export function getStringQueryParam(req: Request, paramName: string) {
  const paramValue = req.query[paramName] || "";

  if (!paramValue) return undefined;

  if (typeof paramValue !== "string") {
    throw new Error(`Invalid ${paramName} value`);
  }

  return paramValue;
}

export function calculateWalkingTime(distanceInMeters: number) {
  const walkingSpeed = 1.2;
  const walkingTimeInSeconds = distanceInMeters / walkingSpeed;
  return Math.ceil(walkingTimeInSeconds / 60);
}

export function toMap<T>(array: T[], key: keyof T) {
  return new Map(array.map(item => [item[key], item]));
}

export function uniqueArray<T>(arr: T[], fn: (item: T) => any) {
  return arr.filter((item, index) => {
    const value = fn(item);
    const firstIndex = arr.findIndex(obj => {
      return fn(obj) === value;
    });
    return index === firstIndex;
  });
}
