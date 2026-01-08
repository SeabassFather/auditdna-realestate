<<<<<<< HEAD
import React from \"react\";
=======
﻿import React from \"react\";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import DashboardCard from \"./DashboardCard\";

function ComplianceCard({ agencyStatus, auditFlows }) {
  return (
    <DashboardCard title=\"Cross-Border & Compliance\" gradient=\"linear-gradient(90deg,#e3f2fd,#c8e6c9)\">
      <div>
        {agencyStatus && (
          <div>{agencyStatus}</div>
        )}
        {auditFlows && (
          <div style={{ marginTop: \"10px\" }}>
            {auditFlows}
          </div>
        )}
      </div>
    </DashboardCard>
  );
}

export default ComplianceCard;
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
