import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { eachDayOfInterval, parseISO, startOfToday, isSameDay } from 'date-fns';

const CalendarPicker = ({
  id,
  name,
  startDate,
  endDate,
  onChange,
  formik,
  bookings,
}) => {
  const [startDateCal, setStartDate] = useState(
    startDate ? new Date(startDate) : null
  );
  const [endDateCal, setEndDate] = useState(endDate ? new Date(endDate) : null);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    const selectedDates = eachDayOfInterval({ start, end });

    // Check if any of the selected dates are in the excluded dates
    const isExcludedDateSelected = selectedDates.some((date) =>
      excludedDates.some((excludedDate) => isSameDay(date, excludedDate))
    );

    if (isExcludedDateSelected) {
      // Set an error message for the startDate field
      formik.setFieldError(
        'startDate',
        'The selected range includes an excluded date.'
      );
      return;
    }

    setStartDate(start);
    setEndDate(end);
    if (onChange) {
      onChange({ startDate: start, endDate: end });
    }
  };

  const bookingDates = bookings
    .map((booking) =>
      eachDayOfInterval({
        start: new Date(booking.dateFrom),
        end: new Date(booking.dateTo),
      })
    )
    .flat();

  const excludedDates = eachDayOfInterval({
    start: new Date('2023-10-01'),
    end: startOfToday() - 1,
  }).concat(bookingDates);

  return (
    <DatePicker
      id={id}
      name={name}
      selected={startDateCal}
      onChange={handleDateChange}
      startDate={startDateCal}
      endDate={endDateCal}
      excludeDates={excludedDates}
      selectsDisabledDaysInRange
      selectsRange
      inline
    />
  );
};

export default CalendarPicker;
