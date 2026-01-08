import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

/**
 * InvoiceCalendar Component - Calendar view for invoice tracking
 */
const InvoiceCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const sampleInvoices = [
    { id: 1, date: '2025-01-15', amount: 5000, status: 'paid' },
    { id: 2, date: '2025-01-20', amount: 7500, status: 'pending' },
    { id: 3, date: '2025-01-25', amount: 3200, status: 'due' },
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Calendar size={24} />
          Invoice Calendar
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="font-medium text-gray-700">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <button
            onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Day headers */}
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-semibold text-gray-600 py-2">
            {day}
          </div>
        ))}

        {/* Empty cells for days before month starts */}
        {Array.from({ length: startingDayOfWeek }).map((_, index) => (
          <div key={`empty-${index}`} className="p-2 h-24 border border-gray-100" />
        ))}

        {/* Calendar days */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const dayInvoices = sampleInvoices.filter((inv) => inv.date === dateStr);

          return (
            <div
              key={day}
              className="p-2 h-24 border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium text-gray-700 mb-1">{day}</div>
              {dayInvoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className={`text-xs p-1 rounded mb-1 ${
                    invoice.status === 'paid'
                      ? 'bg-green-100 text-green-700'
                      : invoice.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  ${invoice.amount}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 rounded" />
          <span className="text-gray-600">Paid</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-100 rounded" />
          <span className="text-gray-600">Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 rounded" />
          <span className="text-gray-600">Due</span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCalendar;

