<<<<<<< HEAD
import React, { useEffect, useRef, useState } from "react";
=======
ï»¿import React, { useEffect, useRef, useState } from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

function useClickSound(enabled) {
  const ctxRef = useRef(null);
  useEffect(() => {
    if (!enabled) return;
    ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return () => {
      try {
        ctxRef.current?.close();
      } catch {}
    };
  }, [enabled]);
  const play = () => {
    if (!enabled || !ctxRef.current) return;
    const ctx = ctxRef.current;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "square";
    o.frequency.setValueAtTime(440, ctx.currentTime);
    g.gain.setValueAtTime(0.05, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.09);
  };
  return play;
}

export default function SoundToggle() {
  const saved = localStorage.getItem("auditdna_sound");
  const [enabled, setEnabled] = useState(saved !== "off");
  const play = useClickSound(enabled);

  useEffect(() => {
    localStorage.setItem("auditdna_sound", enabled ? "on" : "off");
  }, [enabled]);

  return (
    <button
      className="btn"
      onClick={() => {
        setEnabled((e) => !e);
        play();
      }}
      title="Toggle UI sounds"
    >
      {enabled ? " Sound ON" : " Sound OFF"}
    </button>
  );
}

// helper exported for other components (optional)
export const uiClick = () => {
  const s = localStorage.getItem("auditdna_sound") !== "off";
  if (!s) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "square";
    o.frequency.value = 480;
    g.gain.value = 0.06;
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.07);
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.08);
    setTimeout(() => ctx.close(), 120);
  } catch {}
};
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

