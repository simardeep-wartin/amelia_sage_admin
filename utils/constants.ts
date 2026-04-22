/**
 * Shared gradient/style constants used across the app.
 * Centralising these prevents the same long arbitrary-value strings from
 * being duplicated in every component.
 */

/** Pastel tricolor gradient — used for icon circles and stat tiles. */
export const ICON_BG_GRADIENT =
  "bg-[linear-gradient(135deg,rgba(168,181,160,0.2)_0%,rgba(213,202,227,0.2)_50%,rgba(232,196,184,0.2)_100%)]";

/** Same gradient at a different angle — used for card rows / alert rows. */
export const ROW_BG_GRADIENT =
  "bg-[linear-gradient(175deg,rgba(168,181,160,0.2)_0%,rgba(213,202,227,0.2)_50%,rgba(232,196,184,0.2)_100%)]";

/** Stat tile gradient (165deg angle variant). */
export const TILE_BG_GRADIENT =
  "bg-[linear-gradient(165deg,rgba(168,181,160,0.2)_0%,rgba(213,202,227,0.2)_50%,rgba(232,196,184,0.2)_100%)]";
