import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function LivePriceWebsocket({ zone = "all" }) {
  const [prices, setPrices] = useState([]);
  useEffect(() => {
    const socket = io("http://localhost:5050");
    socket.emit("subscribePrices", { zone });
    socket.on("priceUpdate", price => {
      setPrices(p => [price, ...p].slice(0, 50));
    });
    return () => socket.disconnect();
  }, [zone]);

  return (
    <div style={{
      background:'#1e293b',padding:24,borderRadius:12,
      color:'#10b981',maxWidth:600,margin:"0 auto"
    }}>
      <h2> Real-time Price Feed ({zone})</h2>
      <ul style={{listStyle:'none',padding:0}}>
        {prices.map((p, i) => (
          <li key={i}>
            <b>{p.product}</b>, Zone: {p.zone}  <span style={{color:'#f59e0b'}}>${p.price}</span> &nbsp;
            <span style={{color:'#38bdf8'}}>{new Date(p.timestamp).toLocaleTimeString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

