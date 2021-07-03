import React from "react";

export const MenuIcon = ({
  color,
  height,
  width,
}: {
  color: string;
  height: number;
  width: number;
}) => {
  return (
    <svg
      height={height}
      viewBox="0 -53 384 384"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={color}
        d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
      />
      <path
        fill={color}
        d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
      />
      <path
        fill={color}
        d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
      />
    </svg>
  );
};
