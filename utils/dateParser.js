function parseDate(stringDate) {
  const regNotNumber = /[^0-9]/g;
  const regYear = /....년/;
  const regMonth = /..월/;
  const regDaily = /매./;
  const regDay = /..일/;
  const regHour = /[0-9]*시/;
  const regMinute = /..분/;
  const regSecond = /..초/;
  const regWeek = /.요일/;
  const regAM = /오전/;

  function isExist(reg, stringDate) {
    return reg.test(stringDate);
  }

  function stringDateSplit(reg, stringDate) {
    return parseInt(stringDate.match(reg)[0].replace(regNotNumber, ""));
  }

  function parsing(reg, stringDate, defaultValue) {
    return isExist(reg, stringDate)
      ? stringDateSplit(reg, stringDate)
      : defaultValue;
  }

  const year = parsing(regYear, stringDate, new Date().getFullYear());
  const month = parsing(regMonth, stringDate, new Date().getMonth() + 1);
  const date = parsing(regDay, stringDate, new Date().getDate());
  const minute = parsing(regMinute, stringDate, 0);
  const seconds = parsing(regSecond, stringDate, 0);
  let hour = parsing(regHour, stringDate, 0);
  if (!isExist(regAM, stringDate)) {
    hour += 12;
  }

  if (isExist(regDaily, stringDate)) {
    const repeat = stringDate.match(regDaily)[0];

    if (repeat === "매일") {
      return {
        repeat,
        hour,
        minute,
        seconds,
      };
    }

    if (repeat === "매주") {
      const week = stringDate.match(regWeek)[0][0];
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
