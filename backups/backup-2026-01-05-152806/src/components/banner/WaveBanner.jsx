import React from "react";

export default function WaveBanner() {
  return (
    <div style={{background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", padding: "60px 20px", textAlign: "center"}}>
      <style>{`
        @keyframes wave {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .wave-letter {
          display: inline-block;
          animation: wave 2s ease-in-out infinite;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .wave-letter:hover {
          transform: translateY(-20px) scale(1.2) !important;
          filter: drop-shadow(0 0 15px currentColor);
        }
      `}</style>
      <div style={{fontSize: "48px", fontWeight: "300", letterSpacing: "2px"}}>
        {"AuditDNA Mexico Real Estate".split("").map((c,i)=>(
          <span
            key={i}
            className="wave-letter"
            style={{
              animationDelay: `${i*0.1}s`,
              background: i%2===0 
                ? "linear-gradient(45deg,#c0c0c0,#f0f0f0)"
                : "linear-gradient(45deg,#7dd3fc,#38bdf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            {c===" " ? "\u00A0" : c}
          </span>
        ))}
      </div>
    </div>
  );
}