<<<<<<< HEAD
```jsx
=======
ï»¿```jsx
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
// frontend/src/components/VerificationPortal.jsx
import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import QRCode from 'qrcode.react';

export default function VerificationPortal({ verificationIdParam }) {
  const [verification, setVerification] = useState(null);
  const verificationId = verificationIdParam || new URLSearchParams(window.location.search).get('id');

  useEffect(() => {
    if (!verificationId) return;
    api.get(`/api/verify/report/${verificationId}`).then(async res => {
      const json = await res.json();
      setVerification(json.verification);
    }).catch(e => console.error(e));
  }, [verificationId]);

  if (!verification) return <div>Loading...</div>;

  const { verification_id, status, analysis_report, farm_name, product_name, valid_until, digital_signature } = verification;

  return (
    <div style={{ padding: 20 }}>
<<<<<<< HEAD
      <h1>Standards Verification Report  AuditDNA</h1>
      <h2>{farm_name}  {product_name}</h2>
=======
      <h1>Standards Verification Report  AuditDNA</h1>
      <h2>{farm_name}  {product_name}</h2>
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
      <div>Status: <strong>{status}</strong></div>
      <div>Verification ID: {verification_id}</div>
      <div>Valid until: {valid_until}</div>

      <div style={{ marginTop: 20 }}>
        <h3>Summary</h3>
        <div>Overall score: {analysis_report?.overall_score}%</div>
        <div>Pass probability: {analysis_report?.pass_probability}%</div>
        <div>Recommendations:</div>
        <ul>
          {analysis_report?.recommendations?.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>Digital Signature</h3>
        <div>{digital_signature}</div>
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>QR Code (scan to open this report)</h3>
        <QRCode value={window.location.href} size={200} />
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

