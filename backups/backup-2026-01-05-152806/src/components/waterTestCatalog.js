// waterTestCatalog.js - 50 Water Tests
export const waterCategories = [
  { id: 'drinking', name: 'Drinking Water', nameEs: 'Agua Potable', icon: ' testCount: 15, color: '#06b6d4' },
  { id: 'wastewater', name: 'Wastewater', nameEs: 'Aguas Residuales', icon: ' testCount: 12, color: '#0891b2' },
  { id: 'surface', name: 'Surface Water', nameEs: 'Agua Superficial', icon: ' testCount: 10, color: '#0e7490' },
  { id: 'groundwater', name: 'Groundwater', nameEs: 'Agua Subterr icon: ' testCount: 13, color: '#155e75' }
];

export const waterTests = [
  // Drinking Water (15 tests)
  { id: 'WAT-DRK-001', name: 'E.coli Detection', category: 'Drinking Water', price: 85, turnaround: 2 },
  { id: 'WAT-DRK-002', name: 'Total Coliform', category: 'Drinking Water', price: 75, turnaround: 2 },
  { id: 'WAT-DRK-003', name: 'Lead Content', category: 'Drinking Water', price: 95, turnaround: 3 },
  { id: 'WAT-DRK-004', name: 'Copper Analysis', category: 'Drinking Water', price: 90, turnaround: 3 },
  { id: 'WAT-DRK-005', name: 'Chlorine Residual', category: 'Drinking Water', price: 60, turnaround: 1 },
  { id: 'WAT-DRK-006', name: 'pH Level', category: 'Drinking Water', price: 50, turnaround: 1 },
  { id: 'WAT-DRK-007', name: 'Turbidity', category: 'Drinking Water', price: 55, turnaround: 1 },
  { id: 'WAT-DRK-008', name: 'Nitrate/Nitrite', category: 'Drinking Water', price: 85, turnaround: 2 },
  { id: 'WAT-DRK-009', name: 'Arsenic Detection', category: 'Drinking Water', price: 110, turnaround: 3 },
  { id: 'WAT-DRK-010', name: 'Fluoride Level', category: 'Drinking Water', price: 70, turnaround: 2 },
  { id: 'WAT-DRK-011', name: 'Hardness (Ca/Mg)', category: 'Drinking Water', price: 80, turnaround: 2 },
  { id: 'WAT-DRK-012', name: 'Iron Content', category: 'Drinking Water', price: 75, turnaround: 2 },
  { id: 'WAT-DRK-013', name: 'Manganese', category: 'Drinking Water', price: 75, turnaround: 2 },
  { id: 'WAT-DRK-014', name: 'Sulfate', category: 'Drinking Water', price: 70, turnaround: 2 },
  { id: 'WAT-DRK-015', name: 'TDS (Total Dissolved Solids)', category: 'Drinking Water', price: 65, turnaround: 1 },

  // Wastewater (12 tests)
  { id: 'WAT-WST-001', name: 'BOD (Biochemical Oxygen Demand)', category: 'Wastewater', price: 95, turnaround: 5 },
  { id: 'WAT-WST-002', name: 'COD (Chemical Oxygen Demand)', category: 'Wastewater', price: 90, turnaround: 3 },
  { id: 'WAT-WST-003', name: 'TSS (Total Suspended Solids)', category: 'Wastewater', price: 80, turnaround: 2 },
  { id: 'WAT-WST-004', name: 'Ammonia Nitrogen', category: 'Wastewater', price: 85, turnaround: 2 },
  { id: 'WAT-WST-005', name: 'Total Phosphorus', category: 'Wastewater', price: 90, turnaround: 3 },
  { id: 'WAT-WST-006', name: 'Oil & Grease', category: 'Wastewater', price: 105, turnaround: 3 },
  { id: 'WAT-WST-007', name: 'Fecal Coliform', category: 'Wastewater', price: 85, turnaround: 2 },
  { id: 'WAT-WST-008', name: 'Heavy Metals Panel', category: 'Wastewater', price: 150, turnaround: 4 },
  { id: 'WAT-WST-009', name: 'Phenols', category: 'Wastewater', price: 110, turnaround: 3 },
  { id: 'WAT-WST-010', name: 'Cyanide', category: 'Wastewater', price: 120, turnaround: 3 },
  { id: 'WAT-WST-011', name: 'Sulfide', category: 'Wastewater', price: 95, turnaround: 2 },
  { id: 'WAT-WST-012', name: 'Chloride', category: 'Wastewater', price: 75, turnaround: 2 },

  // Surface Water (10 tests)
  { id: 'WAT-SRF-001', name: 'Algae Identification', category: 'Surface Water', price: 125, turnaround: 4 },
  { id: 'WAT-SRF-002', name: 'Dissolved Oxygen', category: 'Surface Water', price: 70, turnaround: 1 },
  { id: 'WAT-SRF-003', name: 'Temperature Profile', category: 'Surface Water', price: 50, turnaround: 1 },
  { id: 'WAT-SRF-004', name: 'Conductivity', category: 'Surface Water', price: 60, turnaround: 1 },
  { id: 'WAT-SRF-005', name: 'Pesticide Screen', category: 'Surface Water', price: 175, turnaround: 5 },
  { id: 'WAT-SRF-006', name: 'Herbicide Screen', category: 'Surface Water', price: 175, turnaround: 5 },
  { id: 'WAT-SRF-007', name: 'Microcystin Toxin', category: 'Surface Water', price: 140, turnaround: 4 },
  { id: 'WAT-SRF-008', name: 'Phosphate', category: 'Surface Water', price: 80, turnaround: 2 },
  { id: 'WAT-SRF-009', name: 'Sediment Analysis', category: 'Surface Water', price: 110, turnaround: 3 },
  { id: 'WAT-SRF-010', name: 'Macroinvertebrate Survey', category: 'Surface Water', price: 150, turnaround: 5 },

  // Groundwater (13 tests)
  { id: 'WAT-GRD-001', name: 'Volatile Organic Compounds (VOCs)', category: 'Groundwater', price: 185, turnaround: 5 },
  { id: 'WAT-GRD-002', name: 'BTEX (Benzene, Toluene, Ethylbenzene, Xylene)', category: 'Groundwater', price: 165, turnaround: 4 },
  { id: 'WAT-GRD-003', name: 'Petroleum Hydrocarbons', category: 'Groundwater', price: 155, turnaround: 4 },
  { id: 'WAT-GRD-004', name: 'MTBE Detection', category: 'Groundwater', price: 130, turnaround: 3 },
  { id: 'WAT-GRD-005', name: 'Perchlorate', category: 'Groundwater', price: 135, turnaround: 4 },
  { id: 'WAT-GRD-006', name: 'Chromium-6', category: 'Groundwater', price: 125, turnaround: 3 },
  { id: 'WAT-GRD-007', name: 'Radon', category: 'Groundwater', price: 145, turnaround: 4 },
  { id: 'WAT-GRD-008', name: 'Uranium', category: 'Groundwater', price: 140, turnaround: 4 },
  { id: 'WAT-GRD-009', name: 'Methane', category: 'Groundwater', price: 115, turnaround: 3 },
  { id: 'WAT-GRD-010', name: 'Sulfur Bacteria', category: 'Groundwater', price: 95, turnaround: 3 },
  { id: 'WAT-GRD-011', name: 'Iron Bacteria', category: 'Groundwater', price: 95, turnaround: 3 },
  { id: 'WAT-GRD-012', name: 'Electrical Conductivity', category: 'Groundwater', price: 60, turnaround: 1 },
  { id: 'WAT-GRD-013', name: 'Alkalinity', category: 'Groundwater', price: 70, turnaround: 2 }
];

export default { waterCategories, waterTests };
