<<<<<<< HEAD
import React from \"react\";
=======
﻿import React from \"react\";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import DashboardCard from \"./DashboardCard\";

function CommoditiesCard({ avocadoStats, overlays, complianceInfo }) {
  return (
    <DashboardCard title=\"Commodities: Avocado Exports & Produce\" live gradient=\"linear-gradient(90deg,#e8f5e9,#f4d03f)\">
      <div>
        {avocadoStats && (
          <div>{avocadoStats}</div>
        )}
        {overlays && (
          <div>{overlays}</div>
        )}
        {complianceInfo && (
          <div style={{ marginTop: \"8px\", fontSize: \"0.9rem\" }}>
            {complianceInfo}
          </div>
        )}
      </div>
    </DashboardCard>
  );
}

export default CommoditiesCard;
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
