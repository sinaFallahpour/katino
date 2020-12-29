import React, { useState } from "react";
import jalaali from "jalaali-js";
import DatePicker, {
  DayValue,
  DayRange,
  Day,
} from "react-modern-calendar-datepicker";

export const DatePickerModern = ({ handleChange }) => {
  const [day, setDay] = useState(null);

  const handleDate = (e) => {
    const DateNumber = `${e.year}/${e.month}/${e.day}`;
    handleChange(DateNumber);
    setDay(e);
  };

  const renderCustomInput = ({ ref }) => {
    const currentDate = `${day?.day || ""} / ${day?.month || ""} / ${
      day?.year || ""
    } `;
    return (
      <input
        readOnly
        ref={ref} // necessary
        value={`${day ? currentDate : ""}`}
        className="form-control ir-r shadow-none"
      />
    );
  };

  const DatePickerInput = ({ ...props }) => {
    return (
      <>
        <DatePicker
          className="form-control ir-r shadow-none "
          value={day} // default value type (Day)
          onChange={handleDate} // onchange type (DayValue)
          inputPlaceholder="Select a day range" // :)
          colorPrimary="#9c88ff" // color when selected
          calendarTodayClassName="custom-today-day" // color today-span - config in index.css
          calendarClassName="responsive-calendar" // use for responsive
          locale="fa" // for change to persion-calendar
          renderInput={renderCustomInput} // ***** for use custom input with name - className and so on
          shouldHighlightWeekends // set red color for friday
        />
      </>
    );
  };

  return <DatePickerInput />;
};
