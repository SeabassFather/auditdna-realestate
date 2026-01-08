<<<<<<< HEAD
```jsx
=======
ï»¿```jsx
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
// frontend/src/components/GrowerDashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../utils/api';

export default function GrowerDashboard({ growerId }) {
  const [verifications, setVerifications] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!growerId) return;
    api.get(`/api/grower/${growerId}/verifications`).then(r => r.json()).then(data => setVerifications(data.verifications || []));
    api.get(`/api/grower/${growerId}/notifications`).then(r => r.json()).then(data => setNotifications(data.notifications || []));
  }, [growerId]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Grower Dashboard</h2>

      <section>
        <h3>Active Verifications</h3>
        <ul>
          {verifications.map(v => (
            <li key={v.id}>
<<<<<<< HEAD
              {v.product_name}  {v.verification_id}  status: {v.status}  valid until: {v.valid_until}
=======
              {v.product_name}  {v.verification_id}  status: {v.status}  valid until: {v.valid_until}
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
              <div><a href={`/produce-science/verify?id=${v.verification_id}`}>View Report</a></div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Notifications</h3>
        <ul>
          {notifications.map(n => (
            <li key={n.id}>
              [{new Date(n.created_at).toLocaleDateString()}] {n.message}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

