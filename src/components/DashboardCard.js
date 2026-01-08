<<<<<<< HEAD
import React from \"react\";
=======
﻿import React from \"react\";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import \"./DashboardCard.css\";

function DashboardCard({ title, live, children, gradient }) {
  return (
    <div
      className=\"dashboard-card\"
      style={{
        background: gradient || \"linear-gradient(90deg,#e3f2fd 0%,#e8f5e9 100%)\",
      }}
    >
      <div className=\"dashboard-card-header\">
        <span>{title}</span>
        {live && <span className=\"dashboard-card-live\">LIVE</span>}
      </div>
      <div className=\"dashboard-card-content\">{children}</div>
    </div>
  );
}

export default DashboardCard;
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
