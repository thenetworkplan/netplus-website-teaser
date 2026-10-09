import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

function Svg({ children, className = "size-5", ...rest }: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...rest}
    >
      {children}
    </svg>
  );
}

export const Wrench = (p: P) => (
  <Svg {...p}>
    <path d="M14.5 6.5a4 4 0 005 5l-8 8a2.1 2.1 0 01-3-3z" />
    <path d="M4 4l5 5M3.5 6.5l3-3" />
  </Svg>
);
export const Plane = (p: P) => (
  <Svg {...p}>
    <path d="M21 15.5v-1.8l-7.5-4.6V4.2a1.5 1.5 0 00-3 0v4.9L3 13.7v1.8l7.5-2.3v4.4l-2 1.5v1.4l3.5-1 3.5 1v-1.4l-2-1.5v-4.4z" />
  </Svg>
);
export const Shield = (p: P) => (
  <Svg {...p}>
    <path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6z" />
    <path d="M12 8v4.5M12 15.5v.01" />
  </Svg>
);
export const ShieldCheck = (p: P) => (
  <Svg {...p}>
    <path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6z" />
    <path d="M8.5 12l2.5 2.5 4.5-5" />
  </Svg>
);
export const Headset = (p: P) => (
  <Svg {...p}>
    <path d="M4 14v-2a8 8 0 0116 0v2" />
    <rect x="3" y="13" width="4" height="6" rx="1.5" />
    <rect x="17" y="13" width="4" height="6" rx="1.5" />
    <path d="M19 19c0 1.5-1.5 2.5-4 2.5h-2" />
  </Svg>
);
export const Medal = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="14.5" r="5.5" />
    <path d="M8.5 10L6 3h4l2 4 2-4h4l-2.5 7" />
    <path d="M12 12.3l.8 1.5 1.7.3-1.2 1.2.3 1.7-1.6-.8-1.6.8.3-1.7-1.2-1.2 1.7-.3z" />
  </Svg>
);
export const Sliders = (p: P) => (
  <Svg {...p}>
    <path d="M5 4v16M12 4v16M19 4v16" />
    <rect x="3" y="13" width="4" height="3" rx="1" />
    <rect x="10" y="7" width="4" height="3" rx="1" />
    <rect x="17" y="15" width="4" height="3" rx="1" />
  </Svg>
);
export const Globe = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
  </Svg>
);
export const Gauge = (p: P) => (
  <Svg {...p}>
    <path d="M4 17a8 8 0 1116 0" />
    <path d="M12 17l4-5" />
    <circle cx="12" cy="17" r="1.2" />
  </Svg>
);
export const Users = (p: P) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 20a6 6 0 0112 0" />
    <circle cx="17" cy="9" r="2.4" />
    <path d="M16.5 14.2A4.8 4.8 0 0121 19" />
  </Svg>
);
export const Chart = (p: P) => (
  <Svg {...p}>
    <path d="M4 20V4M4 20h16" />
    <path d="M7.5 15l3.5-4 3 2.5 5-6.5" />
  </Svg>
);
export const Sparkle = (p: P) => (
  <Svg {...p}>
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
    <path d="M19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z" />
  </Svg>
);
export const ArrowUp = (p: P) => (
  <Svg {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </Svg>
);
export const Menu = (p: P) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);
export const Close = (p: P) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Svg>
);
export const Sun = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
  </Svg>
);
export const Moon = (p: P) => (
  <Svg {...p}>
    <path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z" />
  </Svg>
);
