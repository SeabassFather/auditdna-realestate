<<<<<<< HEAD
function Card({ title, lines, selected, onSelect }) {
=======
ï»¿function Card({ title, lines, selected, onSelect }) {
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
  return (
    <div
      onClick={onSelect}
      className="p-4 rounded-xl border hover:bg-gray-50 cursor-pointer"
    >
      <div className="font-semibold mb-1">{title}</div>
      <ul className="text-sm text-gray-600 space-y-0.5">
        {lines.map((l, i) => (
          <li key={i}>{l}</li>
        ))}
      </ul>
      {selected && <div className="mt-2 text-xs text-green-700">Selected</div>}
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

