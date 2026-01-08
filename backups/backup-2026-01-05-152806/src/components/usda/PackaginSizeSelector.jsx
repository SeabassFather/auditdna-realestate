import React from "react";
export default function PackagingSizeSelector({ commodity, selected, onSelect }) {
  return (
    <div className="p-6">
      <p className="font-bold">Packaging Size Selector  for {commodity?.name || "Commodity"}</p>
    </div>
  );
}

