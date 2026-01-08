<<<<<<< HEAD
import React from \"react\";
=======
﻿import React from \"react\";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import DashboardCard from \"./DashboardCard\";

function VoipCard({ pbxStatus, balance, credit, activeLines, workflowInfo }) {
  return (
    <DashboardCard title=\"Zadarma / VoIP/Telecom\" gradient=\"linear-gradient(90deg,#e3f2fd,#fffde7)\">
      <div>
        {pbxStatus && (
          <div>
            <strong>PBX Status:</strong> <span>{pbxStatus}</span>
          </div>
        )}
        {(balance || credit || activeLines) && (
          <div>
            {balance && <span><strong>Balance:</strong> {balance}</span>}<br />
            {credit && <span><strong>Credit:</strong> {credit}</span>}<br />
            {activeLines && <span><strong>Active Lines:</strong> {activeLines}</span>}
          </div>
        )}
        {workflowInfo && (
          <div style={{ marginTop: \"8px\", fontSize: \"0.9rem\" }}>
            {workflowInfo}
          </div>
        )}
      </div>
    </DashboardCard>
  );
}

export default VoipCard;
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
