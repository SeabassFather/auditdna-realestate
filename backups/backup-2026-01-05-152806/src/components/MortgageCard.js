<<<<<<< HEAD
import React from \"react\";
=======
﻿import React from \"react\";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import DashboardCard from \"./DashboardCard\";

function MortgageCard({ thirtyYearRate, fifteenYearRate, trendData, auditInfo }) {
  return (
    <DashboardCard title=\"Mortgage Loans\" live gradient=\"linear-gradient(90deg,#e3f2fd,#f4d03f)\">
      <div>
        {thirtyYearRate && (
          <div>
            <strong>30Y Fixed:</strong> <span>{thirtyYearRate}</span>
          </div>
        )}
        {fifteenYearRate && (
          <div>
            <strong>15Y Fixed:</strong> <span>{fifteenYearRate}</span>
          </div>
        )}
        {trendData && (
          <div>{trendData}</div>
        )}
        {auditInfo && (
          <div style={{ fontSize: \"0.9rem\", marginTop: \"8px\" }}>
            {auditInfo}
          </div>
        )}
      </div>
    </DashboardCard>
  );
}

export default MortgageCard;
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
