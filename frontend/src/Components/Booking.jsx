import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookNow = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  // Static end date set to 7 days from today (can be dynamically updated later)
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to midnight for current date

  const endDate = new Date();
  endDate.setDate(today.getDate() + 7); // Set end date to 7 days from today

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false); // Close the calendar after selecting a date
  };

  return (
    <div className="">
      <button
        className="flex px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        Book Now
      </button>

      {showCalendar && (
        <div className="mt-4">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline
            minDate={today} // Prevent selecting past dates
            maxDate={endDate} // Prevent selecting beyond the endDate (7 days from today)
            className=""
          />
        </div>
      )}

      {selectedDate && (
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold">Selected Date:</p>
          <p className="text-blue-500">{selectedDate.toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default BookNow;
