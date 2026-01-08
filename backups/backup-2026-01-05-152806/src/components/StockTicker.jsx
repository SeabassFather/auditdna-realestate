<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
ï»¿import React, { useEffect, useState } from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import { fetchRealStocks } from "../utils/api";

export default function StockTicker() {
  const [stocks, setStocks] = useState({});
  const [scrollPosition, setScrollPosition] = useState(0);

  // Mock data fallback
  const mockStocks = {
    "S&P 500": { price: "$5,815.26", change: "+12.44", percent: "+0.21%" },
    "DOW": { price: "$42,863.86", change: "+431.63", percent: "+1.02%" },
    "NASDAQ": { price: "$18,342.94", change: "+108.70", percent: "+0.60%" },
    "AAPL": { price: "$231.41", change: "+1.25", percent: "+0.54%" },
    "GOOGL": { price: "$167.06", change: "-0.87", percent: "-0.52%" },
    "MSFT": { price: "$416.06", change: "+2.15", percent: "+0.52%" },
    "TSLA": { price: "$238.77", change: "+5.42", percent: "+2.32%" },
    "NVDA": { price: "$138.07", change: "-1.45", percent: "-1.04%" },
    "AMZN": { price: "$188.89", change: "+0.92", percent: "+0.49%" }
  };

  const displayStocks = Object.keys(stocks).length > 0 ? stocks : mockStocks;
  const stockEntries = Object.entries(displayStocks);

  // Fetch real stocks on mount
  useEffect(() => {
    const loadStocks = async () => {
      try {
        const realStocks = await fetchRealStocks();
        if (realStocks && Object.keys(realStocks).length > 0) {
          setStocks(realStocks);
        }
      } catch (err) {
        console.warn('Using mock stock data:', err);
      }
    };
    
    loadStocks();
    
    // Refresh every 60 seconds
    const refreshInterval = setInterval(loadStocks, 60000);
    return () => clearInterval(refreshInterval);
  }, []);

  // Auto-scroll animation
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition(prev => prev + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  if (stockEntries.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-900 text-white py-2 overflow-hidden">
      <div
        className="flex space-x-8"
        style={{
          transform: `translateX(-${scrollPosition % 400}px)`,
          transition: 'transform 0.05s linear'
        }}
      >
        {[...Array(3)].map((_, repeatIndex) => (
          stockEntries.map(([symbol, data], index) => {
            const isPositive = data.change && data.change.startsWith('+');
            const isNegative = data.change && data.change.startsWith('-');

            return (
              <div
                key={`${repeatIndex}-${index}`}
                className="flex items-center space-x-2 whitespace-nowrap text-sm"
              >
                <span className="font-bold">{symbol}</span>
                <span className="font-medium">{data.price}</span>
                {data.change && (
                  <span className={`text-xs ${
                    isPositive ? 'text-green-400' :
                    isNegative ? 'text-red-400' :
                    'text-gray-400'
                  }`}>
                    {data.change}
                  </span>
                )}
                {data.percent && (
                  <span className={`text-xs px-1 py-0.5 rounded ${
                    isPositive ? 'bg-green-500/20 text-green-400' :
                    isNegative ? 'bg-red-500/20 text-red-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {data.percent}
                  </span>
                )}
              </div>
            );
          })
        ))}
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

