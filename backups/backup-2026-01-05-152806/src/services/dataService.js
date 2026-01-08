<<<<<<< HEAD
export async function getServicesData() {
=======
﻿export async function getServicesData() {
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
  return { spartan: { "USDA": ["Loans"], "Mortgage": ["FHA"] } };
}

export async function getDashboardStats() {
  return [
    { value: "12", label: "Services", icon: "BarChart3" },
    { value: "1,247", label: "Users", icon: "Users" }
  ];
}

export async function getMortgageRates() {
  return [{ value: "6.875%", label: "30-Year", change: "-0.125%", isPositive: true }];
}

export async function getCommoditiesData() {
  return [{ value: "$4.52", label: "Corn", change: "+2.3%", isPositive: true }];
}

export async function getMarketsData() {
  return [{ value: "43,275", label: "DOW", change: "+245", isPositive: true }];
}

export async function getLendersData() {
  return [{ id: 1, name: "Bank of America", programs: ["FHA"] }];
}

export async function searchMortgages(criteria) {
  return [{ id: 1, name: "Test Lender", notes_excerpt: "Licensed" }];
}

export async function searchFactoring(criteria) {
  return [{ id: 1, name: "Test Factor", industry: "Produce" }];
}


<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
