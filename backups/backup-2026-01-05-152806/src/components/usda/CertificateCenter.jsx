<<<<<<< HEAD
import React, { useState } from "react";
=======
ï»¿import React, { useState } from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
export default function CertificatesCenter() {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const handleUpload = async () => {
    const fd = new FormData();
    fd.append("certificate", file);
    await fetch("/api/usda/certificates", { method:"POST", body:fd });
    setUploaded(true);
  };
  return (
    <div className="bg-white rounded-xl shadow p-8">
      <h2 className="text-xl font-bold mb-4">Certificates & Compliance Upload</h2>
      <input type="file" accept=".pdf,.jpg,.png" onChange={e=>setFile(e.target.files[0])}/>
      <button className="bg-green-600 text-white px-6 py-2 rounded mt-3" disabled={!file} onClick={handleUpload}>Upload</button>
      {uploaded && <div className="mt-4 text-green-700 font-bold">Uploaded!</div>}
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

