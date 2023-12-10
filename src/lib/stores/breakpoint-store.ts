import { mediaQuery } from "svelte-legos";
import { derived } from "svelte/store";

const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1400px",
};

const individualBreakpoints = Object.keys(breakpoints).map((breakpointKey) => {
  return mediaQuery(`(min-width: ${breakpoints[breakpointKey]})`);
});
export const breakpointsStore = derived(
  individualBreakpoints,
  ($individualBreakpoints) => {
    return Object.keys(breakpoints).reduce((acc, breakpointKey, index) => {
      const name = `is${breakpointKey[0].toUpperCase()}${breakpointKey.substring(
        1
      )}`;
      acc[name] = $individualBreakpoints[index];
      return acc;
    }, {});
  }
);
