import { Camera, Color } from "@/types/canvas";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const COLORS = [
  "#dc2626",
  "#f97316",
  "#fbbf24",
  "#84cc16",
  "#22c55e",
  "#064e3b",
  "#2dd4bf",
  "#0369a1",
  "#2563eb",
  "#8b5cf6",
  "#c026d3",
  "#be185d",
  "#4c0519",
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
}

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera,
) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
}
export function colorToCss(color: Color) {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g
    .toString(16)
    .padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
}
