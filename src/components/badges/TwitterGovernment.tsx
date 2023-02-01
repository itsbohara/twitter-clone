import React from "react";

export default function TwitterGovernmentBadge({ className }: { className? }) {
  return (
    <svg
      viewBox="0 0 22 22"
      aria-label="Verified account"
      role="img"
      className={className}
      data-testid="icon-verified"
    >
      <g>
        <path
          clip-rule="evenodd"
          d="M12.096 1.673c-.593-.635-1.599-.635-2.192 0L8.452 3.227c-.296.316-.714.49-1.147.474L5.18 3.63c-.867-.03-1.579.682-1.55 1.55l.072 2.125c.015.433-.158.851-.474 1.147L1.673 9.904c-.635.593-.635 1.599 0 2.192l1.554 1.452c.316.296.49.714.474 1.147L3.63 16.82c-.03.867.682 1.579 1.55 1.55l2.125-.072c.433-.015.851.158 1.147.474l1.452 1.555c.593.634 1.599.634 2.192 0l1.452-1.555c.296-.316.714-.49 1.147-.474l2.126.071c.867.03 1.579-.682 1.55-1.55l-.072-2.125c-.015-.433.158-.851.474-1.147l1.555-1.452c.634-.593.634-1.599 0-2.192l-1.555-1.452c-.316-.296-.49-.714-.474-1.147l.071-2.126c.03-.867-.682-1.579-1.55-1.55l-2.125.072c-.433.015-.851-.158-1.147-.474l-1.452-1.554zM6 11.39l3.74 3.74 6.2-6.77L14.47 7l-4.8 5.23-2.26-2.26L6 11.39z"
          fill="#829AAB"
          fill-rule="evenodd"
        ></path>
      </g>
    </svg>
  );
}