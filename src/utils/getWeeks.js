// Returns the ISO week of the date.
export const getWeek = (date) => {
  // var date = new Date(date);
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 1 - (date.getDay() + 4) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 2);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  var theWeek = 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
  return  theWeek;
}

export const getWeekNumber = (d) => {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
}
const getRunningTotal = (data, row, field) => {

  return parseInt(data[field]) + parseInt(row[field])
}
