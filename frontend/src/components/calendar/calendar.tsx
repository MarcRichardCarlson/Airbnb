// RangeDatePicker.tsx

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css';

interface RangeDatePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (startDate: Date | null, endDate: Date | null) => void;
}

const RangeDatePicker: React.FC<RangeDatePickerProps> = ({
  startDate,
  endDate,
  onChange,
}) => {
  return (
    <div className="flex">
      <DatePicker
        selected={startDate}
        onChange={(date) => onChange(date as Date, endDate)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        className="p-2 border border-gray-300 rounded"
        placeholderText='Från:'
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => onChange(startDate, date as Date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        className="p-2 border border-gray-300 rounded"
        placeholderText='Till:'
      />
    </div>
  );
};

export default RangeDatePicker;
