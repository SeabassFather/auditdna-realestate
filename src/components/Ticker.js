<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
﻿import React, { useEffect, useState } from 'react';
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
const sampleData = [
  { label: 'Avocados', value: 27.45, change: +1.2 },
  { label: 'Mortgage 30Y', value: 6.85, change: -0.05 },
  { label: 'Factoring Advance', value: 82, change: +0.7 },
  { label: 'Water Index', value: 103.2, change: -1.1 },
  { label: 'Carbon Credit', value: 19.8, change: +2.3 }
];
export default function Ticker() {
  const [data, setData] = useState(sampleData);
  useEffect(() => {
    const int = setInterval(() => {
      setData(prev => prev.map(item => {
        let rand = (Math.random() - 0.5) * 2;
        return { ...item, value: +(item.value + rand).toFixed(2), change: +(rand).toFixed(2) };
      }));
    }, 4000);
    return () => clearInterval(int);
  }, []);
  return (
    <div className="ticker-bar">
      <div className="ticker-track">
        {data.map((item,i)=>(
          <div key={i} className={"ticker-item "+(item.change>=0?"up":"down")}>
            <span className="label">{item.label}</span>
            <span className="value">{item.value}</span>
            <span className="change">{item.change>=0?"":""} {item.change}</span>
          </div>
        ))}
      </div>
    </div>
  );
}



<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
