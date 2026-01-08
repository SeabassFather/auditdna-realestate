<<<<<<< HEAD
```jsx
=======
ï»¿```jsx
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
// frontend/src/components/AttestationForm.jsx
import React, { useState } from 'react';
import api from '../utils/api';

export default function AttestationForm({ verificationId }) {
  const [importerName, setImporterName] = useState('');
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState('');

  async function submit(e) {
    e.preventDefault();
    const resp = await api.post('/api/attest', { verification_id: verificationId, importer_name: importerName, rating, comments });
    if (resp.ok) {
      alert('Thank you for the feedback.');
      setImporterName(''); setRating(5); setComments('');
    } else {
      alert('Error sending attestation');
    }
  }

  return (
    <form onSubmit={submit} className="attest-form">
      <div>
        <label>Importer / Buyer name</label>
        <input value={importerName} onChange={e => setImporterName(e.target.value)} required />
      </div>
      <div>
        <label>Rating (1-5)</label>
        <select value={rating} onChange={e => setRating(Number(e.target.value))}>
          {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div>
        <label>Comments</label>
        <textarea value={comments} onChange={e => setComments(e.target.value)} />
      </div>
      <button className="btn" type="submit">Submit Attestation</button>
    </form>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

