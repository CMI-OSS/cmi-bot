function parseDate(stringDate) {
  const regNumber = /[^0-9]/g;
  const regYear = /....년/;
  const regMonth = /..월/;
  const regDaily = /매./;
  const regDate = /..일/;
  const regHour = /..시/;
  const regMinute = /..분/;
  const regSecond = /..초/;
  const regWeek = /.요일/;
  const regAM = /오전/;

  function parseValue(reg, stringDate, elseValue) {
    return reg.test(stringDate)
      ? parseInt(stringDate.match(reg)[0].replace(regNumber, ""))
      : elseValue;
  }

  const year = parseValue(regYear, stringDate, new Date().getFullYear());
  const month = parseValue(regMonth, stringDate, new Date().getMonth() + 1);
  const date = parseValue(regDate, stringDate, new Date().getDate());
  const minute = parseValue(regMinute, stringDate, 0);
  const seconds = parseValue(regSecond, stringDate, 0);
  let hour = parseValue(regHour, stringDate, 0);
  if (!regAM.test(stringDate)) {
    hour += 12;
  }

  if (regDaily.test(stringDate)) {
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
