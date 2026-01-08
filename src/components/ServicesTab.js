<<<<<<< HEAD
<div className="category-card">
=======
﻿<div className="category-card">
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
  <div
    className="category-header"
    onClick={() => setExpandedCategory(expandedCategory === idx ? null : idx)}
  >
    <div className="header-left">
      <span className="cat-icon">{cat.icon}</span>
      <div>
        <div className="cat-title">{cat.category}</div>
        <div className="cat-count">{cat.items?.length || 0} services</div>
      </div>
    </div>
<<<<<<< HEAD
    <span className="cat-arrow">{expandedCategory === idx ? ' : '
    <span className="cat-arrow">{expandedCategory === idx ? ' : '
=======
    <span className="cat-arrow">{expandedCategory === idx ? ' : '
    <span className="cat-arrow">{expandedCategory === idx ? ' : '
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
  </div>
  {expandedCategory === idx && (
    <div className="service-grid">
      {cat.items.map((svc, i) => (
        <div key={i} className="service-item">{svc}</div>
      ))}
    </div>
  )}
</div>
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
