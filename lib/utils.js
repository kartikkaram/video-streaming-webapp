import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let r = (hash >> 0) & 0xff;
  let g = (hash >> 8) & 0xff;
  let b = (hash >> 16) & 0xff;

  // Brighten each component
  r = Math.max(r, 100);
  g = Math.max(g, 100);
  b = Math.max(b, 100);

  // Avoid gray: if RGB values are too close, force color variation
  const grayThreshold = 15;
  if (Math.abs(r - g) < grayThreshold && Math.abs(r - b) < grayThreshold && Math.abs(g - b) < grayThreshold) {
    r = 255; // Force a strong color
    g = Math.min(g, 150);
    b = Math.min(b, 150);
  }

  return (
    "#" +
    [r, g, b]
      .map((x) => ("00" + x.toString(16)).slice(-2))
      .join("")
  );
}
