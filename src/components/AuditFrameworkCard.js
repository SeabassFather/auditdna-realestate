<<<<<<< HEAD
import React from \"react\";
=======
﻿import React from \"react\";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import DashboardCard from \"./DashboardCard\";

function AuditFrameworkCard({ workflowEngine, riskScoring, complianceModules }) {
  return (
    <DashboardCard title=\"Audit & Compliance Framework\" gradient=\"linear-gradient(90deg,#e3f2fd,#dcedc8)\">
      <div>
        {workflowEngine && (
          <div>{workflowEngine}</div>
        )}
        {riskScoring && (
          <div style={{ marginTop: \"8px\" }}>{riskScoring}</div>
        )}
        {complianceModules && (
          <div style={{ marginTop: \"8px\", fontSize: \"0.9rem\" }}>{complianceModules}</div>
        )}
      </div>
    </DashboardCard>
  );
}

export default AuditFrameworkCard;
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
