export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="plg"
          x1="0"
          y1="0"
          x2="160"
          y2="160"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#5ECBB8" />
          <stop offset="100%" stopColor="#2E7A6C" />
        </linearGradient>
      </defs>
      <rect width="160" height="160" rx="38" fill="url(#plg)" />
      <rect
        x="1.5"
        y="1.5"
        width="157"
        height="157"
        rx="36.5"
        stroke="white"
        strokeOpacity="0.14"
        strokeWidth="1.5"
        fill="none"
      />
      <rect x="36" y="34" width="22" height="92" rx="11" fill="white" />
      <path
        d="M 58 34 A 34 34 0 0 1 58 90"
        stroke="white"
        strokeWidth="22"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="122" cy="122" r="16" fill="#FF9933" />
      <circle
        cx="122"
        cy="122"
        r="7"
        stroke="#0A3380"
        strokeWidth="2"
        fill="none"
        opacity="0.55"
      />
    </svg>
  )
}
