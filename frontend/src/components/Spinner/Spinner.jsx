import { ClipLoader } from "react-spinners";
import React from "react";
import { useSelector } from "react-redux";

export default function Spinner({ size = 50 }) {
  const mode = useSelector((state) => state.toggle.mode);

  // Set color based on theme
  const color = mode === "dark" ? "#60A5FA" : "#1D4ED8"; // Light blue for dark mode, dark blue for light mode

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ClipLoader color={color} size={size} />
    </div>
  );
}
