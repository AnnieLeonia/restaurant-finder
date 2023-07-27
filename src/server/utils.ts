import { Request } from "express";

export function getStringQueryParam(req: Request, paramName: string) {
  const paramValue = req.query[paramName] || "";

  if (!paramValue) return undefined;

  if (typeof paramValue !== "string") {
    throw new Error(`Invalid ${paramName} value`);
  }

  return paramValue;
}
