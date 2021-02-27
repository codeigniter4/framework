import Moment from 'moment';

const getConfig = () => {
  Moment.updateLocale('en', {
    week: {
      dow : 3, // Wednesday is the first day of the week.
    }
  });
  return Moment
}

export const getMomentWeeks = (data, key) => {
  const moment = getConfig()
  return data.reduce((acc, date) => {
    // create a composed key: 'year-week'
    const yearWeek = `${moment(date[key]).year()}-${moment(date[key]).week()}`;

    // add this key as a property to the result object
    if (!acc[yearWeek]) {
      acc[yearWeek] = [];
    }

    // push the current date that belongs to the year-week calculated befor
    acc[yearWeek].push(date);

    return acc;
  }, {});
}


export const getMomentWeek = (date) => {
  const moment = getConfig()
  const yearWeek = `${moment(date).year()}-${moment(date).week()}`;
  return yearWeek;
}
