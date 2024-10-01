"use client";

import { Color } from "@/types/canvas";
import { colorToCss } from "@/lib/utils";

interface ColorPickerProps {
  onChange: (color: Color) => void;
}

export const ColorPicker = ({ onChange }: ColorPickerProps) => {
  return (
    <>
      <div className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200">
        {/* Black - White - Gray */}
        <ColorButton onClick={onChange} color={{ r: 0, g: 0, b: 0 }} />
        <ColorButton onClick={onChange} color={{ r: 255, g: 255, b: 255 }} />
        <ColorButton onClick={onChange} color={{ r: 128, g: 128, b: 128 }} />
        {/* Red */}
        <ColorButton onClick={onChange} color={{ r: 220, g: 38, b: 38 }} />
        {/* Blue */}
        <ColorButton onClick={onChange} color={{ r: 14, g: 165, b: 233 }} />
        {/* Violet */}
        <ColorButton onClick={onChange} color={{ r: 138, g: 43, b: 226 }} />
        {/* Green */}
        <ColorButton onClick={onChange} color={{ r: 25, g: 152, b: 0 }} />
        {/* Yellow */}
        <ColorButton onClick={onChange} color={{ r: 255, g: 204, b: 0 }} />
      </div>
    </>
  );
};

interface ColorButtonProps {
  color: Color;
  onClick: (color: Color) => void;
}
const ColorButton = ({ color, onClick }: ColorButtonProps) => {
  return (
    <>
      <button
        className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition"
        onClick={() => onClick(color)}
      >
        <div
          className="h-8 w-8 rounded-md border border-neutral-300"
          style={{ background: colorToCss(color) }}
        />
      </button>
    </>
  );
};
