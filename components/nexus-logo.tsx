import type { SVGProps } from "react"

/**
 * NEXUS Sports orbital mark.
 * A central node with an orbiting satellite on an elliptical path —
 * representing conexion y evolucion, per the brand guidelines.
 */
export function NexusMark({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Elliptical orbit */}
      <ellipse
        cx="24"
        cy="24"
        rx="21"
        ry="9.5"
        transform="rotate(-32 24 24)"
        stroke="currentColor"
        strokeWidth="2.4"
        opacity="0.85"
      />
      {/* Core node */}
      <circle cx="24" cy="24" r="6" fill="currentColor" />
      {/* Orbiting satellite */}
      <circle cx="39" cy="15" r="3.2" fill="currentColor" />
    </svg>
  )
}
