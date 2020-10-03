


export const getTodayAndTommorrowDates = () => {
  Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }

  let date = new Date();

  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  const today = date.toISOString();
  const tomorrow = date.addDays(1).toISOString();

  return { today, tomorrow }
}



export const addDaysToToday = (num) => {
  Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }

  let date = new Date();

  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  const newDate = date.addDays(num).toISOString();
  return newDate
}
