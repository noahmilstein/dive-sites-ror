import React from 'react';

const DatePickerForm = (props) => {
  return (
    <form onSubmit={props.data}>
      <input className="datetime" type="datetime-local" name="diveTime" />
      <input type="submit" value="Schedule Dive" />
    </form>
  )
}

export default DatePickerForm;
