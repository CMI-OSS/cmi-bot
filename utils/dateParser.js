function parseDate(stringDate) {
  const regNotNumber = /[^0-9]/g;
  const regYear = /[0-9]*년/;
  const regMonth = /[0-9]*월/;
  const regDaily = /매./;
  const regDay = /[0-9]*일/;
  const regHour = /[0-9]*시/;
  const regMinute = /[0-9]*분/;
  const regSecond = /[0-9]*초/;
  const regWeek = /.요일/;
  const regAM = /오전/;
  const regTomorrow = /내일/;

  function isRegExist(reg, stringDate) {
    return reg.test(stringDate);
  }

  function stringDateSplit(reg, stringDate) {
    return parseInt(stringDate.match(reg)[0].replace(regNotNumber, ""));
  }

  function parsing(reg, stringDate, defaultValue) {
    return isRegExist(reg, stringDate)
      ? stringDateSplit(reg, stringDate)
      : defaultValue;
  }

  function regDailyAndWeekSplit(reg, stringDate) {
    return stringDate.match(reg)[0];
  }

  const year = parsing(regYear, stringDate, new Date().getFullYear());
  const month = parsing(regMonth, stringDate, new Date().getMonth() + 1);
  const minute = parsing(regMinute, stringDate, 0);
  const seconds = parsing(regSecond, stringDate, 0);
  let date = parsing(regDay, stringDate, new Date().getDate());
  let hour = parsing(regHour, stringDate, 0);

  if (!isRegExist(regAM, stringDate)) {
    hour += 12;
  }

  if (isRegExist(regDaily, stringDate)) {
    const repeat = regDailyAndWeekSplit(regDaily, stringDate);

    if (repeat === "매일") {
      return {
        repeat,
        hour,
        minute,
        seconds,
      };
    }

    if (repeat === "매주") {
      const week = regDailyAndWeekSplit(regWeek, stringDate)[0];

      return {
        repeat,
        week,
        hour,
        minute,
        seconds,
      };
    }

    if (repeat === "매달") {
      return {
        repeat,
        date,
        hour,
        minute,
        seconds,
      };
    }
  }

  if (isRegExist(regTomorrow, stringDate)) {
    date = new Date().getDate() + 1;

    return {
      year,
      month,
      date,
      hour,
      minute,
      seconds,
    };
  }

  return {
    year,
    month,
    date,
    hour,
    minute,
    seconds,
  };
}

module.exports = {
  parseDate,
};
