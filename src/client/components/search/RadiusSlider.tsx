import Slider from "@react-native-community/slider";
import React from "react";

import { COLORS } from "@/client/constants";
import {
  MAX_RADIUS_METERS_USER,
  MIN_RADIUS_METERS,
} from "@/common/searchFilters";

import styles from "./searchFilters.style";

export interface RadiusSliderProps {
  /** Last committed radius (Slider stays tied to this until release — avoids web RN slider bugs). */
  committed: number;
  /** Shown next to the track; ignored for `value` on native. */
  preview: number | null;
  onValueChange: (value: number) => void;
  onSlidingComplete: (value: number) => void;
}

/**
 * iOS / Android: community slider; `value` stays on `committed` during drag (label uses `preview`).
 */
const RadiusSlider = ({
  committed,
  onValueChange,
  onSlidingComplete,
}: RadiusSliderProps) => (
  <Slider
    style={styles.slider}
    minimumValue={MIN_RADIUS_METERS}
    maximumValue={MAX_RADIUS_METERS_USER}
    step={100}
    value={committed}
    onValueChange={onValueChange}
    onSlidingComplete={onSlidingComplete}
    minimumTrackTintColor={COLORS.tertiary}
    maximumTrackTintColor={COLORS.gray}
    thumbTintColor={COLORS.tertiary}
  />
);

export default RadiusSlider;
