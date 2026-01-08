import React from 'react';
import QRCode from 'react-qr-code';
import { CheckCircle, XCircle, AlertTriangle, Download, Share2, Printer } from 'lucide-react';

export default function TraceabilityPanel({ lots, language }) {
  const t = {
    en: {
      title: "Traceability Intelligence", lot: "Lot", product: "Product", variety: "Variety", region: "Region", size: "Size", pack: "Pack",
      status: "Status", auditScore: "Audit Score", certifications: "Certifications", chain: "Chain of Title", qr: "QR Code",
      compliance: "Compliance", tests: "Tests", stages: "Supply Chain Stages", print: "Print", pdf: "Export PDF", email: "Send Email", download: "Download", viewChain: "View Chain"
    },
    es: {
      title: "Inteligencia de Trazabilidad", lot: "Lote", product: "Producto", variety: "Variedad", region: "Regi size: "Tama pack: "Empaque",
      status: "Estado", auditScore: "Puntuaci certifications: "Certificaciones", chain: "Cadena de T qr: "C QR",
      compliance: "Cumplimiento", tests: "Pruebas", stages: "Etapas de Cadena", print: "Imprimir", pdf: "Exportar PDF", email: "Enviar Email", download: "Descargar", viewChain: "Ver Cadena"
    }
  }[language || "en"];

  const getStatusColor = (status) =>
    status === 'VERIFIED' ? '#10b981' :
    status === 'PENDING' ? '#f59e0b' :
    '#ef4444';

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-green-700">{t.title}</h2>
      {lots.map((lot, idx) => (
        <div key={lot.id} className="bg-white rounded-xl p-7 mb-8 shadow-md border border-green-200">
          <div className="flex flex-wrap gap-8 mb-4 items-center">
            <div>
              <h3 className="font-bold text-xl text-green-800">{t.lot}: {lot.id}</h3>
              <div>{t.product}: <b>{lot.product}</b></div>
              <div>{t.variety}: <b>{lot.variety}</b></div>
              <div>{t.region}: <b>{lot.region}</b></div>
              <div>{t.size}: <b>{lot.size}</b> &mdash; {t.pack}: <b>{lot.pack}</b></div>
            </div>
            <div>
              <span className={`px-4 py-2 rounded-full font-bold text-white`} style={{background:getStatusColor(lot.status)}}>
                {t.status}: {lot.status}
              </span>
              <br />
              <span className="text-lg font-bold">{t.auditScore}: <b style={{color:getStatusColor(lot.status)}}>{lot.auditScore}/100</b></span>
            </div>
            <div>
              <div className="text-xs font-semibold">{t.certifications}:</div>
              {[...lot.certifications].map((cert,j) => (
                <span key={j} className="px-2 py-1 ml-1 mr-1 rounded bg-green-50 border">{cert}</span>
              ))}
            </div>
            <div className="text-center">
              <QRCode value={lot.qrCodeUrl || ""} size={64} />
              <div className="text-xs mt-2">{t.qr}</div>
            </div>
          </div>
          <div className="mb-3">
            <div className="font-bold">{t.stages}:</div>
            <div className="flex gap-3 flex-wrap">
              {Object.entries(lot.stages).map(([stage, val]) => (
                <span key={stage} className={`inline-flex items-center px-2 py-1 rounded ${val ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-500"} mr-1`}>
                  {val ? <CheckCircle size={14} className="mr-1" /> : <XCircle size={14} className="mr-1" />}
                  {t.stages && t.stages[stage] ? t.stages[stage] : stage}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <div className="font-bold">{t.compliance} Scores:</div>
            {Object.entries(lot.compliance).map(([k,v]) => (
              <span key={k} className="px-2 py-1 mr-2 rounded bg-gray-50 border" style={{color:v>=90?'#10b981':v>=70?'#f59e0b':'#ef4444',fontWeight:600}}>
                {k.toUpperCase()}: {v}
              </span>
            ))}
          </div>
          <div className="mb-3">
            <div className="font-bold">{t.chain}:</div>
            <div className="flex gap-2 flex-wrap">
              {lot.chainOfTitle.map((actor,x) => (
                <span key={x} className="px-3 py-1 rounded bg-slate-100 border text-gray-700 font-bold">{actor}</span>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <div className="font-bold">{t.tests}:</div>
            {Object.entries(lot.tests).map(([test, value]) => (
              <span key={test} className="px-2 py-1 mr-2 rounded bg-blue-50 border">{test}: {value}</span>
            ))}
          </div>
          <div className="flex gap-3 mt-3 justify-end">
            <button className="bg-green-700 text-white px-3 py-2 rounded flex items-center gap-2" onClick={()=>window.print()}><Printer size={16}/>{t.print}</button>
            <button className="bg-blue-600 text-white px-3 py-2 rounded flex items-center gap-2"><Download size={16}/>{t.pdf}</button>
            <button className="bg-purple-700 text-white px-3 py-2 rounded flex items-center gap-2"><Share2 size={16}/>{t.email}</button>
          </div>
        </div>
      ))}
    </div>
  );
}

