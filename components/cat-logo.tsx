import type React from "react"

const CatLogo: React.FC = () => {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Cat face */}
      <circle cx="50" cy="50" r="45" fill="#FFD166" />

      {/* Ears */}
      <polygon points="25,25 15,5 35,15" fill="#FFD166" stroke="#000" strokeWidth="2" />
      <polygon points="75,25 85,5 65,15" fill="#FFD166" stroke="#000" strokeWidth="2" />

      {/* Eyes */}
      <ellipse cx="35" cy="40" rx="8" ry="10" fill="#fff" stroke="#000" strokeWidth="1" />
      <ellipse cx="65" cy="40" rx="8" ry="10" fill="#fff" stroke="#000" strokeWidth="1" />

      {/* Pupils */}
      <ellipse cx="35" cy="40" rx="4" ry="8" fill="#000" />
      <ellipse cx="65" cy="40" rx="4" ry="8" fill="#000" />

      {/* Nose */}
      <polygon points="50,55 45,60 55,60" fill="#FF6B6B" />

      {/* Mouth */}
      <path d="M 40 65 Q 50 75 60 65" fill="none" stroke="#000" strokeWidth="2" />

      {/* Whiskers */}
      <line x1="30" y1="60" x2="10" y2="55" stroke="#000" strokeWidth="1" />
      <line x1="30" y1="65" x2="10" y2="65" stroke="#000" strokeWidth="1" />
      <line x1="30" y1="70" x2="10" y2="75" stroke="#000" strokeWidth="1" />

      <line x1="70" y1="60" x2="90" y2="55" stroke="#000" strokeWidth="1" />
      <line x1="70" y1="65" x2="90" y2="65" stroke="#000" strokeWidth="1" />
      <line x1="70" y1="70" x2="90" y2="75" stroke="#000" strokeWidth="1" />
    </svg>
  )
}

export default CatLogo
