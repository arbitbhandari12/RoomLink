import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

<<<<<<< HEAD
const BookingForm = ({ id }) => {
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    date: null,
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          `http://localhost:4001/api/properties/booking/${id}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          }
        );

        const data = await response.json();

        if (response.ok) {
          toast.success('Booking Successful!', {
          });
        } else {
          toast.error(data.msg || 'Booking failed', {
          });
        }
      } catch (error) {
        console.log(error);
        toast.error('Server error. Please try again later.', {
        });
      }
    },
  });

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md border border-gray-500">
      <h2 className="text-2xl font-bold mb-4 text-center">Book a Visit</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          onChange={formik.handleChange}
          value={formik.values.name}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Contact Number"
          onChange={formik.handleChange}
          value={formik.values.phone}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div>
          <DatePicker
            selected={formik.values.date}
            onChange={(date) => formik.setFieldValue('date', date)}
            minDate={new Date()}
            placeholderText="Select a Date"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all"
        >
          Submit Your Booking
        </button>
      </form>
      <ToastContainer />
=======
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
>>>>>>> parent of 15a1173 (Update Booking)
    </div>
  );
};

export default BookNow;
