import React from "react";
import { useApp } from "../context/AppContext";

const DatePicker: React.FC = () => {
  const { selectedDate, setSelectedDate } = useApp();

  // Generate date options for the next 14 days
  const dateOptions = [];
  const today = new Date();

  for (let i = 0; i < 14; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);

    const dateString = date.toISOString().split("T")[0];
    const displayDate = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    dateOptions.push({ value: dateString, label: displayDate });
  }

  return (
    <div className="date-picker">
      <label>Date:</label>
      <select
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      >
        {dateOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DatePicker;
