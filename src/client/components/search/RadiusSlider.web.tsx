import React from "react";

import { COLORS } from "@/client/constants";
import {
  MAX_RADIUS_METERS_USER,
  MIN_RADIUS_METERS,
} from "@/common/searchFilters";

import type { RadiusSliderProps } from "./RadiusSlider";

const { tertiary: accent, gray: trackBg } = COLORS;

const TRACK_HEIGHT = 4;
const THUMB_SIZE = 20;

/** Injected once: pseudo-elements cannot be styled via React inline style. */
const RANGE_SLIDER_STYLES = `
.rf-radius-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 40px;
  margin: 0;
  background: transparent;
  cursor: pointer;
}
.rf-radius-slider:focus {
  outline: none;
}
.rf-radius-slider:focus-visible {
  outline: 2px solid ${accent};
  outline-offset: 2px;
  border-radius: 4px;
}
.rf-radius-slider::-webkit-slider-runnable-track {
  height: ${TRACK_HEIGHT}px;
  border-radius: ${TRACK_HEIGHT / 2}px;
  background: linear-gradient(
    to right,
    ${accent} 0%,
    ${accent} var(--rf-fill, 0%),
    ${trackBg} var(--rf-fill, 0%),
    ${trackBg} 100%
  );
}
.rf-radius-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: ${THUMB_SIZE}px;
  height: ${THUMB_SIZE}px;
  margin-top: ${(THUMB_SIZE - TRACK_HEIGHT) / -2}px;
  border-radius: 50%;
  background: ${accent};
  border: none;
  box-shadow: 0 1px 2px rgba(14, 14, 14, 0.2);
}
.rf-radius-slider::-moz-range-track {
  height: ${TRACK_HEIGHT}px;
  border-radius: ${TRACK_HEIGHT / 2}px;
  background: ${trackBg};
}
.rf-radius-slider::-moz-range-progress {
  height: ${TRACK_HEIGHT}px;
  border-radius: ${TRACK_HEIGHT / 2}px;
  background: ${accent};
}
.rf-radius-slider::-moz-range-thumb {
  width: ${THUMB_SIZE}px;
  height: ${THUMB_SIZE}px;
  border: none;
  border-radius: 50%;
  background: ${accent};
  box-shadow: 0 1px 2px rgba(14, 14, 14, 0.2);
}
`;

/**
 * Web: native range input avoids @react-native-community/slider web issues (stuck thumb, snap to min).
 */
const RadiusSlider = ({
  committed,
  preview,
  onValueChange,
  onSlidingComplete,
}: RadiusSliderProps) => {
  const value = preview ?? committed;

  const fillPercent =
    ((value - MIN_RADIUS_METERS) /
      (MAX_RADIUS_METERS_USER - MIN_RADIUS_METERS)) *
    100;

  const commit = (el: HTMLInputElement) => {
    const v = Number(el.value);
    if (Number.isFinite(v)) onSlidingComplete(v);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: RANGE_SLIDER_STYLES }} />
      <input
        className="rf-radius-slider"
        type="range"
        min={MIN_RADIUS_METERS}
        max={MAX_RADIUS_METERS_USER}
        step={100}
        value={value}
        aria-label="Sökradie i meter"
        onInput={e => {
          const v = Number(e.currentTarget.value);
          if (Number.isFinite(v)) onValueChange(v);
        }}
        onPointerUp={e => commit(e.currentTarget)}
        onKeyUp={e => {
          if (
            e.key === "ArrowLeft" ||
            e.key === "ArrowRight" ||
            e.key === "Home" ||
            e.key === "End" ||
            e.key === "PageUp" ||
            e.key === "PageDown"
          ) {
            commit(e.currentTarget);
          }
        }}
        style={
          {
            // WebKit track gradient stop (pseudo-elements need <style> above).
            ["--rf-fill"]: `${fillPercent}%`,
          } as React.CSSProperties
        }
      />
    </>
  );
};

export default RadiusSlider;
