<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
ï»¿import React, { useEffect, useState } from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import useTickers from "../hooks/useTickers";

export default function RateTicker() {
  const { rates, loading, error } = useTickers();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mock data fallback if API is not available
  const mockRates = {
    "30yr_fixed": { rate: "7.125%", change: "+0.125" },
    "15yr_fixed": { rate: "6.625%", change: "+0.075" },
    "5_1_arm": { rate: "6.250%", change: "+0.100" },
    "jumbo_30yr": { rate: "7.250%", change: "+0.150" },
    "fha_30yr": { rate: "6.875%", change: "+0.100" },
    "va_30yr": { rate: "6.750%", change: "+0.125" },
  };

  const displayRates = Object.keys(rates).length > 0 ? rates : mockRates;
  const rateEntries = Object.entries(displayRates);

  // Auto-scroll through rates
  useEffect(() => {
    if (rateEntries.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % rateEntries.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [rateEntries.length]);

  if (loading) {
    return (
      <div className="bg-blue-600 text-white py-2 px-4">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          <span className="text-sm">Loading rates...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-600 text-white py-2 px-4">
        <div className="flex items-center justify-center">
          <span className="text-sm">Unable to load current rates</span>
        </div>
      </div>
    );
  }

  if (rateEntries.length === 0) {
    return null;
  }

  const [rateKey, rateData] = rateEntries[currentIndex];
  const rateName = rateKey.replace(/_/g, ' ').toUpperCase();
  const isPositive = rateData.change && rateData.change.startsWith('+');
  const isNegative = rateData.change && rateData.change.startsWith('-');

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4">
      <div className="flex items-center justify-center space-x-4 text-sm">
<<<<<<< HEAD
        <span className="font-medium"> {rateName}:</span>
        <span className="font-medium">  {rateName}:</span>
=======
        <span className="font-medium">  {rateName}:</span>
        <span className="font-medium">  {rateName}:</span>
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
        <span className="font-bold text-lg">{rateData.rate}</span>
        {rateData.change && (
          <span className={`text-xs px-2 py-1 rounded ${
            isPositive ? 'bg-red-500/30' : 
            isNegative ? 'bg-green-500/30' : 
            'bg-gray-500/30'
          }`}>
            {rateData.change}
          </span>
        )}
        <div className="flex space-x-1 ml-4">
          {rateEntries.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

