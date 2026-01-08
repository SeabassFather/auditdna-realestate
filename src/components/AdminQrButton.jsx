<<<<<<< HEAD
import React, { useState } from "react";
=======
ï»¿import React, { useState } from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

/**
 * Floating QR button. Uses Google's chart API to render a QR (no local deps).
 * If your Admin path differs, adjust dminUrl.
 */
export default function AdminQrButton() {
  const [open, setOpen] = useState(false);
  const adminUrl = window.location.origin + "/admin";
  const qr =
    "https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=" +
    encodeURIComponent(adminUrl);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 rounded-full shadow-lg bg-rose-600 hover:bg-rose-700 text-white w-12 h-12 text-xl"
        title="Open Admin QR"
      >
        QR
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-5 w-[300px] shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-lg font-semibold mb-2">Admin</div>
            <img src={qr} alt="admin qr" className="mx-auto rounded border" />
            <div className="text-xs text-gray-500 mt-3 break-all">
              {adminUrl}
            </div>
            <button
              className="mt-4 w-full rounded-md bg-black text-white py-2"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

