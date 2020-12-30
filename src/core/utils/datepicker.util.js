import React, { useState } from "react";
import jalaali from "jalaali-js";
import DatePicker, {
  DayValue,
  DayRange,
  Day,
} from "react-modern-calendar-datepicker";

export const DatePickerModern = ({ handleChange, dateVal }) => {
  const [day, setDay] = useState();

  const handleDate = (e) => {
    const monthNum = e.month.toString().length === 1 ? `0${e.month}` : e.month;
    const dayNum = e.day.toString().length === 1 ? `0${e.day}` : e.day;
    const DateNumber = `${e.year}/${monthNum}/${dayNum}`;
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
        value={`${day ? currentDate : dateVal ? dateVal : ""}`}
        className="form-control ir-r shadow-none"
      />
    );
  };

  return (
    <>
      <DatePicker
        className="form-control ir-r shadow-none "
        value={day && day} // default value type (Day)
        onChange={handleDate} // onchange type (DayValue)
        inputPlaceholder="Select a day range" // :)
        colorPrimary="#9c88ff" // color when selected
        formatInputText={() => "yyyy-mm-dd"}
        calendarTodayClassName="custom-today-day" // color today-span - config in index.css
        calendarClassName="responsive-calendar" // use for responsive
        locale="fa" // for change to persion-calendar
        renderInput={renderCustomInput} // ***** for use custom input with name - className and so on
        shouldHighlightWeekends // set red color for friday
      />
    </>
  );
};
