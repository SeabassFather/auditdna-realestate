import React, { useState } from "react";
import {
  AUDITDNA_CATALOG,
  listCategories,
  listAllOfferings,
  findOffering,
  Category,
  SubCategory,
  Offering,
} from "../data/auditdna-catalog";
import * as LucideIcons from "lucide-react";

const getIcon = (icon?: string, props?: any) => {
  if (!icon || !(icon in LucideIcons))
    return <LucideIcons.Package {...props} />;
  // @ts-ignore
  return React.createElement(LucideIcons[icon], props);
};

export default function AuditDNACatalogBrowser() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    listCategories()[0]?.id || "",
  );
  const [expandedSubId, setExpandedSubId] = useState<string | null>(null);
  const [selectedOffering, setSelectedOffering] = useState<Offering | null>(
    null,
  );

  const categories = listCategories();
  const activeCategory = categories.find((c) => c.id === activeCategoryId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex">
      {/* Sidebar: Categories */}
      <nav className="w-72 bg-white shadow-lg border-r border-slate-200">
        <div className="p-5 border-b border-slate-100">
          <h1 className="text-2xl font-bold text-blue-900">AuditDNA Catalog</h1>
          <p className="text-xs text-slate-600 pt-1">
            Version {AUDITDNA_CATALOG.version} | Owner: {AUDITDNA_CATALOG.owner}
          </p>
        </div>
        <ul className="mt-4 space-y-1">
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                className={`flex items-center w-full px-4 py-2 rounded-lg font-semibold text-left transition
                  ${cat.id === activeCategoryId ? "bg-blue-100 text-blue-900" : "bg-white text-slate-700 hover:bg-blue-50"}`}
                onClick={() => {
                  setActiveCategoryId(cat.id);
                  setExpandedSubId(null);
                  setSelectedOffering(null);
                }}
              >
                {getIcon(cat.icon, { className: "mr-3 text-blue-600" })}
                {cat.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content: Subcategories & Offerings */}
      <main className="flex-1 p-8">
        {activeCategory && (
          <div>
            <h2 className="text-3xl font-bold text-blue-800 mb-4">
              {activeCategory.title}
            </h2>
            <p className="text-slate-700 mb-6">
              {activeCategory.area} | {activeCategory.route}
            </p>
            <div className="space-y-6">
              {activeCategory.subcategories
                .sort((a, b) => b.priority - a.priority)
                .map((sub) => (
                  <div key={sub.id} className="bg-white rounded-xl shadow p-6">
                    <div className="flex items-center mb-2">
                      {getIcon(sub.icon, { className: "mr-2 text-blue-600" })}
                      <span className="font-bold text-lg text-slate-800">
                        {sub.title}
                      </span>
                      <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {sub.offerings.length} offerings
                      </span>
                      <button
                        className="ml-4 text-blue-500 underline text-xs"
                        onClick={() =>
                          setExpandedSubId(
                            expandedSubId === sub.id ? null : sub.id,
                          )
                        }
                      >
                        {expandedSubId === sub.id ? "Hide" : "Show"}
                      </button>
                    </div>
                    {expandedSubId === sub.id && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
                        {sub.offerings
                          .sort((a, b) => b.priority - a.priority)
                          .map((off) => (
                            <div
                              key={off.id}
                              className="bg-slate-50 rounded-xl border border-slate-200 p-5 hover:shadow-lg transition cursor-pointer"
                              onClick={() => setSelectedOffering(off)}
                            >
                              <div className="flex items-center mb-1">
                                {getIcon(off.icon, {
                                  className: "mr-2 text-blue-600",
                                })}
                                <span className="font-semibold text-slate-800">
                                  {off.title}
                                </span>
                                {off.kind === "product" && (
                                  <span className="ml-auto text-xs text-indigo-600 font-bold">
                                    Product
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-slate-600">
                                {off.description}
                              </div>
                              <div className="mt-2 flex gap-2 flex-wrap">
                                {off.tags?.map((tag) => (
                                  <span
                                    key={tag}
                                    className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <div className="mt-2 text-xs text-slate-500">
                                Route:{" "}
                                <span className="font-mono">{off.route}</span>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Offering Modal/Details */}
        {selectedOffering && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full relative">
              <button
                onClick={() => setSelectedOffering(null)}
                className="absolute top-3 right-3 bg-slate-200 rounded-full px-2 py-1 text-slate-700 hover:bg-slate-300"
              >
                ✕
              </button>
              <div className="flex items-center mb-3">
                {getIcon(selectedOffering.icon, {
                  className: "mr-2 text-blue-600",
                })}
                <span className="font-bold text-xl text-slate-800">
                  {selectedOffering.title}
                </span>
                <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {selectedOffering.kind.toUpperCase()}
                </span>
              </div>
              <div className="mb-2 text-slate-700">
                {selectedOffering.description}
              </div>
              {selectedOffering.tags && (
                <div className="mb-2 flex gap-2 flex-wrap">
                  {selectedOffering.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="mb-2 text-xs text-slate-500">
                Route:{" "}
                <span className="font-mono">{selectedOffering.route}</span>
              </div>
              <div className="mb-2 text-xs">
                <b>SKU:</b> {selectedOffering.sku}
              </div>
              {selectedOffering.pricing && (
                <div className="mb-2 text-xs">
                  <b>Pricing Model:</b> {selectedOffering.pricing.model}
                  {selectedOffering.pricing.amount && (
                    <>
                      {" "}
                      | <b>Amount:</b> ${selectedOffering.pricing.amount}
                    </>
                  )}
                  {selectedOffering.pricing.contingencyRate && (
                    <>
                      {" "}
                      | <b>Contingency:</b>{" "}
                      {Math.round(
                        selectedOffering.pricing.contingencyRate * 100,
                      )}
                      %
                    </>
                  )}
                  {selectedOffering.pricing.notes && (
                    <>
                      <br />
                      <b>Notes:</b> {selectedOffering.pricing.notes}
                    </>
                  )}
                </div>
              )}
              {selectedOffering.requiresDocs &&
                selectedOffering.docChecklist && (
                  <div className="mb-2">
                    <b>Required Documents:</b>
                    <ul className="list-disc pl-5 text-xs">
                      {selectedOffering.docChecklist.map((doc) => (
                        <li key={doc.key}>
                          {doc.label}
                          {doc.required ? " (required)" : ""}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              {selectedOffering.deliverables && (
                <div className="mb-2">
                  <b>Deliverables:</b>
                  <ul className="list-disc pl-5 text-xs">
                    {selectedOffering.deliverables.map((d, i) => (
                      <li key={i}>
                        <b>{d.type}:</b> {d.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {selectedOffering.workflow && (
                <div className="mb-2 text-xs">
                  <b>Workflow:</b> {selectedOffering.workflow.join(" → ")}
                </div>
              )}
              {selectedOffering.complianceRefs && (
                <div className="mb-2 text-xs">
                  <b>Compliance:</b>{" "}
                  {selectedOffering.complianceRefs.join(", ")}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
